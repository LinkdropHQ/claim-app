import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import {
  mainnet,
  polygon,
  sepolia,
  base,
  baseGoerli,
  polygonMumbai
} from 'wagmi/chains'
import { http } from 'wagmi'
import { QueryClient } from '@tanstack/react-query'

import { walletConnect, coinbaseWallet } from 'wagmi/connectors'

const { REACT_APP_WC_PROJECT_ID } = process.env

const queryClient = new QueryClient()

const projectId = REACT_APP_WC_PROJECT_ID as string

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

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
})


export {
  config,
  queryClient
}