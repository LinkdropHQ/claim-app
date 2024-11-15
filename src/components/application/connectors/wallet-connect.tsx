import { createAppKit } from '@reown/appkit/react'
import { coinbaseWallet } from 'wagmi/connectors'

import {
  polygon,
  immutableZkEvm,
  xLayer,
  mainnet,
  base
} from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

import {
  zeroChain
} from 'configs/chains'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com

const { REACT_APP_WC_PROJECT_ID } = process.env
const projectId = REACT_APP_WC_PROJECT_ID as string

// 2. Create wagmiConfig
const metadata = {
  name: 'Linkdrop Claim App',
  description: 'Linkdrop Claim App',
  url: 'https://linkdrop.io', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const networks = [
  base,
  mainnet,
  polygon,
  immutableZkEvm,
  xLayer,
  zeroChain
]


// @ts-ignore
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  connectors: [
    coinbaseWallet()
  ],
})

// 5. Create modal
createAppKit({
  adapters: [
    wagmiAdapter
  ],
  featuredWalletIds: [
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa',
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
  ],
  // @ts-ignore
  networks,
  projectId,
  metadata,
  features: {
    email: true, // default to true
    socials: ['google'],
    emailShowWallets: true, // default to true
  }
})


export {
  wagmiAdapter,
  queryClient
}