import { FC, useState } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  TextComponent,
  WalletIcon
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import WalletsImg from 'images/wallets.png'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux';
import { DropActions } from 'data/store/reducers/drop/types'
import { plausibleApi } from 'data/api'

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
  return <Container> 
    <WalletIcon src={WalletsImg} />
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      To claim {type === 'ERC20' ? 'tokens' : 'an NFT'} you will need to have a non-custodial crypto-wallet set up and ready to use
    </TextComponent>
    <ScreenButton onClick={async () => {
      plausibleApi.invokeEvent({
        eventName: 'goto_choose_wallet',
        data: {
          campaignId: campaignId as string
        }
      })
      chooseWallet()
    }}>
      Connect
    </ScreenButton>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ChooseWallet)