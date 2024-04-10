import {
  EthereumClient
} from "@web3modal/ethereum"
import { configureChains, createConfig } from "wagmi"
import { mainnet, polygon, goerli, polygonMumbai, base, baseGoerli } from "wagmi/chains"
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { coinbaseConnector } from './coinbase-connector'

const {
  REACT_APP_WC_PROJECT_ID,
  REACT_APP_INFURA_ID,
  REACT_APP_JSON_RPC_MUMBAI
} = process.env

const polygonMumbaiUpdated = {
  ...polygonMumbai,
  rpcUrls: {
    ...polygonMumbai.rpcUrls,
    default: {
      http: [
        REACT_APP_JSON_RPC_MUMBAI as string
      ]
    }
  }
}
const chains = [
  mainnet, polygon, goerli, polygonMumbaiUpdated, base, baseGoerli
]

// Wagmi client
const { publicClient, webSocketPublicClient } = configureChains(
  chains,
  [
    infuraProvider({ apiKey: REACT_APP_INFURA_ID as string }),
    publicProvider()
  ],
)

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains, options: {
        projectId: REACT_APP_WC_PROJECT_ID as string
      }
    }),
    new InjectedConnector({
      chains
    }),
    coinbaseConnector
  ],
  publicClient
})

const ethereumClient = new EthereumClient(wagmiConfig, chains)

export {
  wagmiConfig,
  ethereumClient
}