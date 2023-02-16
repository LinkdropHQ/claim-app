import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { mainnet, polygon } from "wagmi/chains"
const { REACT_APP_WC_PROJECT_ID } = process.env

const chains = [mainnet, polygon]

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: REACT_APP_WC_PROJECT_ID as string }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: REACT_APP_WC_PROJECT_ID as string,
    version: "2",
    appName: "web3Modal",
    chains
  }),
  provider
})

const ethereumClient = new EthereumClient(wagmiClient, chains)

export {
  wagmiClient,
  ethereumClient
}