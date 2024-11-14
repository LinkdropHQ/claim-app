import { FC,useState } from 'react'
import {
  Container,
  TitleComponent,
  Subtitle,
  ButtonStyled,
  PreviewImage
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
// import { AdditionalNoteComponent, OverlayScreen } from 'linkdrop-ui'
import LinkdropLogo from 'images/linkdrop.png'
import LinkdropLogoLight from 'images/linkdrop-light.png'
import { PopupContents } from './components'
import Image from 'images/redirect-await.png'
import { getWalletDeeplink, defineSystem, defineApplicationConfig } from 'helpers'
import wallets from 'configs/wallets'

const mapStateToProps = ({
  drop: {
    walletApp,
    chainId,
    type
  },
}: RootState) => ({
  walletApp,
  chainId,
  type
})

type ReduxType = ReturnType<typeof mapStateToProps>

const WalletRedirectAwait: FC<ReduxType> = ({
  walletApp,
  chainId,
  type
}) => {
  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  const system = defineSystem()
  const configs = defineApplicationConfig()
  const walletDeeplink = walletApp && chainId ? getWalletDeeplink(walletApp, system, window.location.href, chainId) : undefined
  const wallet = walletApp && wallets[walletApp]
  return <Container>
    <PreviewImage src={Image} alt='redirect await image' />
    <TitleComponent>Continue in {wallet?.name}</TitleComponent>
    <Subtitle>You will be redirected to the wallet where you will be guided to claim {type === 'ERC20' ? 'tokens' : 'an NFT'}</Subtitle>
    {walletDeeplink ? <ButtonStyled
      href={walletDeeplink}
      target='_blank'
      appearance='action'
    >
      Open in {wallet?.name}
    </ButtonStyled> : null}
    {/* <AdditionalNoteComponent
      text='Need help? Read here how to proceed'
      position='bottom'
      onClick={() => {
        setShowPopup(true)
      }}
    /> */}
    {/* {showPopup && <OverlayScreen
      headerLogo={configs.footerLogoStyle === 'dark' ? LinkdropLogo : LinkdropLogoLight}
      title='Need Help?'
      onCloseAction={() => { setShowPopup(false) }}
      mainAction={() => { setShowPopup(false) }}
    >
      <PopupContents />
    </OverlayScreen>} */}
  </Container>
}

export default connect(mapStateToProps)(WalletRedirectAwait)