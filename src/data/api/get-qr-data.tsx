import axios from 'axios'
import {
  defineApiHeaders
} from 'helpers'
const {
  REACT_APP_DASHBOARD_SERVER_URL,
  REACT_APP_ZUPLO_API_KEY
} = process.env

const getQRData = (qrId: string) => {
  const headers = defineApiHeaders(
    REACT_APP_ZUPLO_API_KEY as string
  )
  return axios(`${REACT_APP_DASHBOARD_SERVER_URL}/api/v2/user/QR/${qrId}`, {
    headers
  })
}

export default getQRData
