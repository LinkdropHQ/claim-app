import claimERC1155 from './claim-erc1155'
import claimERC721 from './claim-erc721'
import claimERC20 from './claim-erc20'
import getInitialData from './get-initial-data'
import getLinkByQR from './get-link-by-qr'
import checkTransactionStatus from './check-transaction-status'
import getLinkFromURL from './get-link-from-url'
import getLinkByCode from './get-link-by-code'
import getLinkFromInput from './get-link-from-input'
import deeplinkRedirect from './deeplink-redirect'
import getTokenData from './get-token-data'
import checkIfClaimed from './check-if-claimed'

export {
  claimERC1155,
  checkIfClaimed,
  getTokenData,
  getInitialData,
  claimERC721,
  claimERC20,
  getLinkByQR,
  checkTransactionStatus,
  getLinkFromURL,
  getLinkByCode,
  getLinkFromInput,
  deeplinkRedirect
}
