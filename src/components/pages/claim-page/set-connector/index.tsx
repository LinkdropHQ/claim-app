import { FC, useEffect } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  Subtitle,
  TokenImageContainer,
  TextComponent,
  PoweredBy,
  PoweredByImage,
} from './styled-components'
import { ERC20TokenPreview } from 'components/pages/common'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { shortenString, defineSystem } from 'helpers'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux';
import { DropActions } from 'data/store/reducers/drop/types'
import { useConnect } from 'wagmi'
import LinkdropLogo from 'images/linkdrop-header.png'
import { TDropType } from 'types'
import { plausibleApi } from 'data/api'

const mapStateToProps = ({
  token: { name, image, decimals },
  drop: { tokenId, type, campaignId, amount },
  user: { address }
}: RootState) => ({
  name,
  image,
  type,
  tokenId,
  address,
  campaignId,
  amount,
  decimals
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    chooseWallet: () => dispatch(
      dropActions.setStep('choose_wallet')
    )
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
  
}) => {

  const { connect, connectors } = useConnect()
  const injected = connectors.find(connector => connector.id === "injected")
  const system = defineSystem()

  useEffect(() => {
    plausibleApi.invokeEvent({
      eventName: 'claimpage_open',
      data: {
        campaignId: campaignId as string,
        status: 'loaded'
      }
    })
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
    <TitleComponent>Early access NFT to Zerion extension wallet</TitleComponent>
    <TextComponent>
      Be one of the first to access the Zerion extension
    </TextComponent>
  </>

  return <Container> 
    {content}
    <ScreenButton onClick={() => {
      plausibleApi.invokeEvent({
        eventName: 'claimpage_click',
        data: {
          campaignId: campaignId as string
        }
      })
      if (!address && injected && injected.ready && system !== 'desktop' && injected.name !== 'Brave Wallet') {
        return connect({ connector: injected })
      }
      chooseWallet()
    }}>
      Claim
    </ScreenButton>
    <PoweredBy href='https://linkdrop.io' target='_blank'>
      Powered by
      <PoweredByImage src={LinkdropLogo} alt="Linkdrop Logo"/>
    </PoweredBy>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(SetConnector)