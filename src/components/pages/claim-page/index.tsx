import { FC, ReactElement, useEffect } from 'react'
import InitialScreen from './initial-screen'
import ChangeNetwork from './change-network'
import ClaimingFinished from './claiming-finished'
import ClaimingProcess from './claiming-process'
import AlreadyClaimed from './already-claimed'
import SetConnector from './set-connector'
import NoTokensLeft from './no-tokens-left'
import SetAddress from './set-address'
import ErrorPage from './error'
import ErrorTransactionPage from './error-transaction'
import ErrorNoConnectionPage from './error-no-connection'
import ErrorServerFail from './error-server-fail'
import ErrorLinkExpired from './error-link-expired'
import ErrorAlreadyClaimed from './error-already-claimed'
import ChooseWallet from './choose-wallet'
import { useAccount, useConnect, useEnsName, useChainId } from 'wagmi'
import { Loader } from 'components/common'
import Page from '../page'
import { TDropStep } from 'types'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { Container } from './styled-components'
import { Dispatch } from 'redux';
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import * as dropActions from 'data/store/reducers/drop/actions'
import { DropActions } from 'data/store/reducers/drop/types'
import { TokenActions } from 'data/store/reducers/token/types'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'

const mapStateToProps = ({
  user: { address, provider, chainId, initialized },
  drop: { step },
}: RootState) => ({
  address,
  step,
  provider,
  chainId,
  initialized
})

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & IAppDispatch) => {
  return {
      getData: (
        address?: string,
        chainId?: number
      ) => dispatch(dropAsyncActions.getInitialData(
        address,
        chainId
      )),
      setStep: (step: TDropStep) => dispatch(dropActions.setStep(step)),
      updateUserData: (
        address: string,
        chainId: number
      ) => dispatch(userAsyncActions.updateUserData(
        address,
        chainId
      ))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

type TDefineStep = (step: TDropStep) => ReactElement

const defineCurrentScreen: TDefineStep = step => {
  switch (step) {
    case 'initial':
      return <InitialScreen />
    case 'change_network':
      return <ChangeNetwork />
    case 'claiming_process':
      return <ClaimingProcess />
    case 'claiming_finished':
      return <ClaimingFinished />
    case 'already_claimed':
      return <AlreadyClaimed />
    case 'set_connector':
      return <SetConnector />
    case 'no_tokens_left':
      return <NoTokensLeft />
    case 'error':
      return <ErrorPage />
    case 'set_address':
      return <SetAddress />
    case 'error_transaction':
      return <ErrorTransactionPage />
    case 'error_no_connection':
      return <ErrorNoConnectionPage />
    case 'error_server_fail':
      return <ErrorServerFail />
    case 'link_expired':
      return <ErrorLinkExpired />
    case 'error_already_claimed':
      return <ErrorAlreadyClaimed />
    case 'choose_wallet':
      return <ChooseWallet />
    default:
      return <Loader />
  }
}

const ClaimPage: FC<ReduxType> = ({
  step,
  getData,
  updateUserData
}) => {

  const screen = defineCurrentScreen(step)
  const { address } = useAccount()
  const chainId = useChainId()

  useEffect(() => {
    if (address && chainId) {
      updateUserData(
        address,
        chainId
      )
    } else {
      getData()
    }
    
  }, [address, chainId])
  return <Page>
    <Container>
      {screen}
    </Container> 
  </Page>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ClaimPage)
