
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

export default function claimERC721(
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
        signer,
        provider,
        address,
        email
      },
      drop: {
        campaignId,
        isManual,
        wallet,
        tokenAddress,
        tokenId,
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

    if (!tokenId) {
      dispatch(dropActions.setLoading(false))
      return alert(`tokenId is not provided`)
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
      } else if (email) {
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
          tokenId,
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
  nftAddress: string,
  tokenId: string,
  expirationTime: string,
  linkdropMasterAddress: string,
  campaignId: string,
  linkdropSignerSignature: string,
  factoryAddress: string | null,
  dispatch: Dispatch<DropActions> & Dispatch<UserActions>
) => {

  if (!factoryAddress) {
    return alertError('Factory address is not defined')
  }

  try {
    
    const linkId = new ethers.Wallet(linkKey).address
    const receiverSignature = await signReceiverAddress(linkKey, address)

    const contract = new ethers.Contract(
      factoryAddress,
      LinkdropFactory.abi,
      signer
    )

    const { hash } = await contract.claimERC721(
      weiAmount,
      nftAddress,
      tokenId,
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