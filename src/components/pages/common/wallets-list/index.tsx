import { FC, useState } from 'react'
import {
  TitleComponent,
  Container,
  TextComponent,
  OptionsListStyled,
  WalletIcon,
  LinkButton,
  AdditionalNoteComponentStyled
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { useWeb3Modal } from "@web3modal/react"
import MetamaskIcon from 'images/metamask-wallet.png'
import TrustWalletIcon from 'images/trust-wallet.png'
import CoinabseWalletIcon from 'images/coinbase-wallet.png'
import ZerionWalletIcon from 'images/zerion-wallet.png'
import LedgerLiveWalletIcon from 'images/ledgerlive-wallet.png'
import RainbowWalletIcon from 'images/rainbow-wallet.png'
import ImtokenWalletIcon from 'images/imtoken-wallet.png'
import WalletConnectIcon from 'images/walletconnect-wallet.png'
import CrossmintIcon from 'images/crossmint-wallet.png'
import ENSIcon from 'images/ens-logo.png'
import { useConnect, Connector } from 'wagmi'
import { TDropStep, TMultiscanStep, TWalletName, TWalletOption, TDropType } from 'types'
import { OverlayScreen } from 'linkdrop-ui'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { PopupWalletListContents, PopupWhatIsWalletContents } from 'components/pages/common'
import { defineSystem, sortWallets, getWalletOption, defineApplicationConfig, getInjectedWalletOption } from 'helpers'
import { plausibleApi } from 'data/api'
import LinkdropLogo from 'images/linkdrop.png'
import LinkdropLogoLight from 'images/linkdrop-light.png'
import BrowserWalletIcon from 'images/browser-wallet.png'
import TProps from './types'
const { REACT_APP_WC_PROJECT_ID } = process.env

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
    availableWallets
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
  availableWallets
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
    ))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps

const isOptionVisible = (
  option: TWalletOption | undefined,
  preferredWallet: string | null,
  currentOption: string,
  availableWallets: string[],
  additionalCondition?: boolean
) => {
  if (additionalCondition !== undefined && !additionalCondition) {
    return undefined
  }
  if (!option) { return undefined }
  if (!availableWallets || availableWallets.length === 0 || currentOption === preferredWallet) {
    return option
  }
  if (availableWallets && availableWallets.includes(currentOption)) {
    return option
  }
}

const defineOptionsList = (
  type: TDropType | null,
  setStep: (step: TDropStep & TMultiscanStep) => void,
  open: (options?: any | undefined) => Promise<void>,
  connect: (args: Partial<any> | undefined) => void,
  connectors: Connector<any, any>[],
  wallet: TWalletName | null,
  deeplinkRedirect: (
    deeplink: string,
    walletId: TWalletName
  ) => Promise<void>,
  isManual: boolean,
  chainId: number,
  availableWallets: string[],
  enableENS?: boolean,
  enableZerion?: boolean
) => {

  const system = defineSystem()
  const ensOption = !isManual && enableENS ? {
    title: 'ENS or address',
    onClick: () => setStep('set_address'),
    icon: <WalletIcon src={ENSIcon} />
  } : undefined

  const walletconnect = connectors.find(connector => connector.id === "walletConnect")
  const walletConnectOption = {
    title: 'WalletConnect',
    onClick: () => {
      // connect({ connector: walletconnect })
      open()
    },
    icon: <WalletIcon src={WalletConnectIcon} />,
    recommended: wallet === 'walletconnect'
  }

  const crossmintOption = {
    title: 'Sign in with email',
    onClick: () => {
      setStep('crossmint_connection')
    },
    icon: <WalletIcon src={CrossmintIcon} />,
    recommended: wallet === 'crossmint'
  }

  const injected = connectors.find(connector => connector.id === "injected")
  const injectedOption = getInjectedWalletOption(
    wallet,
    system,
    () => setStep('download_await'),
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
    recommended: wallet === 'ledger'
  }

  if (system === 'desktop') {
    const coinbaseConnector = connectors.find(connector => connector.id === "coinbaseWallet")
    const coinbaseOption = {
      title: 'Coinbase Wallet',
      onClick: () => {
        if (!coinbaseConnector) {
          return alert('Cannot connect to Coinbase connector')
        }
        connect({ connector: coinbaseConnector })
      },
      icon: <WalletIcon src={CoinabseWalletIcon} />,
      recommended: wallet === 'coinbase_wallet'
    }

    const wallets = [
      isOptionVisible(injectedOption, wallet, 'metamask', availableWallets),
      isOptionVisible(crossmintOption, wallet, 'crossmint', availableWallets, type !== 'ERC20' && !isManual),
      isOptionVisible(coinbaseOption, wallet, 'coinbase_wallet', availableWallets),
      isOptionVisible(walletConnectOption, wallet, 'walletconnect', availableWallets),
      isOptionVisible(ledgerOption, wallet, 'ledger', availableWallets),
      isOptionVisible(ensOption, wallet, 'manual_address', availableWallets)
    ]

    return sortWallets(wallets) 
  }

  const injectedOptionIsBrave = injected && injected.name === 'Brave Wallet'

  const metamaskOption = (injectedOption && !injectedOptionIsBrave) ? undefined : getWalletOption(
    'metamask',
    'Metamask',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={MetamaskIcon} />,
    deeplinkRedirect,
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
    wallet
  )

  const coinbaseOption = (injectedOption && !injectedOptionIsBrave) ? undefined : getWalletOption(
    'coinbase_wallet',
    'Coinbase Wallet',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={CoinabseWalletIcon} />,
    deeplinkRedirect,
    wallet
  )

  const zerionOption = ((injectedOption && !injectedOptionIsBrave) || isManual || !enableZerion) ? undefined : {
    title: 'Zerion',
    onClick: async () => {
      setStep('zerion_connection')
    },
    icon: <WalletIcon src={ZerionWalletIcon} />,
    recommended: wallet === 'zerion'
  }

  const rainbowOption = (injectedOption && !injectedOptionIsBrave) ? undefined : getWalletOption(
    'rainbow',
    'Rainbow',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={RainbowWalletIcon} />,
    deeplinkRedirect,
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
    wallet
  )

  const wallets = [
    isOptionVisible(injectedOption, wallet, 'metamask', availableWallets),
    isOptionVisible(metamaskOption, wallet, 'metamask', availableWallets),
    isOptionVisible(coinbaseOption, wallet, 'coinbase_wallet', availableWallets),
    isOptionVisible(zerionOption, wallet, 'zerion', availableWallets),
    isOptionVisible(walletConnectOption, wallet, 'walletconnect', availableWallets),
    isOptionVisible(crossmintOption, wallet, 'crossmint', availableWallets, type !== 'ERC20' && !isManual),
    isOptionVisible(ensOption, wallet, 'manual_address', availableWallets),
    isOptionVisible(imtokenOption, wallet, 'imtoken', availableWallets),
    isOptionVisible(trustOption, wallet, 'trust', availableWallets),
    isOptionVisible(rainbowOption, wallet, 'rainbow', availableWallets),
    isOptionVisible(ledgerOption, wallet, 'ledger', availableWallets)
  ]

  return sortWallets(wallets)
}

const WalletsList: FC<ReduxType> = ({
  setStep,
  wallet,
  chainId,
  isManual,
  campaignId,
  deeplinkRedirect,
  availableWallets,
  enableENS,
  enableZerion,
  type
}) => {
  const { open } = useWeb3Modal()
  const { connect, connectors } = useConnect()
  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  const system = defineSystem()
  const injected = connectors.find(connector => connector.id === "injected")
  const configs = defineApplicationConfig()

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
    availableWallets,
    enableENS,
    enableZerion
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
    {system !== 'desktop' && <AdditionalNoteComponentStyled
      text='Don’t know what to choose?'
      position='bottom'
      onClick={() => {
        plausibleApi.invokeEvent({
          eventName: 'educate_me',
          data: {
            campaignId: campaignId as string,
            screen: 'what_is_connection'
          }
        })
        setShowPopup(true)
      }}
    />}
    {showPopup && <OverlayScreen
      headerLogo={configs.footerLogoStyle === 'dark' ? LinkdropLogo : LinkdropLogoLight}
      title={system === 'desktop' ? 'What is a Wallet?' : 'Connecting your wallet'}
      onCloseAction={() => { setShowPopup(false) }}
      mainAction={() => { setShowPopup(false) }}
    >
      {system === 'desktop' ? <PopupWhatIsWalletContents /> : <PopupWalletListContents />}
    </OverlayScreen>}
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(WalletsList)