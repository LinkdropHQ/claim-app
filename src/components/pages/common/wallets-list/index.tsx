import { FC, useEffect, useState } from 'react'
import {
  TitleComponent,
  Container,
  TextComponent,
  OptionsListStyled,
  WalletIcon,
  ImageContainer
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import TrustWalletIcon from 'images/trust-wallet.png'
import CoinabseWalletIcon from 'images/coinbase-wallet.png'
import LedgerLiveWalletIcon from 'images/ledgerlive-wallet.png'
import RainbowWalletIcon from 'images/rainbow-wallet.png'
import ImtokenWalletIcon from 'images/imtoken-wallet.png'
import OKXWalletIcon from 'images/okx-wallet.png'

import Wallet1inch from 'images/wallet-1inch.png'
import { useConnect } from 'wagmi'
import {
  TDropStep,
  TMultiscanStep,
  TWalletName,
  TDropType,
  TSystem
} from 'types'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import * as dropActions from 'data/store/reducers/drop/actions'

import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import {
  defineSystem,
  getWalletOption,
  getInjectedWalletOption
} from 'helpers'
import BrowserWalletIcon from 'images/browser-wallet.png'
import TProps from './types'
import Icons from 'icons'

const mapStateToProps = ({
  token: {
    name,
    image
  },
  drop: { 
    type,
    wallet,
    claimCode,
    chainId,
    isManual,
    campaignId,
    preferredWalletOn,
  }
}: RootState) => ({
  name,
  image,
  type,
  wallet,
  claimCode,
  chainId,
  isManual,
  campaignId,
  preferredWalletOn
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    deeplinkRedirect: (
      deeplink: string,
      walletId: TWalletName,
      redirectCallback: () => void
    ) => dispatch(dropAsyncActions.deeplinkRedirect(
      deeplink,
      walletId,
      redirectCallback
    )),
    setAutoclaim: (
      autoclaim: boolean
    ) => {
      dispatch(dropActions.setAutoclaim(autoclaim))
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps

const defineOption = (
  wallet: TWalletName | null,
  system: TSystem,
  metamaskOption: any, // connector
  coinbaseWalletOption: any, // connector
  coinbaseSmartWalletOption: any, // deeplink
  wallet1InchOption: any, // deeplink
  imtokenOption: any, // deeplink
  trustOption: any, // deeplink
  rainbowOption: any, // deeplink
  ledgerOption: any, // redirect
  okxWalletOption: any // deeplink
) => {
  switch (system) {
    case 'desktop': {
      switch (wallet) {
        case 'metamask':
          return metamaskOption
        case 'coinbase_wallet':
          return coinbaseWalletOption
        case 'coinbase_smart_wallet':
          return coinbaseSmartWalletOption
        case 'ledger':
          return ledgerOption
        case 'wallet_1inch':
          return wallet1InchOption
        case 'okx_wallet':
          return okxWalletOption
          
        default:
          return coinbaseSmartWalletOption
      }
    }


    case 'android':
    case 'ios':
    default: {
      switch (wallet) {
        case 'metamask':
          return metamaskOption
        case 'coinbase_wallet':
          return coinbaseWalletOption
        case 'coinbase_smart_wallet':
          return coinbaseSmartWalletOption
        case 'imtoken':
          return imtokenOption
        case 'trust':
          return trustOption
        case 'rainbow':
          return rainbowOption
        case 'ledger':
          return ledgerOption
        case 'wallet_1inch':
          return wallet1InchOption
        case 'okx_wallet':
          return okxWalletOption
        
        default:
          return coinbaseSmartWalletOption
      }
    }
  }
}

const defineOptionsList = (
  type: TDropType | null,
  setStep: (step: TDropStep & TMultiscanStep) => void,
  open: (options?: any | undefined) => Promise<void>,
  connect: any,
  connectors: any,
  wallet: TWalletName | null,
  deeplinkRedirect: (
    deeplink: string,
    walletId: TWalletName
  ) => Promise<void>,
  isManual: boolean,
  chainId: number,
  claimCode: string,
  preferredWalletOn?: boolean
) => {

  const allWalletsOption = {
    title: 'I already have a wallet',
    onClick: () => {
      open()
    }
  }

  if (!preferredWalletOn) {
    // @ts-ignore
    const coinbaseConnector = connectors.find(connector => connector.id === "coinbaseWalletSDK")
    const coinbaseOption = {
      title: 'Create a smart wallet',
      onClick: () => {
        if (!coinbaseConnector) {
          return alert('Cannot connect to Coinbase connector')
        }
        connect({ connector: coinbaseConnector })
      },
      icon: <WalletIcon src={CoinabseWalletIcon} />
    }

    // if no preferred wallet chosen
    return [
      coinbaseOption,
      allWalletsOption
    ]
  }

  const system = defineSystem()

// @ts-ignore
  const injected = connectors.find(connector => connector.id === "injected")
  const injectedOption = getInjectedWalletOption(
    wallet,
    system,
    () => {
      setStep('download_await')
    },
    connect,
    <WalletIcon src={BrowserWalletIcon} />,
    injected
  )

  const ledgerOption = {
    title: 'LedgerLive',
    onClick: async () => {
      setStep('ledger_connection')
    },
    icon: <WalletIcon src={LedgerLiveWalletIcon} />,
  }

  // @ts-ignore
  const coinbaseConnector = connectors.find(connector => connector.id === "coinbaseWalletSDK")
  const coinbaseSmartWalletOption = {
    title: 'Create a smart wallet',
    onClick: () => {
      if (!coinbaseConnector) {
        return alert('Cannot connect to Coinbase connector')
      }
      connect({ connector: coinbaseConnector })
    },
    icon: <WalletIcon src={CoinabseWalletIcon} />
  }

  const injectedOptionIsBrave = injected && injected.name === 'Brave Wallet'
  const coinbaseWalletOption = (injectedOption && !injectedOptionIsBrave) ? undefined : getWalletOption(
    'coinbase_wallet',
    'Coinbase Wallet App',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={CoinabseWalletIcon} />,
    deeplinkRedirect,
    claimCode,
    wallet
  )

  const wallet1InchOption = getWalletOption(
    'wallet_1inch',
    '1inch',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={Wallet1inch} />,
    deeplinkRedirect,
    claimCode,
    wallet
  )

  const trustOption = (injectedOption && !injectedOptionIsBrave) ? undefined : getWalletOption(
    'trust',
    'Trust Wallet',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={TrustWalletIcon} />,
    deeplinkRedirect,
    claimCode,
    wallet
  )

  const rainbowOption = (injectedOption && !injectedOptionIsBrave) ? undefined : getWalletOption(
    'rainbow',
    'Rainbow',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={RainbowWalletIcon} />,
    deeplinkRedirect,
    claimCode,
    wallet
  )

  const imtokenOption = (injectedOption && !injectedOptionIsBrave) ? undefined : getWalletOption(
    'imtoken',
    'ImToken',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={ImtokenWalletIcon} />,
    deeplinkRedirect,
    claimCode,
    wallet
  )

  const okxWallet = (injectedOption && !injectedOptionIsBrave) ? undefined : getWalletOption(
    'okx_wallet',
    'OKX Wallet',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={OKXWalletIcon} />,
    deeplinkRedirect,
    claimCode,
    wallet
  )

  const primaryOption = defineOption(
    wallet,
    system,
    injectedOption,
    coinbaseWalletOption,
    coinbaseSmartWalletOption,
    wallet1InchOption,
    imtokenOption,
    trustOption,
    rainbowOption,
    ledgerOption,
    okxWallet
  )

  const wallets = [
    primaryOption,
    allWalletsOption
  ]

  return wallets
}

const WalletsList: FC<ReduxType> = ({
  setStep,
  wallet,
  chainId,
  claimCode,
  isManual,
  deeplinkRedirect,
  type,
  preferredWalletOn,
  setAutoclaim
}) => {
  const { open } = useWeb3Modal()
  // const open =  async () => alert('sss')
  const { connect, connectors } = useConnect()

  useEffect(() => {
    setAutoclaim(true)
  }, [])
  const options = defineOptionsList(
    type,
    setStep,
    open,
    connect,
    connectors,
    wallet,
    (deeplink: string, walletId: TWalletName) => deeplinkRedirect(deeplink, walletId, () => setStep('wallet_redirect_await')),
    isManual,
    chainId as number,
    claimCode as string,
    preferredWalletOn
  )

  return <Container>
    <TitleComponent>Connect a wallet</TitleComponent>
    <TextComponent>
      Select an existing crypto wallet or create a new one to proceed with your claim
    </TextComponent>
    <ImageContainer>
      <Icons.WalletImageIcon />
    </ImageContainer>
    <OptionsListStyled options={options} />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(WalletsList)