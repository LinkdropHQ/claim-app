import { TWalletName } from "types"

const { REACT_APP_INFURA_ID } = process.env

type TChains = {
  [chainId: number]: {
    chainName: string
    displayName: string
    testnet: boolean
    alchemySupport: boolean
    defaultWalletApp: TWalletName
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
    },
    rpcUrls: string[]
    blockExplorerUrls: string[]
  }
}

const chains: TChains = {
  137: {
    chainName: 'Polygon',
    displayName: 'Polygon',
    defaultWalletApp: 'coinbase_smart_wallet',
    testnet: false,
    alchemySupport: true,
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: [
      'https://poly-rpc.gateway.pokt.network/'
    ],
    blockExplorerUrls: [
      'https://polygonscan.com'
    ]
  },
  1: {
    chainName: 'Ethereum Mainnet',
    displayName: 'Mainnet',
    defaultWalletApp: 'coinbase_smart_wallet',
    testnet: false,
    alchemySupport: true,
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [
      `https://mainnet.infura.io/v3/${REACT_APP_INFURA_ID}`
    ],
    blockExplorerUrls: [
      'https://etherscan.io'
    ]
  },
  13371: {
    chainName: 'Immutable zkEVM',
    displayName: 'Immutable zkEVM',
    defaultWalletApp: 'coinbase_smart_wallet',
    testnet: false,
    alchemySupport: false,
    nativeCurrency: {
      name: 'IMX',
      symbol: 'IMX',
      decimals: 18
    },
    rpcUrls: [
      'https://immutable-zkevm.drpc.org'
    ],
    blockExplorerUrls: [
      'https://explorer.immutable.com'
    ]
  },
  8453: {
    chainName: 'Base',
    defaultWalletApp: 'coinbase_smart_wallet',
    displayName: 'Base',
    testnet: false,
    alchemySupport: false,
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [
      'https://developer-access-mainnet.base.org'
    ],
    blockExplorerUrls: [
      'https://basescan.org'
    ]
  },
  196: {
    chainName: 'X Layer',
    defaultWalletApp: 'okx_wallet',
    displayName: 'X Layer',
    testnet: false,
    alchemySupport: false,
    nativeCurrency: {
      name: 'OKB',
      symbol: 'OKB',
      decimals: 18
    },
    rpcUrls: [
      'https://rpc.xlayer.tech'
    ],
    blockExplorerUrls: [
      'https://www.oklink.com/xlayer'
    ]
  }
}

export default chains