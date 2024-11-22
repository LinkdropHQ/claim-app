import axios, { AxiosResponse } from 'axios'
import { TMultiscanCampaign } from 'types'
import {
  defineApiHeaders
} from 'helpers'
const {
  REACT_APP_DASHBOARD_SERVER_URL,
  REACT_APP_ZUPLO_API_KEY
} = process.env

type TGetMultiQRCampaignResponse = {
  success: boolean
  campaign: TMultiscanCampaign
}

export type TGetMultiQRCampaignData = (
  multiscanQRId: string
) => Promise<
  AxiosResponse<
    TGetMultiQRCampaignResponse
  >
>

const getMultiQRCampaignData: TGetMultiQRCampaignData = (
  multiscanQRId
) => {
  const headers = defineApiHeaders(
    REACT_APP_ZUPLO_API_KEY as string
  )
  return axios.get(`${REACT_APP_DASHBOARD_SERVER_URL}/api/v2/dashboard/dispensers/multiscan-qrs/${multiscanQRId}/campaign`, {
    headers
  })
}

export default getMultiQRCampaignData
