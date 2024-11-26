import axios from 'axios'
import { defineApiHeaders } from 'helpers'
const {
  REACT_APP_DASHBOARD_SERVER_URL,
  REACT_APP_ZUPLO_API_KEY
} = process.env

const getMultiQRData = (
  multiscanQRId: string,
  scanId: string,
  scanIdSig: string,
  msg?: string,
  chainId?: number,
  receiver?: string,
  whitelistSig?: string,
  nonce?: string,
  timestamp?: number
) => {
  const headers = defineApiHeaders(REACT_APP_ZUPLO_API_KEY as string)

  return axios.post(`${REACT_APP_DASHBOARD_SERVER_URL}/api/v2/dashboard/dispensers/pop/multiscan-qrs/${multiscanQRId}`, {
    scan_id: scanId,
    scan_id_sig: scanIdSig,
    receiver,
    message: msg,
    chain_id: chainId ? String(chainId) : undefined,
    whitelist_sig: whitelistSig,
    nonce,
    timestamp
  }, { headers })
}

export default getMultiQRData
