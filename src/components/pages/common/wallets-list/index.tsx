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
import LedgerLiveWalletIcon from 'images/ledgerlive-wallet.png'
import WalletConnectIcon from 'images/walletconnect-wallet.png'
import { useConnect, Connector } from 'wagmi'
import { TDropStep, TMultiscanStep, TWalletName, TDropType } from 'types'
import { OverlayScreen } from 'linkdrop-ui'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { PopupWalletListContents, PopupWhatIsWalletContents } from 'components/pages/common'
import { defineSystem, sortWallets, defineApplicationConfig } from 'helpers'
import { plausibleApi } from 'data/api'
import LinkdropLogo from 'images/linkdrop.png'
import LinkdropLogoLight from 'images/linkdrop-light.png'
import TProps from './types'

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


  const walletConnectOption = {
    title: 'WalletConnect',
    onClick: () => {
      // connect({ connector: walletconnect })
      open()
    },
    icon: <WalletIcon src={WalletConnectIcon} />,
    recommended: wallet === 'walletconnect'
  }

  const ledgerOption = {
    title: 'LedgerLive',
    onClick: async () => {
      setStep('ledger_connection')
    },
    icon: <WalletIcon src={LedgerLiveWalletIcon} />,
    recommended: wallet === 'ledger'
  }

  const wallets = [
    ledgerOption,
    walletConnectOption
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