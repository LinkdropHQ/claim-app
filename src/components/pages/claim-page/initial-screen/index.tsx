import { FC, useEffect } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  Subtitle,
  TokenImageContainer,
  TextComponent,
  UserAddress,
  PoweredBy,
  PoweredByImage
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { DropActions } from 'data/store/reducers/drop/types'
import { TokenActions } from 'data/store/reducers/token/types'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { Dispatch } from 'redux'
import * as dropActions from 'data/store/reducers/drop/actions'
import { TDropStep, TDropType } from 'types'
import { shortenString } from 'helpers'
import LinkdropLogo from 'images/linkdrop-header.png'
import { plausibleApi } from 'data/api'
import { ERC20TokenPreview } from 'components/pages/common'
import { connect } from 'react-redux'

const mapStateToProps = ({
  token: { name, image, decimals },
  user: { address, chainId: userChainId },
  drop: { tokenId, amount, type, isManual, loading, chainId, campaignId }
}: RootState) => ({
  name,
  image,
  type,
  tokenId,
  amount,
  isManual,
  loading,
  address,
  userChainId,
  chainId,
  campaignId,
  decimals
})

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & IAppDispatch) => {
  return {
    claimERC1155: () => dispatch(
      dropAsyncActions.claimERC1155(
        undefined,
        true
      )
    ),
    claimERC721: () => dispatch(
      dropAsyncActions.claimERC721(
        undefined,
        true
      )
    ),
    claimERC20: () => dispatch(
      dropAsyncActions.claimERC20(
        undefined,
        true
      )
    ),
    setStep: (step: TDropStep) => dispatch(dropActions.setStep(step))
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

const InitialScreen: FC<ReduxType> = ({
  name,
  type,
  tokenId,
  amount,
  image,
  claimERC1155,
  claimERC721,
  claimERC20,
  loading,
  address,
  chainId,
  userChainId,
  setStep,
  campaignId,
  decimals
}) => {

  useEffect(() => {
    plausibleApi.invokeEvent({
      eventName: 'success_connect_wallet',
      data: {
        campaignId: campaignId as string
      }
    })
  }, [])

  const defineButton = () => {
    return <ScreenButton
      disabled={
        (type === 'ERC1155' && (!tokenId || !amount)) ||
        (type === 'ERC721' && (!tokenId)) ||
        (type === 'ERC20' && (!amount)) ||
        loading
      }
      loading={loading}
      appearance='default'
      title='Claim'
      onClick={() => {
        // if (Number(userChainId) !== Number(chainId)) {
        //   return setStep('change_network')
        // }

        plausibleApi.invokeEvent({
          eventName: 'claim_initiated',
          data: {
            campaignId: campaignId as string,
          }
        })

        if (type === 'ERC1155') {
          return claimERC1155()
        }
        if (type === 'ERC721') {
          return claimERC721()
        }
        if (type === 'ERC20') {
          return claimERC20()
        }
      }}
    />
  }

  const content = type === 'ERC20' ? <>
    <ERC20TokenPreview
      name={name}
      image={image as string}
      amount={amount as string}
      decimals={decimals}
      status='initial'
    />
    <TextComponent>
      Please proceed to receive tokens to address: <UserAddress>{shortenString(address, 3)}</UserAddress>
    </TextComponent>
  </> : <>
    {image && <TokenImageContainer src={image} alt={name} />}
    <TitleComponent>Zerion @ EDCON MNE 2023 {defineTokenId(type, tokenId)}</TitleComponent>
    <TextComponent>
      Here is a preview of the NFT you’re about to receive to address: <UserAddress>{shortenString(address, 3)}</UserAddress>
    </TextComponent>
  </>

  return <Container> 
    {content}
    {defineButton()}
    <PoweredBy href='https://linkdrop.io' target='_blank'>
      Powered by
      <PoweredByImage src={LinkdropLogo} alt="Linkdrop Logo"/>
    </PoweredBy>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(InitialScreen)