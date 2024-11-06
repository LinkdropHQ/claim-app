import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import {
  mainnet,
  polygon,
  base,
  immutableZkEvm,
  xLayer
} from 'wagmi/chains'
import {
  zeroChain
} from 'configs/chains'
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
  base,
  mainnet,
  polygon,
  immutableZkEvm,
  xLayer,
  zeroChain
] as const

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  connectors: [
    walletConnect({
      projectId,
      metadata,
      showQrModal: false
    }),
    injected(),
    coinbaseWallet()
  ],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [immutableZkEvm.id]: http(),
    [xLayer.id]: http(),
    [zeroChain.id]: http()
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