import axios from 'axios'
import {
  defineApiHeaders
} from 'helpers'
const {
  REACT_APP_DASHBOARD_SERVER_URL,
  REACT_APP_ZUPLO_API_KEY
} = process.env

const getOriginalLink = (linkId: string) => {
  const headers = defineApiHeaders(
    REACT_APP_ZUPLO_API_KEY as string
  )
  return axios(`${REACT_APP_DASHBOARD_SERVER_URL}/api/v2/user/claim-params/${linkId}`, {
    headers
  })
}

export default getOriginalLink
