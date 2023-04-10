import { FC } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  TokenImageContainer,
  TextComponent
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { shortenString } from 'helpers'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux';
import { DropActions } from 'data/store/reducers/drop/types'
import { useConnect } from 'wagmi'

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
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()

  // get injected connector
  const injectedProvider = connectors.filter(c => c.id === "injected")[0]

  if (injectedProvider.ready) { //  if provider is injected
    return <Container>
      {image && <TokenImageContainer src={image} alt={name} />}
      <TitleComponent>{name}{defineTokenId(tokenId)}</TitleComponent>
      <TextComponent>
        Claim this free NFT and get early access to the Zerion Browser Extension.
      </TextComponent>
      <div>
        <ScreenButton
          disabled={!injectedProvider.ready}
          key={injectedProvider.id}
          onClick={() => connect({ connector: injectedProvider })}
          >
          Connect Wallet
        </ScreenButton>
        {error && <div>{error.message}</div>}
      </div>
    </Container>
  }

  return <Container>
    {image && <TokenImageContainer src={image} alt={name} />}
    <TitleComponent>{name}{defineTokenId(tokenId)}</TitleComponent>
    <TextComponent>
      Claim this free NFT and get early access to the Zerion Browser Extension.
    </TextComponent>
    <ScreenButton onClick={() => {
      chooseWallet()
    } }>
      Claim
    </ScreenButton>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(SetConnector)
