import { FC, useEffect, useState } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  Subtitle,
  TokenImageContainer,
  TextComponent
} from './styled-components'
import { ERC20TokenPreview, PoweredByFooter } from 'components/pages/common'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { shortenString, defineSystem, getWalletDeeplink } from 'helpers'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { useConnect } from 'wagmi'
import { TDropType, TWalletName } from 'types'
import { plausibleApi } from 'data/api'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'

const mapStateToProps = ({
  token: { name, image, decimals },
  drop: { tokenId, type, campaignId, amount, wallet, chainId },
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
  chainId
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    chooseWallet: () => dispatch(
      dropActions.setStep('choose_wallet')
    ),
    deeplinkRedirect: (
      deeplink: string,
      walletId: TWalletName
    ) => dispatch(dropAsyncActions.deeplinkRedirect(deeplink, walletId)),
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
  chooseWallet,
  address,
  type,
  campaignId,
  amount,
  decimals,
  wallet,
  chainId,
  deeplinkRedirect
}) => {
  const { connect, connectors } = useConnect()
  const injected = connectors.find(connector => connector.id === 'injected')
  const system = defineSystem()
  const [ initialized, setInitialized ] = useState<boolean>(false)

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

  const content = type === 'ERC20' ? <ERC20TokenPreview
    name={name}
    image={image as string}
    amount={amount as string}
    decimals={decimals}
    status='initial'
  /> : <>
    {image && <TokenImageContainer src={image} alt={name} />}
    <Subtitle>{defineTokenId(type, tokenId)}</Subtitle>
    <TitleComponent>{name}</TitleComponent>
    <TextComponent>
      Here is a preview of the NFT you’re about to receive
    </TextComponent>
  </>

  return <Container> 
    {content}
    <ScreenButton
      appearance='action'
      disabled={!initialized}
      onClick={() => {
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

        if (wallet === 'coinbase_wallet' && chainId) {
          const coinbaseDeeplink = getWalletDeeplink('coinbase_wallet', system, window.location.href, chainId)
          if (coinbaseDeeplink) {
            return deeplinkRedirect(coinbaseDeeplink, 'coinbase_wallet')
          }
        }

        chooseWallet()
      }
    }>
      Claim
    </ScreenButton>
    <PoweredByFooter />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(SetConnector)