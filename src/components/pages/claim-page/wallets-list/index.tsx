import { FC, useState } from 'react'
import {
  TitleComponent,
  Container,
  TextComponent,
  OptionsListStyled,
  WalletIcon,
  LinkButton
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { useWeb3Modal } from "@web3modal/react"
import MetamaskIcon from 'images/metamask-wallet.png'
import TrustWalletIcon from 'images/trust-wallet.png'
import CoinabseWalletIcon from 'images/coinbase-wallet.png'
import BrowserWalletIcon from 'images/browser-wallet.png'
import ZerionWalletIcon from 'images/zerion-wallet.png'
import RainbowWalletIcon from 'images/rainbow-wallet.png'
import WalletConnectIcon from 'images/walletconnect-wallet.png'
import ENSIcon from 'images/ens-logo.png'
import { useConnect, Connector } from 'wagmi'
import { TDropStep } from 'types'
import * as dropActions from 'data/store/reducers/drop/actions'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { defineSystem, getWalletDeeplink } from 'helpers'
import { detect } from 'detect-browser'
import { plausibleApi } from 'data/api'


const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type, wallet, claimCode, chainId, isManual, campaignId }
}: RootState) => ({
  name, image, type, tokenId, wallet, claimCode, chainId, isManual, campaignId
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    setAddress: () => dispatch(
      dropActions.setStep('set_address')
    ),
    setStep: (step: TDropStep) => dispatch(dropActions.setStep(step)),
    updateUserData: (
      address: string,
      chainId: number
    ) => dispatch(userAsyncActions.updateUserData(address, chainId))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineOptionsList = (
  setAddress: () => void,
  setStep: (step: TDropStep) => void,
  open: (options?: any | undefined) => Promise<void>,
  connect: (args: Partial<any> | undefined) => void,
  connectors: Connector<any, any, any>[],
  wallet: string | null,
  downloadStarted: () => void,
  isManual: boolean,
  chainId: number
) => {
  const system = defineSystem()
  const ensOption = !isManual ? {
    title: 'Enter ENS or address',
    onClick: setAddress,
    icon: <WalletIcon src={ENSIcon} />
  } : undefined

  const walletConnectOption = {
    title: 'WalletConnect',
    onClick: () => {
      open()
    },
    icon: <WalletIcon src={WalletConnectIcon} />,
    recommended: wallet === 'walletconnect'
  }
  const injected = connectors.find(connector => connector.id === "injected")

  const installMetamask = {
    title: 'Browser Wallet',
    onClick: () => {
      window.open('https://metamask.io/download/', '_blank')
      downloadStarted()
    },
    icon: <WalletIcon src={BrowserWalletIcon} />,
    tag: 'Install MetaMask ->'
  }

  if (system === 'desktop') {
    const browser = detect()
    const injectedOption = browser?.name !== 'safari' ? (injected && injected.ready ? {
      title: 'Browser Wallet',
      onClick: () => {
        if (!injected) {
          return alert('Cannot connect to injected')
        }
        connect({ connector: injected })
      },
      icon: <WalletIcon src={BrowserWalletIcon} />,
      recommended: wallet && wallet !== 'walletconnect'
    } : installMetamask) : installMetamask

    return [
      injectedOption,
      walletConnectOption,
      ensOption
    ]
  }

  const injectedOptionIsBrave = injected && injected.name === 'Brave Wallet'

  const injectedOption = injected && injected.ready ? {
    title: 'Injected',
    onClick: () => {
      if (!injected) {
        return alert('Cannot connect to injected')
      }
      connect({ connector: injected })
    },
    icon: <WalletIcon src={BrowserWalletIcon} />,
  } : undefined

  const metamaskDeeplink = getWalletDeeplink('metamask', system, window.location.href, chainId)
  const metamaskOption = (injectedOption && !injectedOptionIsBrave) || !metamaskDeeplink ? undefined : {
    title: 'Metamask',
    href: metamaskDeeplink,
    icon: <WalletIcon src={MetamaskIcon} />,
  }

  const trustDeeplink = getWalletDeeplink('trust', system, window.location.href, chainId)
  const trustOption = (injectedOption && !injectedOptionIsBrave) || !trustDeeplink ? undefined : {
    title: 'Trust Wallet',
    href: trustDeeplink,
    icon: <WalletIcon src={TrustWalletIcon} />,
  }

  const coinbaseDeeplink = getWalletDeeplink('coinbase', system, window.location.href, chainId)
  const coinbaseOption = (injectedOption && !injectedOptionIsBrave) || !coinbaseDeeplink ? undefined : {
    title: 'Coinbase Wallet',
    href: coinbaseDeeplink,
    icon: <WalletIcon src={CoinabseWalletIcon} />,
  }

  const zerionOption = (injectedOption && !injectedOptionIsBrave) || isManual ? undefined : {
    title: 'Zerion',
    onClick: async () => {
      setStep('zerion_connection')
    },
    icon: <WalletIcon src={ZerionWalletIcon} />,
    recommended: true
  }

  const rainbowDeeplink = getWalletDeeplink('rainbow', system, window.location.href, chainId)
  const rainbowOption = (injectedOption && !injectedOptionIsBrave) || !rainbowDeeplink ? undefined : {
    title: 'Rainbow',
    href: rainbowDeeplink,
    icon: <WalletIcon src={RainbowWalletIcon} />,
  }

  const wallets = [
    zerionOption,
    injectedOption,
    metamaskOption,
    walletConnectOption,
    ensOption,
    rainbowOption,
    coinbaseOption,
    trustOption
  ]

  return wallets
}

const WalletsList: FC<ReduxType> = ({
  setAddress,
  setStep,
  wallet,
  chainId,
  updateUserData,
  isManual,
  campaignId
}) => {
  const { open } = useWeb3Modal()
  const { connect, connectors } = useConnect()
  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  const system = defineSystem()
  const injected = connectors.find(connector => connector.id === "injected")

  const options = defineOptionsList(
    setAddress,
    setStep,
    open,
    connect,
    connectors,
    wallet,
    () => setStep('download_await'),
    isManual,
    chainId as number
  )

  return <Container>
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      Choose a wallet from the list
    </TextComponent>
    <OptionsListStyled options={options} />
    {system === 'desktop' && !injected && <LinkButton onClick={() => {
      plausibleApi.invokeEvent({
        eventName: 'educate_me',
        data: {
          campaignId: campaignId as string,
          screen: 'what_is_a_wallet'
        }
      })
      setShowPopup(true)
    }}>What is browser wallet?</LinkButton>}
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(WalletsList)