
import { Dispatch } from 'redux';
import { DropActions } from '../types'
import { ethers } from 'ethers'
import { RootState } from 'data/store'
import contracts from 'configs/contracts'
import LinkdropFactory from 'abi/linkdrop-factory.json'
import { signReceiverAddress } from '@linkdrop/contracts/scripts/utils.js'
import * as dropActions from '../actions'
import * as userActions from '../../user/actions'
import { UserActions } from '../../user/types'
import { resolveENS, defineJSONRpcUrl, handleClaimResponseError } from 'helpers'
import axios, { AxiosError } from 'axios'
const { REACT_APP_INFURA_ID = '' } = process.env


export default function claimERC20(
  manualAddress?: string
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<UserActions>,
    getState: () => RootState
  ) => {
    dispatch(dropActions.setLoading(true))
    let {
      user: {
        sdk,
        userProvider,
        address
      },
      drop: {
        campaignId,
        isManual,
        wallet,
        tokenAddress,
        amount,
        weiAmount,
        expirationTime,
        linkKey,
        linkdropMasterAddress,
        linkdropSignerSignature,
        chainId
      }
    } = getState()
    if (!chainId) {
      dispatch(dropActions.setLoading(false))
      return alert(`chainId is not provided`)
    }
    if (!linkKey) {
      dispatch(dropActions.setLoading(false))
      return alert(`linkKey is not provided`)
    }

    if (!tokenAddress) {
      dispatch(dropActions.setLoading(false))
      return alert(`tokenAddress is not provided`)
    }

    if (!amount) {
      dispatch(dropActions.setLoading(false))
      return alert(`amount is not provided`)
    }

    if (!expirationTime) {
      dispatch(dropActions.setLoading(false))
      return alert(`expirationTime is not provided`)
    }

    if (!linkdropMasterAddress) {
      dispatch(dropActions.setLoading(false))
      return alert(`linkdropMasterAddress is not provided`)
    }

    if (!campaignId) {
      dispatch(dropActions.setLoading(false))
      return alert(`campaignId is not provided`)
    }

    if (!linkdropSignerSignature) {
      dispatch(dropActions.setLoading(false))
      return alert(`linkdropSignerSignature is not provided`)
    }

    if (!address && manualAddress) {
      const jsonRpcUrl = defineJSONRpcUrl({ chainId: 1, infuraPk: REACT_APP_INFURA_ID })
      const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl)
      const addressResolved = await resolveENS(manualAddress, provider)
      // checking if address is resolved

      if (addressResolved) {
        dispatch(userActions.setAddress(addressResolved))
        address = addressResolved
      } else if (addressResolved === null) {
        dispatch(dropActions.setLoading(false))
        return dispatch(dropActions.setStep('error_no_connection'))
      } else {
        dispatch(dropActions.setLoading(false))
        return alert('Provided address or ens is not correct')
      }
    }

    let finalTxHash = ''

    try {
      if (isManual) {
        finalTxHash = await claimManually(
          chainId,
          userProvider,
          linkKey,
          address,
          weiAmount || '0',
          tokenAddress,
          amount,
          expirationTime,
          linkdropMasterAddress,
          campaignId,
          linkdropSignerSignature,
          dispatch
        )

      } else {
        const res = await sdk.claim({
          weiAmount,
          tokenAddress,
          tokenAmount: amount,
          expirationTime,
          linkKey,
          linkdropMasterAddress,
          linkdropSignerSignature,
          receiverAddress: address,
          campaignId: campaignId
        })

        const { success, errors, txHash } = res
  
        if (success) {
          finalTxHash = txHash
        } else {
          console.log({ errors })
        }
      }

      if (finalTxHash) {
        dispatch(dropActions.setHash(finalTxHash))
        dispatch(dropActions.setStep('claiming_process'))
      }
      
    } catch (error: any | AxiosError) {
      console.log({ error })
      handleClaimResponseError(dispatch, error)
    }
    dispatch(dropActions.setLoading(false))
  }
}


const claimManually = async (
  chainId: number,
  userProvider: any,
  linkKey: string,
  address: string,
  weiAmount: string,
  tokenAddress: string,
  amount: string,
  expirationTime: string,
  linkdropMasterAddress: string,
  campaignId: string,
  linkdropSignerSignature: string,
  dispatch: Dispatch<DropActions> & Dispatch<UserActions>,
) => {
  try {
    const factoryItem = contracts[chainId]
    const signer = await userProvider.getSigner()
    const linkId = new ethers.Wallet(linkKey).address
    const receiverSignature = await signReceiverAddress(linkKey, address)
    const contract = new ethers.Contract(
      factoryItem.factory,
      LinkdropFactory.abi,
      signer
    )

    const { hash } = await contract.claim(
      weiAmount,
      tokenAddress,
      amount,
      expirationTime,
      linkId,
      linkdropMasterAddress,
      campaignId,
      linkdropSignerSignature,
      address,
      receiverSignature
    )

    return hash
  } catch (err) {
    dispatch(dropActions.setStep('error'))
    console.log({ err })
  }
}