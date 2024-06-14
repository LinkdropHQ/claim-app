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
import { TDropStep, TDropType, TWalletName } from 'types'
import { plausibleApi } from 'data/api'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { useWeb3Modal } from "@web3modal/react"
const { REACT_APP_CLIENT } = process.env

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
    if (
      availableWallets.length === 1 &&
      availableWallets[0] === 'coinbase_wallet'
    ) {
      return setInitialized(true)
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
    <TitleComponent>I love you, onchain</TitleComponent>
    <TextComponent>
    Tap to claim an onchain memento of our wedding, as well as 0.001 ETH on Base to get your started exploring onchain
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

        if (
          wallet &&
          chainId &&
          availableWallets.includes(wallet) &&
          availableWallets.length === 1
        ) {
          if (wallet === 'coinbase_wallet') {
            const coinbaseConnector = connectors.find(connector => connector.id === "coinbaseWalletSDK")
            if (coinbaseConnector) {
              return connect({ connector: coinbaseConnector })
            }
          }
        }

        setStep('choose_wallet')
      }
    }>
      Claim
    </ScreenButton>
    <PoweredByFooter />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(SetConnector)