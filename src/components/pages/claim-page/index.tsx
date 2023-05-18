import { FC, ReactElement, useEffect } from 'react'
import { useAccount, useChainId } from 'wagmi'
import InitialScreen from './initial-screen'
import ChangeNetwork from './change-network'
import ClaimingFinished from './claiming-finished'
import ClaimingProcess from './claiming-process'
import AlreadyClaimed from './already-claimed'
import SetConnector from './set-connector'
import NoTokensLeft from './no-tokens-left'
import SetAddress from './set-address'
import WalletRedirectAwait from './wallet-redirect-await'
import ErrorPage from './error'
import ErrorTransactionPage from './error-transaction'
import ErrorNoConnectionPage from './error-no-connection'
import WalletsListPage from './wallets-list'
import ErrorServerFail from './error-server-fail'
import ErrorLinkExpired from './error-link-expired'
import ErrorAlreadyClaimed from './error-already-claimed'
import ErrorLinkNotFound from './error-link-not-found'
import ErrorLinkNoConnection from './error-link-no-connection'
import ErrorLink from './error-link'
import ChooseWallet from './choose-wallet'
import ShortCodeLoading from './short-code-loading'
import HighGasPrice from './high-gas-price'
import ZerionConnection from './zerion-connection'
import { Loader } from 'components/common'
import { PageHeader } from 'components/pages/common'
import Page from '../page'
import { TDropStep, TWalletName } from 'types'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { Container } from './styled-components'
import { Dispatch } from 'redux'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import * as dropActions from 'data/store/reducers/drop/actions'
import { DropActions } from 'data/store/reducers/drop/types'
import { TokenActions } from 'data/store/reducers/token/types'
import { UserActions } from 'data/store/reducers/user/types'
import { useHistory } from 'react-router-dom'
import DownloadAwait from './download-await'


const mapStateToProps = ({
  user: { address, provider, chainId, initialized },
  drop: { step, claimCode, wallet }
}: RootState) => ({
  address,
  step,
  provider,
  chainId,
  initialized,
  claimCode,
  wallet
})

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & Dispatch<UserActions> & IAppDispatch) => {
  return {
      getData: (
        onReload: () => void,
        connector: any,
        chainId?: number,
        address?: string,
        
      ) => dispatch(dropAsyncActions.getInitialData(
        onReload,
        connector,
        chainId,
        address
      )),
      updateUserData: (
        address: string,
        chainId: number,
        connector: any,
      ) => dispatch(userAsyncActions.updateUserData(
        address,
        chainId,
        connector
      )),
      setStep: (step: TDropStep) => dispatch(dropActions.setStep(step))
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
    case 'wallets_list':
      return <WalletsListPage />
    case 'gas_price_high':
      return <HighGasPrice />
    case 'error_link_not_found':
      return <ErrorLinkNotFound />
    case 'error_link_no_connection':
      return <ErrorLinkNoConnection />
    case 'error_link':
      return <ErrorLink />
    case 'short_code_loading':
      return <ShortCodeLoading />
    case 'download_await':
      return <DownloadAwait />
    case 'zerion_connection':
      return <ZerionConnection />
    case 'wallet_redirect_await':
      return <WalletRedirectAwait />
    default:
      return <Loader />
  }
}

const defineBackAction = (
  step: TDropStep,
  wallet: string | null,
  action: (prevoiusStep: TDropStep) => void
) => {
  switch (step) {
    case 'set_address':
    case 'download_await':
    case 'zerion_connection':
      return () => action('wallets_list')
    case 'wallet_redirect_await':
      // if coinbase - do not show other wallets
      if (wallet === 'coinbase_wallet') {
        return () => action('set_connector')
      }
      return () => action('wallets_list')
    case 'wallets_list':
      return () => action('choose_wallet')
    case 'choose_wallet':
      return () => action('set_connector')
    default:
      return null
  }
}

const defineHeader = (step: TDropStep, wallet: string | null, action: (prevStep: TDropStep) => void) => {
  const backAction = defineBackAction(step, wallet, action)
  return <PageHeader backAction={backAction}/>
}

const ClaimPage: FC<ReduxType> = ({
  step,
  getData,
  claimCode,
  setStep,
  initialized,
  updateUserData,
  wallet
}) => {
  const screen = defineCurrentScreen(step)
  const { address, connector } = useAccount()
  const chainId = useChainId()
  const history = useHistory()

  useEffect(() => {
    if (!claimCode) { return }
    if (!initialized) {
      getData(
        () => { history.push('/') },
        connector,
        chainId,
        address
      )
    } else {
      if (address && chainId) {
        updateUserData(
          address,
          chainId,
          connector
        )
      }
    }
    
  }, [address, chainId, connector, claimCode])
  
  return <Page>
    <Container>
      {defineHeader(step, wallet, setStep)}
      {screen}
    </Container> 
  </Page>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ClaimPage)
