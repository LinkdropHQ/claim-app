const { REACT_APP_INFURA_ID } = process.env

type TChains = {
  [chainId: number]: {
    chainName: string
    displayName: string
    testnet: boolean
    alchemySupport: boolean
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
    testnet: false,
    alchemySupport: true,
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: [
      'https://polygon.meowrpc.com'
    ],
    blockExplorerUrls: [
      'https://polygonscan.com'
    ]
  },
  1: {
    chainName: 'Ethereum Mainnet',
    displayName: 'Mainnet',
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
  5: {
    chainName: 'Goerli',
    displayName: 'Goerli',
    testnet: true,
    alchemySupport: true,
    nativeCurrency: {
      name: 'GoerliETH',
      symbol: 'GoerliETH',
      decimals: 18
    },
    rpcUrls: [
      `https://goerli.infura.io/v3/${REACT_APP_INFURA_ID}`
    ],
    blockExplorerUrls: [
      'https://goerli.etherscan.io'
    ]
  },
  80001: {
    chainName: 'Mumbai',
    displayName: 'Mumbai',
    alchemySupport: true,
    testnet: true,
    nativeCurrency: {
      
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: [
      'https://endpoints.omniatech.io/v1/matic/mumbai/public'
    ],
    blockExplorerUrls: [
      'https://mumbai.polygonscan.com'
    ]
  },
  8453: {
    chainName: 'Base',
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
  84531: {
    chainName: 'Base Goerli Testnet',
    displayName: 'BaseGoerli',
    testnet: true,
    alchemySupport: false,
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [
      'https://base-goerli.public.blastapi.io'
    ],
    blockExplorerUrls: [
      'https://goerli.basescan.org'
    ]
  }
}

export default chains