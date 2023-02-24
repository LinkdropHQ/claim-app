import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { shortenString } from 'helpers'
import { 
  TitleComponent,
  ButtonsContainer,
  ScreenButton,
  TokenImageSmall,
  TokenImageContainer,
  DoneIcon,
  Container,
  Description,
  UserAddress
} from './styled-components'

const mapStateToProps = ({
  drop: {
    hash,
    chainId,
    redirectToOnboarding
  },
  user: {
    address
  },
  token: {
    image,
    name
  }
}: RootState) => ({
  image,
  address,
  name,
  chainId,
  hash,
  redirectToOnboarding
})

type ReduxType = ReturnType<typeof mapStateToProps>

const ClaimingFinished: FC<ReduxType> = ({
  image,
  name,
  address
}) => {
  const title = <TitleComponent>Successfully claimed</TitleComponent>
  return <Container>
    {image && <TokenImageContainer>
      <DoneIcon />
      <TokenImageSmall
        src={image}
        alt={name}
      />
    </TokenImageContainer>}
    {title}
    <Description>
      Your NFT has been sent to this address: <UserAddress>{shortenString(address, 3)}</UserAddress>
    </Description>
    <Description>
      Next, sign up for the “Early Access” to Zerion Browser Extension.
    </Description>
    <ButtonsContainer>
      <ScreenButton href='https://zerion.io/extension-waitlist-form' target='_blank'>
        Get Early Access
      </ScreenButton>
    </ButtonsContainer>
  </Container>
}

export default connect(mapStateToProps)(ClaimingFinished)