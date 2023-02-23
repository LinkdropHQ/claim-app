import React from 'react'
import { Provider } from 'react-redux'
import RouterProvider from './router-provider'
import store from 'data/store'
import { Container } from './styled-components'
import { Web3Modal } from "@web3modal/react"
import { ethereumClient, wagmiClient } from './connectors'
import { WagmiConfig } from "wagmi"
import MetamaskIcon from 'images/wallet_metamask.webp'
import TrustIcon from 'images/wallet_trust.webp'
import RainbowIcon from 'images/wallet_rainbow.webp'
import ZerionIcon from 'images/wallet_zerion.webp'
import ImtokenIcon from 'images/wallet_imtoken.webp'
import SafeIcon from 'images/wallet_safe.webp'
import ArgentIcon from 'images/wallet_argent.webp'
import TokenaryIcon from 'images/wallet_tokenary.webp'

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
        mobileWallets={[
          {
            id: 'coinbaseWallet',
            name: 'Coinbase Wallet',
            links: {
              native: `https://go.cb-w.com/dapp?cb_url=${encodeURI(window.location.href)}`,
              universal: 'https://www.coinbase.com/wallet',
            },
          }, {
            id: 'trust',
            name: 'Trust Wallet',
            links: {
              native: 'trust://',
              universal: 'https://link.trustwallet.com',
            },
          },
          {
            id: 'metaMask',
            name: 'Metamask',
            links: {
              native: 'metaMask://',
              universal: 'https://metamask.io/',
            },
          },
          {
            id: 'zerion',
            name: 'Zerion',
            links: {
              native: 'zerion://',
              universal: 'https://wallet.zerion.io',
            },
          },
          {
            id: 'rainbow',
            name: 'Rainbow',
            links: {
              native: 'rainbow://',
              universal: 'https://rainbow.me/',
            },
          },
          {
            id: 'safe',
            name: 'Safe',
            links: {
              native: 'safe://',
              universal: 'https://gnosis-safe.io/',
            },
          }, {
            id: 'argent',
            name: 'Argent',
            links: {
              native: 'argent://',
              universal: 'https://www.argent.xyz/',
            },
          },{
            id: 'imtoken',
            name: 'imToken',
            links: {
              native: 'imtoken://',
              universal: 'https://token.im/',
            },
          }
        ]}
        walletImages={
          {
            zerion: ZerionIcon,
            metaMask: MetamaskIcon,
            rainbow: RainbowIcon,
            trust: TrustIcon,
            imtoken: ImtokenIcon,
            safe: SafeIcon,
            argent: ArgentIcon,
            tokenary: TokenaryIcon,
            bla: RainbowIcon
          }
        }
      />
    </Container>
  }
}
export default Application

// Argent, Safe, imtoken