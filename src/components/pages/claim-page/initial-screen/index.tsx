import { FC, useEffect } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  Subtitle,
  TokenImageContainer,
  TextComponent,
  UserAddress
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { DropActions } from 'data/store/reducers/drop/types'
import { TokenActions } from 'data/store/reducers/token/types'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { Dispatch } from 'redux'
import * as dropActions from 'data/store/reducers/drop/actions'
import { TDropStep, TDropType } from 'types'
import { shortenString, defineSystem } from 'helpers'
import { plausibleApi } from 'data/api'
import { ERC20TokenPreview, PoweredByFooter } from 'components/pages/common'
import { connect } from 'react-redux'
import { switchNetwork } from 'data/store/reducers/user/async-actions'

const mapStateToProps = ({
  token: {
    name,
    image,
    decimals
  },
  user: {
    address,
    chainId: userChainId,
    userProvider,
    email,
    signer
  },
  drop: {
    autoclaim,
    tokenId,
    amount,
    type,
    isManual,
    loading,
    chainId,
    campaignId
  }
}: RootState) => ({
  name,
  image,
  autoclaim,
  type,
  tokenId,
  amount,
  isManual,
  loading,
  address,
  userChainId,
  chainId,
  campaignId,
  decimals,
  userProvider,
  email,
  signer
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
  decimals,
  userProvider,
  email,
  autoclaim
}) => {

  const system = defineSystem()

  const onClaim = async () => {
    if (Number(userChainId) !== Number(chainId) && userProvider) {
      // @ts-ignore
      if(window && window.ethereum && window.ethereum.isCoinbaseWallet && system !== 'desktop') {
        if (chainId) {
          await switchNetwork(userProvider, chainId, campaignId as string, () => {})
        } else {
          alert('No chain provided')
        }
      } else {
        return setStep('change_network')
      }
    }

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
  }

  useEffect(() => {
    if (autoclaim) {
      onClaim()
    }
  }, [])

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
      appearance='action'
      title='Claim'
      onClick={onClaim}
    />
  }

  const addressPreview = <UserAddress>{email ? email : shortenString(address, 3)}</UserAddress>

  const content = type === 'ERC20' ? <>
    <ERC20TokenPreview
      name={name}
      image={image as string}
      amount={amount as string}
      decimals={decimals}
      status='initial'
    />
    <TextComponent>
      Please proceed to receive tokens to: {addressPreview}
    </TextComponent>
  </> : <>
    {image && <TokenImageContainer src={image} alt={name} />}
    <Subtitle>{defineTokenId(type, tokenId)}</Subtitle>
    <TitleComponent>{name}</TitleComponent>
    <TextComponent>
      Here is a preview of the NFT you’re about to receive to: {addressPreview}
    </TextComponent>
  </>

  return <Container> 
    {content}
    {defineButton()}
    <PoweredByFooter />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(InitialScreen)