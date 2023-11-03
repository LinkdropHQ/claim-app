import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from "@web3modal/ethereum"
import { configureChains, createClient } from "wagmi"
import { mainnet, polygon } from "wagmi/chains"
const { REACT_APP_WC_PROJECT_ID } = process.env

const chains = [ polygon, mainnet ]

// Wagmi client
const { provider } = configureChains(chains, [w3mProvider({ projectId: REACT_APP_WC_PROJECT_ID as string })]);

const wagmiClient = createClient({
  connectors: w3mConnectors({
    projectId: REACT_APP_WC_PROJECT_ID as string,
    chains
  }),
  provider
})

const ethereumClient = new EthereumClient(wagmiClient, chains)

export {
  wagmiClient,
  ethereumClient
}