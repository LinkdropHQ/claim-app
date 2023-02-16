import React from 'react'
import { Provider } from 'react-redux'
import RouterProvider from './router-provider'
import store from 'data/store'
import { Container } from './styled-components'
import { Web3Modal } from "@web3modal/react"
import { ethereumClient, wagmiClient } from './connectors'
import { WagmiConfig } from "wagmi"
const { REACT_APP_WC_PROJECT_ID } = process.env

class Application extends React.Component {
  render () {
    return <Container>
      <WagmiConfig client={wagmiClient}>
        <Provider store={store}>
          <RouterProvider />
        </Provider>
      </WagmiConfig>
      <Web3Modal
        projectId={REACT_APP_WC_PROJECT_ID as string}
        ethereumClient={ethereumClient}
      />
    </Container>
  }
}
export default Application
