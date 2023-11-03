
import { Dispatch } from 'redux';
import * as actionsDrop from '../actions';
import { DropActions } from '../types';
import { TokenActions } from '../../token/types';
import getStatus from './get-status'
import { ethers } from 'ethers'
import { RootState } from 'data/store'
import { plausibleApi } from 'data/api'

export default function getData() {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<TokenActions>,
    getState: () => RootState
  ) => {
    try {
      dispatch(actionsDrop.setLoading(true))

      const {
        user: {
          provider,
          sdk
        },
        drop: {
          campaignId,
          linkKey,
          linkdropMasterAddress,
          chainId,
          claimCode
        }
      } = getState()

      if (!linkKey) {
        return alert('linkId is not provided')
      }

      if (!linkdropMasterAddress) {
        return alert('linkdropMasterAddress is not provided')
      }

      if (!campaignId) {
        return alert('campaignId is not provided')
      }

      if (!chainId) {
        return alert('campaignId is not provided')
      }



      const interval = window.setInterval(async () => {
        const status = await getStatus(
          sdk,
          claimCode
        )
        try {
          if (status) {
            if (status.status === 'CLAIMED') {
              if (status.txHash) {
                dispatch(actionsDrop.setHash(status.txHash))
              }
              window.clearInterval(interval)
              return dispatch(actionsDrop.setStep('claiming_finished'))
            } else {
              if (status.status === 'FAILED') {
                window.clearInterval(interval)
                plausibleApi.invokeEvent({
                  eventName: 'error',
                  data: {
                    err_name: 'error_transaction',
                    campaignId
                  }
                })
                return dispatch(actionsDrop.setStep('error_transaction'))
              }
            }
          }
          
        } catch (err) {
          console.log({ err })
        }
       
      }, 3000)
    } catch (err) {
      console.log({ err})
    }
  }
}
