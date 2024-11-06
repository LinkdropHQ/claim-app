import { TWalletName } from 'types'

const _withoutProtocol = (url: string) => url.replace(/(^\w+:|^)\/\//, '')

type TWalletDeeplink = (url: string) => string | null

type TWallet = {
  id: string,
  name: string,
  chains: number[],
  walletURL?: string | null,
  dappStoreUrl?: string | null,
  walletURLIos?: string | null,
  mobile: {
    android: {
      support: boolean,
      deepLink?: TWalletDeeplink
    },
    ios: {
      support: boolean,
      deepLink?: TWalletDeeplink
    }
  }
}

type TWallets = Record<TWalletName, TWallet | undefined>

const wallets: TWallets = {
  coinbase_smart_wallet: undefined,
  coinbase_wallet: {
    id: 'coinbase_wallet',
    name: 'Coinbase Wallet',
    walletURL: 'https://www.toshi.org',
    dappStoreUrl: null,
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) => `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(url)}`
      },
      ios: {
        support: true,
        deepLink: (url: string) => `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(url)}`
      }
    },
    chains: [1, 137, 8453, 13371, 543210]
  },
  metamask: {
    id: 'metamask',
    name: 'MetaMask',
    chains: [1, 137, 8453, 13371, 543210],
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) => `https://metamask.app.link/dapp/${_withoutProtocol(url)}`
      },
      ios: {
        support: true,
        deepLink: (url: string) => `https://metamask.app.link/dapp/${_withoutProtocol(url)}`
      }
    },
  },
  status: {
    id: 'status',
    name: 'Status',
    walletURL: 'https://status.im/',
    dappStoreUrl: null,
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) => `https://get.status.im/browse/${_withoutProtocol(url)}`
      },
      ios: {
        support: true,
        deepLink: (url: string) => `https://get.status.im/browse/${_withoutProtocol(url)}`
      }
    },
    chains: [1, 137, 8453, 13371, 543210],
  },
  okx_wallet: {
    id: 'okx_wallet',
    name: 'OKX Wallet',
    walletURL: 'https://www.okx.com/ru/web3/rewritethesystem',
    dappStoreUrl: null,
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) => `https://www.okx.com/download?deeplink=${encodeURIComponent("okx://wallet/dapp/url?dappUrl=" + encodeURIComponent(url))}`
      },
      ios: {
        support: true,
        deepLink: (url: string) => `https://www.okx.com/download?deeplink=${encodeURIComponent("okx://wallet/dapp/url?dappUrl=" + encodeURIComponent(url))}`
      }
    },
    chains: [196],
  },
  trust: {
    id: 'trust',
    name: 'Trust Wallet',
    walletURL: 'https://trustwalletapp.com',
    dappStoreUrl: 'https://dapps.trustwalletapp.com/',
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) => `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(url)}`
      },
      ios: {
        support: true,
        deepLink: (url: string) => `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(url)}`
      }
    },
    chains: [1, 137, 8453, 13371, 543210],
  },
  imtoken: {
    id: 'imtoken',
    name: 'imToken',
    walletURL: 'https://token.im/',
    dappStoreUrl: 'https://dapps.trustwalletapp.com/',
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) =>
          `imtokenv2://navigate/DappView?url=${encodeURIComponent(url)}`
      },
      ios: {
        support: true,
        deepLink: (url: string) =>
          `imtokenv2://navigate/DappView?url=${encodeURIComponent(url)}`
      }
    },
    chains: [1, 137, 8453, 13371, 543210],
  },
  rainbow: {
    id: 'rainbow',
    name: 'Rainbow',
    walletURL: 'https://rainbow.me/',
    dappStoreUrl: 'https://rainbow.me/',
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) => `https://rnbwapp.com/wc?uri=${encodeURIComponent(url)}`
      },
      ios: {
        support: true,
        deepLink: (url: string) => `https://rnbwapp.com/wc?uri=${encodeURIComponent(url)}`
      }
    },
    chains: [1]
  },
  walletconnect: {
    id: 'walletconnect',
    name: 'WalletConnect',
    chains: [1, 137, 8453, 13371, 543210],
    mobile: {
      android: {
        support: false
      },
      ios: {
        support: false,
      }
    },
  },
  ledger: {
    id: 'ledger',
    name: 'Ledger Live',
    walletURL: 'https://www.ledger.com/ledger-live',
    dappStoreUrl: null,
    mobile: {
      android: {
        support: false,
        deepLink: (url: string) => null
      },
      ios: {
        support: false,
        deepLink: (url: string) => null
      }
    },
    chains: [1, 137, 8453, 13371, 543210],
  },
  wallet_1inch: {
    id: 'wallet_1inch',
    name: '1inch',
    walletURL: 'https://app.1inch.io/',
    dappStoreUrl: null,
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) => `https://wallet.1inch.io/app/w3browser?link=${encodeURIComponent(url)}`
      },
      ios: {
        support: true,
        deepLink: (url: string) => `https://wallet.1inch.io/app/w3browser?link=${encodeURIComponent(url)}`
      }
    },
    chains: [1, 137, 8453, 13371, 543210],
  },
}

export default wallets
