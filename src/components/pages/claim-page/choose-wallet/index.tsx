import { FC, useState } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  TextComponent,
  WalletIcon,
  AdditionalNoteComponentStyled
} from './styled-components'
import LinkdropLogoLight from 'images/linkdrop-light.png'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import WalletsImg from 'images/wallets.png'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux';
import { DropActions } from 'data/store/reducers/drop/types'
import { defineApplicationConfig, defineSystem } from 'helpers'
import { plausibleApi } from 'data/api'
import { OverlayScreen } from 'linkdrop-ui'
import LinkdropLogo from 'images/linkdrop.png'
import { PopupWhatIsWalletContents } from 'components/pages/common'

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type, campaignId }
}: RootState) => ({
  name, image, type, tokenId, campaignId
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    chooseWallet: () => dispatch(
      dropActions.setStep('wallets_list')
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const ChooseWallet: FC<ReduxType> = ({
  chooseWallet,
  campaignId,
  type
}) => {
  const system = defineSystem()
  const configs = defineApplicationConfig()
  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  return <Container> 
    <WalletIcon src={WalletsImg} />
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      To claim {type === 'ERC20' ? 'tokens' : 'an NFT'} you will need to have a non-custodial crypto-wallet set up and ready to use
    </TextComponent>
    <ScreenButton
      appearance='action'
      onClick={async () => {
        plausibleApi.invokeEvent({
          eventName: 'goto_choose_wallet',
          data: {
            campaignId: campaignId || 'dispenser'
          }
        })
        chooseWallet()
      }
    }>
      Connect
    </ScreenButton>
    {system !== 'desktop' && <AdditionalNoteComponentStyled
      text='What is a Wallet?'
      position='bottom'
      onClick={() => {
        plausibleApi.invokeEvent({
          eventName: 'educate_me',
          data: {
            campaignId: campaignId || 'dispenser',
            screen: 'what_is_a_wallet'
          }
        })
        setShowPopup(true)
      }}
    />}
    {showPopup && <OverlayScreen
      title='What is a Wallet?'
      headerLogo={configs.footerLogoStyle === 'dark' ? LinkdropLogo : LinkdropLogoLight}
      onCloseAction={() => { setShowPopup(false) }}
      mainAction={() => { setShowPopup(false) }}
    >
      <PopupWhatIsWalletContents />
    </OverlayScreen>}
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ChooseWallet)