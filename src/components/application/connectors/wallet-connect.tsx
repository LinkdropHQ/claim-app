import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { createStorage, WagmiProvider } from 'wagmi'
import {
  mainnet,
  polygon,
  sepolia,
  base,
  baseGoerli,
  polygonMumbai
} from 'wagmi/chains'
import { http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { metamaskConfig } from './metamask-connect'
// import { coinbaseConfig } from './coinbase-connector'

import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'

const { REACT_APP_WC_PROJECT_ID } = process.env

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = REACT_APP_WC_PROJECT_ID as string

// 2. Create wagmiConfig
const metadata = {
  name: 'Linkdrop Claim App',
  description: 'Linkdrop Claim App',
  url: 'https://linkdrop.io', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [
  mainnet,
  polygon,
  sepolia,
  base,
  baseGoerli,
  polygonMumbai
] as const

localStorage.clear()
sessionStorage.clear()

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  storage: null, 
  connectors: [
    walletConnect({
      projectId,
      metadata,
      showQrModal: false
    }),
    coinbaseWallet({})
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
    [baseGoerli.id]: http(),
    [polygonMumbai.id]: http(),
  },
})

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
})


export {
  config,
  queryClient
}