import { FC, useEffect, useState } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  TokenImageContainer,
  TextComponent
} from './styled-components'
import { ERC20TokenPreview, PoweredByFooter } from 'components/pages/common'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { useConnect } from 'wagmi'
import {
  defineApplicationConfig
} from 'helpers'
import { TDropStep, TDropType, TWalletName } from 'types'
import { plausibleApi } from 'data/api'
const { REACT_APP_CLIENT} = process.env
const config = defineApplicationConfig()

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
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const SetConnector: FC<ReduxType> = ({
  name,
  image,
  type,
  campaignId,
  amount,
  decimals,
  wallet,
  chainId,
  availableWallets
}) => {
  const { connect, connectors } = useConnect()
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

  const mainTitle = config.primaryText || name
  const mainDescription = config.primaryDescription || 'Here is a preview of the NFT you’re about to receive'

  const content = type === 'ERC20' ? <ERC20TokenPreview
    name={name}
    image={image as string}
    amount={amount as string}
    decimals={decimals}
    status='initial'
  /> : <>
    {image && <TokenImageContainer src={image} alt={name} />}
    <TitleComponent>{mainTitle}</TitleComponent>
    <TextComponent>
      {mainDescription}
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

        const coinbaseConnector = connectors.find(connector => connector.id === "coinbaseWalletSDK")
        if (coinbaseConnector) {
          return connect({ connector: coinbaseConnector })
        }
      }
    }>
      Claim
    </ScreenButton>
    <PoweredByFooter />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(SetConnector)