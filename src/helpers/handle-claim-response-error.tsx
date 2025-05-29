import { Dispatch } from 'redux';
import { DropActions } from '../data/store/reducers/drop/types'
import { UserActions } from '../data/store/reducers/user/types'
import * as dropActions from '../data/store/reducers/drop/actions'
import axios, { AxiosError } from 'axios'
import { plausibleApi } from 'data/api'

const handleError = (
  dispatch: Dispatch<DropActions> & Dispatch<UserActions>,
  campaignId: string,
  error: any | AxiosError
) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 422) {
      if (error.response.data.errors && error.response.data.errors.length > 0) {
        if (error.response.data.errors[0] === "CLAIM_LINK_NOT_AVAILABLE_IN_REGION") {
          plausibleApi.invokeEvent({
            eventName: 'error',
            data: {
              err_name: 'cannot_claim_in_current_region',
              campaignId
            }
          })
          dispatch(dropActions.setStep('error_region'))
        } else {
          plausibleApi.invokeEvent({
            eventName: 'error',
            data: {
              err_name: 'error_already_claimed',
              campaignId
            }
          })
          dispatch(dropActions.setStep('error_already_claimed'))
        }
      }
    } else {
      if (error.response && error.response.data.errors && error.response.data.errors.length > 0) {
        if (error.response.data.errors[0] === "MULTIPLE_CLAIMS_FORBIDDEN") {
          dispatch(dropActions.setStep('error_multiple_claims_forbidden'))
          return
        } else if (
          error.response.data.errors[0] === "LINKDROP_PROXY_CONTRACT_PAUSED"
        ) {
          dispatch(dropActions.setStep('error_campaign_paused'))
          return
        }
      }

      plausibleApi.invokeEvent({
        eventName: 'error',
        data: {
          err_name: 'error_server_fail',
          campaignId
        }
      })
      dispatch(dropActions.setStep('error_server_fail'))
    }
    
  } else {
    if(!window.navigator.onLine) {
      plausibleApi.invokeEvent({
        eventName: 'error',
        data: {
          err_name: 'error_no_connection',
          campaignId
        }
      })
      dispatch(dropActions.setStep('error_no_connection'))
    } else {
      plausibleApi.invokeEvent({
        eventName: 'error',
        data: {
          err_name: 'error',
          campaignId
        }
      })
      dispatch(dropActions.setStep('error'))
    }
  }
}

export default handleError