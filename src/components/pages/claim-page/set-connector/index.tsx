import { FC } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  Subtitle,
  TokenImageContainer,
  TextComponent
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { shortenString } from 'helpers'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux';
import { DropActions } from 'data/store/reducers/drop/types'

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type }
}: RootState) => ({
  name, image, type, tokenId
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    chooseWallet: () => dispatch(
      dropActions.setStep('choose_wallet')
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineTokenId = (tokenId?: string | null) => {
  if (!tokenId) { return '' }
  if (tokenId.length > 5) {
    return ` #${shortenString(tokenId, 3)}`
  }
  return ` #${tokenId}`
}

const SetConnector: FC<ReduxType> = ({
  name,
  tokenId,
  image,
  chooseWallet
}) => {

  return <Container> 
    {image && <TokenImageContainer src={image} alt={name} />}
    <Subtitle>{name}{defineTokenId(tokenId)}</Subtitle>
    <TitleComponent>Zerion ETHDenver 2023</TitleComponent>
    <TextComponent>
      Claim this free NFT and get early access to the Zerion Browser Extension.
    </TextComponent>
    <ScreenButton onClick={() => {
      chooseWallet()
    }}>
      Claim
    </ScreenButton>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(SetConnector)