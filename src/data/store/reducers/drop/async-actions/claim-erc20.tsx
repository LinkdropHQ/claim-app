
import { Dispatch } from 'redux';
import { DropActions } from '../types'
import { ethers, BigNumber } from 'ethers'
import { RootState } from 'data/store'
import LinkdropFactory from 'abi/linkdrop-factory.json'
import { signReceiverAddress } from '@linkdrop/contracts/scripts/utils.js'
import * as dropActions from '../actions'
import * as userActions from '../../user/actions'
import { UserActions } from '../../user/types'
import {
  resolveENS,
  defineJSONRpcUrl,
  handleClaimResponseError,
  alertError
} from 'helpers'
import { AxiosError } from 'axios'
import gasPriceLimits from 'configs/gas-price-limits'
import { plausibleApi } from 'data/api'
const { REACT_APP_INFURA_ID = '' } = process.env

export default function claimERC20(
  manualAddress?: string,
  checkGasPrice?: boolean
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<UserActions>,
    getState: () => RootState
  ) => {
    dispatch(dropActions.setLoading(true))
    let {
      user: {
        sdk,
        address,
        provider,
        signer
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
        chainId,
        claimCode,
        factoryAddress
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

    if (!wallet) {
      dispatch(dropActions.setLoading(false))
      return alert(`wallet is not provided`)
    }

    if (!address) {
      if (manualAddress) {
        const jsonRpcUrl = defineJSONRpcUrl({ chainId: 1, infuraPk: REACT_APP_INFURA_ID })
        const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl)
        const addressResolved = await resolveENS(manualAddress, provider)
        // checking if address is resolved

        if (addressResolved) {
          dispatch(userActions.setAddress(addressResolved))
          address = addressResolved
          dispatch(dropActions.setAddressIsManuallySet(true))
        } else if (!window.navigator.onLine) {
          dispatch(dropActions.setLoading(false))
          plausibleApi.invokeEvent({
            eventName: 'error',
            data: {
              err_name: 'error_no_connection',
              campaignId
            }
          })
          return dispatch(dropActions.setStep('error_no_connection'))
        } else {
          dispatch(dropActions.setLoading(false))
          return alert('Provided address or ens is not correct')
        }
      } else {
        alert('No user address provided for claim')
      }
      
    }

    let finalTxHash = ''

    try {
      if (isManual || !checkGasPrice) {
        finalTxHash = await claimManually(
          chainId,
          signer,
          linkKey,
          address,
          weiAmount || '0',
          tokenAddress,
          amount,
          expirationTime,
          linkdropMasterAddress,
          campaignId,
          linkdropSignerSignature,
          factoryAddress,
          dispatch
        )

      } else {
        if (checkGasPrice) {
          const gasPrice = await provider.getGasPrice()
          if (gasPrice.gte(BigNumber.from(gasPriceLimits[chainId]))) {
            return dispatch(dropActions.setStep('gas_price_high'))
          }
        }
        if (!claimCode) {
          return 
        }
        const res = await sdk?.redeem(claimCode, address)
        if (!res) {
          return
        }
        const { txHash } = res
  
        if (txHash) {
          finalTxHash = txHash
        }
      }

      if (finalTxHash) {
        dispatch(dropActions.setHash(finalTxHash))
        dispatch(dropActions.setStep('claiming_process'))
      }
      
    } catch (error: any | AxiosError) {
      console.log({ error })
      handleClaimResponseError(dispatch, campaignId, error)
    }
    dispatch(dropActions.setLoading(false))
  }
}

const claimManually = async (
  chainId: number,
  signer: any,
  linkKey: string,
  address: string,
  weiAmount: string,
  tokenAddress: string,
  amount: string,
  expirationTime: string,
  linkdropMasterAddress: string,
  campaignId: string,
  linkdropSignerSignature: string,
  factoryAddress: string | null,
  dispatch: Dispatch<DropActions> & Dispatch<UserActions>,
) => {
  if (!factoryAddress) {
    return alertError('Factory address is not defined')
  }
  try {
    console.log('CLAIMING START')
    const linkId = new ethers.Wallet(linkKey).address
    console.log('linkId: ', { linkId, address })

    const receiverSignature = await signReceiverAddress(linkKey, address)
    console.log('receiverSignature: ', { receiverSignature })
    const contract = new ethers.Contract(
      factoryAddress,
      LinkdropFactory.abi,
      signer
    )
    console.log('contract: ', { contract })


    const txData = contract.interface.encodeFunctionData('claim', [
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
    ]);

    console.log("Transaction Data:", txData);

    console.log({
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
    })

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
    const errCode = (err as { code: string }).code
    if (errCode !== 'ACTION_REJECTED') {
      plausibleApi.invokeEvent({
        eventName: 'error',
        data: {
          err_name: 'error',
          campaignId
        }
      })
      dispatch(dropActions.setStep('error'))
    } else {
      plausibleApi.invokeEvent({
        eventName: 'error',
        data: {
          err_name: 'claim_rejected',
          campaignId
        }
      })
    }
  }
}