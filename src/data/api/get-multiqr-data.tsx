import axios from 'axios'
import {
  defineApiHeaders
} from 'helpers'
const {
  REACT_APP_DASHBOARD_SERVER_URL,
  REACT_APP_ZUPLO_API_KEY
} = process.env
const getMultiQRData = (
  multiscanQRId: string,
  scanId: string,
  scanIdSig: string,
  receiver?: string,
  whitelistSig?: string
) => {
  const headers = defineApiHeaders(
    REACT_APP_ZUPLO_API_KEY as string
  )
  return axios.post(`${REACT_APP_DASHBOARD_SERVER_URL}/api/v2/dashboard/dispensers/pop/multiscan-qrs/${multiscanQRId}`, {
    scan_id: scanId,
    scan_id_sig: scanIdSig,
    receiver,
    whitelist_sig: whitelistSig
  }, {
    headers
  })
}

export default getMultiQRData
