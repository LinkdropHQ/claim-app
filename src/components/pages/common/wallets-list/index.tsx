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
import { useAppKit } from '@reown/appkit/react'
import TrustWalletIcon from 'images/trust-wallet.png'
import CoinabseWalletIcon from 'images/coinbase-wallet.png'
import LedgerLiveWalletIcon from 'images/ledgerlive-wallet.png'
import RainbowWalletIcon from 'images/rainbow-wallet.png'
import ImtokenWalletIcon from 'images/imtoken-wallet.png'
import OKXWalletIcon from 'images/okx-wallet.png'
import ZerionWallet from 'images/zerion-wallet.png'

import Wallet1inch from 'images/wallet-1inch.png'
import { Config, useConnect } from 'wagmi'
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
  getInjectedWalletOption,
  defineDefaultWalletApp
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
  injectedOption: any, // connector
  coinbaseWalletOption: any, // connector
  coinbaseSmartWalletOption: any, // deeplink
  wallet1InchOption: any, // deeplink
  imtokenOption: any, // deeplink
  trustOption: any, // deeplink
  rainbowOption: any, // deeplink
  ledgerOption: any, // redirect
  okxWalletOption: any, // deeplink
  zerionWallet: any // deeplink
) => {
  switch (system) {
    case 'desktop': {
      switch (wallet) {
        case 'metamask':
        case 'okx_wallet':
          return injectedOption
        case 'coinbase_wallet':
          return coinbaseWalletOption
        case 'coinbase_smart_wallet':
          return coinbaseSmartWalletOption
        case 'ledger':
          return ledgerOption
        case 'zerion':
          return zerionWallet
        case 'wallet_1inch':
          return wallet1InchOption
        default:
          return coinbaseSmartWalletOption
      }
    }


    case 'android':
    case 'ios':
    default: {
      switch (wallet) {
        case 'metamask':
          return injectedOption
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
        case 'zerion':
          return zerionWallet
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
  const defaultWalletApp = defineDefaultWalletApp(chainId)

  const allWalletsOption = {
    title: 'I already have a wallet',
    onClick: () => {
      open()
    }
  }

  const system = defineSystem()
  // @ts-ignore
  const injected = connectors.find(connector => connector.id === "injected")
  if (!preferredWalletOn) {
    if (defaultWalletApp === 'okx_wallet') {
      if (system === 'desktop') {
        const okxWallet = getInjectedWalletOption(
          wallet,
          system,
          () => {
            setStep('download_await')
          },
          connect,
          <WalletIcon src={OKXWalletIcon} />,
          injected,
          'OKX Wallet'
        )
  
        // if no preferred wallet chosen
        return [
          okxWallet,
          allWalletsOption
        ]
      } else {
        const okxWallet = getWalletOption(
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
  
        // if no preferred wallet chosen
        return [
          okxWallet,
          allWalletsOption
        ]
      }
      
    } else if (defaultWalletApp === 'zerion') {
      if (system === 'desktop') {
        const zerionWallet = getInjectedWalletOption(
          wallet,
          system,
          () => {
            setStep('download_await')
          },
          connect,
          <WalletIcon src={ZerionWallet} />,
          injected,
          'Zerion Wallet'
        )
  
        // if no preferred wallet chosen
        return [
          zerionWallet,
          allWalletsOption
        ]
      } else {
        const zerionWallet = getWalletOption(
          'zerion',
          'Zerion Wallet',
          system,
          window.location.href, 
          chainId,
          <WalletIcon src={ZerionWallet} />,
          deeplinkRedirect,
          claimCode,
          wallet
        )
  
        // if no preferred wallet chosen
        return [
          zerionWallet,
          allWalletsOption
        ]
      }
    }

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

  let injectedOption
  if (defaultWalletApp === 'okx_wallet') {
    injectedOption = getInjectedWalletOption(
      wallet,
      system,
      () => {
        // setStep('download_await')
      },
      connect,
      <WalletIcon src={OKXWalletIcon} />,
      injected,
      'OKX Wallet'
    )
  } else {
    injectedOption = getInjectedWalletOption(
      wallet,
      system,
      () => {
        setStep('download_await')
      },
      connect,
      <WalletIcon src={BrowserWalletIcon} />,
      injected
    )
  }

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
  

  const coinbaseWalletOption = getWalletOption(
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

  const trustOption = getWalletOption(
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

  const rainbowOption = getWalletOption(
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

  const imtokenOption = getWalletOption(
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

  const okxWallet = getWalletOption(
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

  const zerionWallet = getWalletOption(
    'zerion',
    'Zerion Wallet',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={ZerionWallet} />,
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
    okxWallet,
    zerionWallet
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
  const { open } = useAppKit()
  // const open =  async () => alert('sss')
  // @ts-ignore
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