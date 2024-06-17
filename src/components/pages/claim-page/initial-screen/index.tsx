import { FC, useEffect } from 'react'
import {
  Container
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { DropActions } from 'data/store/reducers/drop/types'
import { TokenActions } from 'data/store/reducers/token/types'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { Dispatch } from 'redux'
import * as dropActions from 'data/store/reducers/drop/actions'
import { TDropStep, TDropType } from 'types'
import { plausibleApi } from 'data/api'
import { connect } from 'react-redux'
import { switchNetwork } from 'data/store/reducers/user/async-actions'
import { Loader } from 'components/common'

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


const InitialScreen: FC<ReduxType> = ({
  type,
  claimERC1155,
  claimERC721,
  claimERC20,
  chainId,
  setStep,
  campaignId,
  userProvider
}) => {

  useEffect(() => {
    const claim = async () => {
      await switchNetwork(userProvider, chainId as number, campaignId as string, () => {
        if (type === 'ERC1155') {
          return claimERC1155()
        }
        if (type === 'ERC721') {
          return claimERC721()
        }
        if (type === 'ERC20') {
          return claimERC20()
        }
      })
    }
    claim()
  }, [])

  useEffect(() => {
    plausibleApi.invokeEvent({
      eventName: 'success_connect_wallet',
      data: {
        campaignId: campaignId as string
      }
    })
  }, [])

  return <Container> 
    <Loader /> 
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(InitialScreen)