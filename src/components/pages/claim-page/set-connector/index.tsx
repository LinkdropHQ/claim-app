import { FC, useEffect, useState } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  TextComponent,
  NFTTokenPreviewStyled
} from './styled-components'
import { ERC20TokenPreview, PoweredByFooter } from 'components/pages/common'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import {
  shortenString,
  defineSystem,
  getWalletDeeplink,
  defineLedgerClaimDescription,
  defineLedgerClaimTitle
} from 'helpers'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { useConnect } from 'wagmi'
import { TDropStep, TDropType, TWalletName } from 'types'
import { plausibleApi } from 'data/api'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { useWeb3Modal } from "@web3modal/react"

const mapStateToProps = ({
  token: { name, image, decimals, },
  drop: { tokenId, type, campaignId, amount, wallet, chainId, availableWallets },
  user: { address }
}: RootState) => ({
  name,
  image,
  type,
  tokenId,
  address,
  campaignId,
  amount,
  decimals,
  wallet,
  chainId,
  availableWallets
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    setStep: (step: TDropStep) => dispatch(
      dropActions.setStep(step)
    ),
    deeplinkRedirect: (
      deeplink: string,
      walletId: TWalletName,
      redirectCallback: () => void
    ) => dispatch(dropAsyncActions.deeplinkRedirect(deeplink, walletId, redirectCallback)),
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineTokenId = (type: TDropType | null, tokenId?: string | null) => {
  if (type === 'ERC20' || !tokenId) { return '' }
  if (tokenId.length > 5) {
    return ` #${shortenString(tokenId, 3)}`
  }
  return ` #${tokenId}`
}

const SetConnector: FC<ReduxType> = ({
  name,
  tokenId,
  image,
  setStep,
  address,
  type,
  campaignId,
  amount,
  decimals,
  wallet,
  chainId,
  deeplinkRedirect,
  availableWallets
}) => {
  const { connect, connectors } = useConnect()
  const { open } = useWeb3Modal()


  const injected = connectors.find(connector => connector.id === 'injected')
  const system = defineSystem()
  const [ initialized, setInitialized ] = useState<boolean>(false)
  const buttonClick = () => {

    plausibleApi.invokeEvent({
      eventName: 'claimpage_click',
      data: {
        campaignId: campaignId as string
      }
    })
    // connect to wallet if has injected
    if (
      !address &&
      injected &&
      injected.ready &&
      system !== 'desktop' &&
      injected.name !== 'Brave Wallet'
    ) {
      return connect({ connector: injected })
    }

    if (
      wallet &&
      chainId &&
      availableWallets.includes(wallet) &&
      availableWallets.length === 1
    ) {
      if (
        wallet !== 'walletconnect' &&
        wallet !== 'manual_address' &&
        wallet !== 'crossmint' &&
        wallet !== 'zerion'
      ) {
        const deeplink = getWalletDeeplink(wallet, system, window.location.href, chainId)
        if (deeplink) {
          return deeplinkRedirect(deeplink, wallet, () => setStep('wallet_redirect_await'))
        }
      } else if (
        wallet === 'walletconnect'
      ) {
        return open()
      } else if (wallet === 'zerion') {
        return setStep('zerion_connection')
      } else if (wallet === 'crossmint') {
        return setStep('crossmint_connection')
      } else if (wallet === 'manual_address') {
        return setStep('set_address')
      }

    } 

    setStep('choose_wallet')
  }

  useEffect(() => {
    plausibleApi.invokeEvent({
      eventName: 'claimpage_open',
      data: {
        campaignId: campaignId as string,
        status: 'loaded'
      }
    })
  }, [])

  useEffect(() => {
    // connect instantly if opened in Coinbase wallet
    if(window &&
      window.ethereum &&
      // @ts-ignore
      window.ethereum.isCoinbaseWallet &&
      system !== 'desktop' && 
      injected &&
      injected.ready
    ) {
      return connect({ connector: injected })
    } else {
      setInitialized(true)
    }
  }, [])

  const description = defineLedgerClaimDescription(String(tokenId))

  const content = type === 'ERC20' ? <ERC20TokenPreview
    name={name}
    image={image as string}
    amount={amount as string}
    decimals={decimals}
    status='initial'
  /> : <>
    {image && <NFTTokenPreviewStyled image={image} name={name} tokenId={tokenId} />}
    <TitleComponent>{defineLedgerClaimTitle(tokenId as string)}</TitleComponent>
    <TextComponent>
      {description}
    </TextComponent>
  </>

  return <Container> 
    {content}
    <ScreenButton
      appearance='action'
      disabled={!initialized}
      onClick={buttonClick}>
      Claim
    </ScreenButton>
    <PoweredByFooter />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(SetConnector)