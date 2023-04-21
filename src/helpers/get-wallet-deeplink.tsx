import { TSystem, TWalletName } from 'types'
import wallets from 'configs/wallets'

type TGetWalletDeeplink = (walletId: TWalletName, system: TSystem, redirectUrl: string, linkChainId: number) => string | void | null

const getWalletDeeplink: TGetWalletDeeplink = (walletId, system, redirectUrl, linkChainId) => {
  if (system === 'desktop') {
    return
  }
  const walletData = wallets[walletId]

  if (!walletData.chains.find(chain => chain === linkChainId)) {
    return
  }

  if (walletData) {
    const deeplinkData = walletData.mobile[system]
    if (deeplinkData && deeplinkData.support) {
      const link = deeplinkData.deepLink(redirectUrl)
      return link
    }
  }
}

export default getWalletDeeplink