
import { Dispatch } from 'redux'
import { DropActions } from '../types'
import { UserActions } from '../../user/types'
import { ethers } from 'ethers'
import * as actionsDrop from '../actions'
import * as actionsUser from '../../user/actions'
import { plausibleApi, getMultiQRData, nonceApi } from 'data/api'
import axios, { AxiosError } from 'axios'
import * as wccrypto from '@walletconnect/utils/dist/esm'
import { RootState } from 'data/store'
import { SiweMessage } from 'siwe'

const createSigMessage = (
  statement: string,
  nonce: string,
  address: string,
  chainId: number
) => {

  return new SiweMessage({
    domain: document.location.host,
    address: address,
    chainId: chainId as number,
    uri: document.location.origin,
    version: '1',
    statement,
    nonce
  })

}

export default function getLinkByMultiQR(
  multiscanQRId: string,
  scanId: string,
  scanIdSig: string,
  multiscanQREncCode: string,
  address: string,
  chainId?: number,
  signer?: any,
  callback?: (location: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<UserActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsDrop.setLoading(true))
    dispatch(actionsDrop.setError(null))

    try {
      const { data: { nonce } } = await nonceApi.get(address)
      const timestamp = Date.now()
      const humanReadable = new Date(timestamp).toUTCString()
      const statement = `I'm signing this message to login to Linkdrop Dashboard at ${humanReadable}`
      const message = createSigMessage(
        statement,
        nonce,
        address,
        chainId as number
      )

      const preparedMessage = message.prepareMessage()
      const signing = await signer.signMessage(preparedMessage)
      dispatch(actionsUser.setAddress(address))

      const { data } = await getMultiQRData(
        multiscanQRId,
        scanId,
        scanIdSig,
        preparedMessage,
        chainId,
        // params for whitelist
        address,
        signing
      )

      const { encrypted_claim_link, success }: { encrypted_claim_link: string, success: boolean } = data
      if (success && encrypted_claim_link) {
        const decryptKey = ethers.utils.id(multiscanQREncCode)
        const linkDecrypted = wccrypto.decrypt({ encoded: encrypted_claim_link, symKey: decryptKey.replace('0x', '') })
        dispatch(actionsDrop.setMultiscanLinkDecrypted(linkDecrypted))
        // ---- autoclaim
        dispatch(actionsDrop.setAutoclaim(true))
        // ----
        if (linkDecrypted.includes(window.location.host)) {
          return callback && callback(linkDecrypted.split('/#')[1])
        } else {
          window.location.href = linkDecrypted
          return
        }
      }

      dispatch(actionsDrop.setLoading(false))

    } catch (err: any | AxiosError) {
      dispatch(actionsDrop.setLoading(false))
      if (axios.isAxiosError(err)) {
        if (err.message === 'Network Error') {
          if (!window.navigator.onLine) {
            dispatch(actionsDrop.setError('qr_no_connection'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_no_connection'
              }
            })
          } else {
            dispatch(actionsDrop.setError('qr_error'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_error'
              }
            })
          }
        } else if (err.response?.status === 404) {
          dispatch(actionsDrop.setError('qr_not_found'))
          plausibleApi.invokeEvent({
            eventName: 'error',
            data: {
              err_name: 'qr_not_found'
            }
          })
        } else if (err.response?.status === 500) {
          dispatch(actionsDrop.setError('qr_error'))
          plausibleApi.invokeEvent({
            eventName: 'error',
            data: {
              err_name: 'qr_error'
            }
          })
        } else if (err.response?.status === 403) {
          const { data } = err.response
          if (data.error.includes("Claim is over.")) {
            dispatch(actionsDrop.setError('qr_campaign_finished'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_campaign_finished'
              }
            })
          } else if (data.error.includes("Claim has not started yet.")) {
            dispatch(actionsDrop.setError('qr_campaign_not_started'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_campaign_not_started'
              }
            })
          } else if (data.error.includes("No more claims available.")) {
            dispatch(actionsDrop.setError('qr_no_links_to_share'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_no_links_to_share'
              }
            })
          } else if (data.error.includes("Dispenser is not active")) {
            dispatch(actionsDrop.setError('qr_campaign_not_active'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_campaign_not_active'
              }
            })
          } else if (data.errors.includes("RECEIVER_NOT_WHITELISTED")) {
            dispatch(actionsDrop.setError('qr_campaign_not_eligible'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_campaign_not_eligible'
              }
            })
          } else {
            dispatch(actionsDrop.setError('qr_error'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_error'
              }
            })
          }
          
        } else if (err.response?.status === 400) {
          const { data } = err.response
          if (data.errors.includes('ERROR_WHITELIST_SIGNATURE_VERIFICATION')) {
            dispatch(actionsDrop.setError('qr_error'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_error'
              }
            })
            
          } else {
            dispatch(actionsDrop.setError('qr_error'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_error'
              }
            })
          }
        }
      } else {
        if (err && err.code === "INVALID_ARGUMENT") {
          dispatch(actionsDrop.setError('qr_incorrect_parameter'))
          return plausibleApi.invokeEvent({
            eventName: 'error',
            data: {
              err_name: 'qr_incorrect_parameter'
            }
          })
        }
        dispatch(actionsDrop.setError('qr_error'))
        plausibleApi.invokeEvent({
          eventName: 'error',
          data: {
            err_name: 'qr_error'
          }
        })
      }
    }
  } 
}
