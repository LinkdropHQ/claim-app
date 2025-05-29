import { FC, ReactElement, useEffect } from 'react'
import { useAccount, useChainId } from 'wagmi'
import InitialScreen from './initial-screen'
import ChangeNetwork from './change-network'
import ClaimingFinished from './claiming-finished'
import ClaimingProcess from './claiming-process'
import AlreadyClaimed from './already-claimed'
import SetConnector from './set-connector'
import NoTokensLeft from './no-tokens-left'
import ErrorPage from './error'
import ErrorTransactionPage from './error-transaction'
import ErrorNoConnectionPage from './error-no-connection'
import { useEthersSigner } from 'hooks'
import {
  WalletsListPage,
  SetAddress,
  PageHeader,
  LedgerConnection,
  DownloadAwait,
  WalletRedirectAwait
} from 'components/pages/common'
import ErrorServerFail from './error-server-fail'
import ErrorRegion from './error-region'
import ErrorLinkExpired from './error-link-expired'
import ErrorAlreadyClaimed from './error-already-claimed'
import ErrorCampaignPaused from './error-campaign-paused'
import ErrorLinkNotFound from './error-link-not-found'
import ErrorLinkNoConnection from './error-link-no-connection'
import ErrorMultipleClaimsForbidden from './error-multiple-claims-forbidden'
import ErrorLink from './error-link'
import ShortCodeLoading from './short-code-loading'
import HighGasPrice from './high-gas-price'
import { Loader } from 'components/common'
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

const mapStateToProps = ({
  user: {
    address,
    provider,
    chainId,
    initialized
  },
  drop: {
    step,
    claimCode,
    wallet,
    type
  }
}: RootState) => ({
  address,
  step,
  provider,
  chainId,
  initialized,
  claimCode,
  wallet,
  type
})

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & Dispatch<UserActions> & IAppDispatch) => {
  return {
      getData: (
        onReload: () => void,
        connector: any,
        signer: any,
        chainId?: number,
        address?: string,
        
      ) => dispatch(dropAsyncActions.getInitialData(
        onReload,
        connector,
        signer,
        chainId,
        address
      )),
      updateUserData: (
        address: string,
        chainId: number,
        connector: any,
        signer: any,
        callback: () => void
      ) => dispatch(userAsyncActions.updateUserData(
        address,
        chainId,
        connector,
        signer,
        callback
      )),
      setStep: (step: TDropStep) => dispatch(dropActions.setStep(step)),
      claimERC1155: (address: string) => dispatch(
        dropAsyncActions.claimERC1155(address, true)
      ),
      claimERC721: (address: string) => dispatch(
        dropAsyncActions.claimERC721(address, true)
      ),
      claimERC20: (address: string) => dispatch(
        dropAsyncActions.claimERC20(address, true)
      ),
      logout: () => dispatch(userAsyncActions.logout())
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

type TDefineStep = (
  step: TDropStep,
  setStep: (step: TDropStep) => void,
  setAddressCallback: (address: string) => void
) => ReactElement

const defineCurrentScreen: TDefineStep = (step, setStep, setAddressCallback) => {
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
      return <SetAddress
        onSubmit={setAddressCallback}
      />
    case 'error_transaction':
      return <ErrorTransactionPage />
    case 'error_region':
      return <ErrorRegion />
    case 'error_multiple_claims_forbidden':
      return <ErrorMultipleClaimsForbidden /> 
    case 'error_campaign_paused':
      return <ErrorCampaignPaused />
    case 'error_no_connection':
      return <ErrorNoConnectionPage />
    case 'error_server_fail':
      return <ErrorServerFail />
    case 'link_expired':
      return <ErrorLinkExpired />
    case 'error_already_claimed':
      return <ErrorAlreadyClaimed />
    case 'wallets_list':
      return <WalletsListPage
        setStep={setStep}
      />
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
    case 'ledger_connection':
      return <LedgerConnection
        setStepCallback={() => setStep('initial')}
      />
    case 'wallet_redirect_await':
      return <WalletRedirectAwait />
    default:
      return <Loader size='large'/>
  }
}

const defineBackAction = (
  step: TDropStep,
  wallet: TWalletName | null,
  action: (prevoiusStep: TDropStep) => void
) => {
  switch (step) {
    case 'set_address':
    case 'download_await':
    case 'ledger_connection':
      return () => action('wallets_list')
    case 'wallet_redirect_await':
      return () => action('wallets_list')
    case 'wallets_list':
      return () => action('set_connector')
    default:
      return null
  }
}

const defineHeader = (
  step: TDropStep,
  wallet: TWalletName | null,
  action: (prevStep: TDropStep) => void
) => {
  const backAction = defineBackAction(step, wallet, action)
  return <PageHeader
    backAction={backAction}
  />
}

const ClaimPage: FC<ReduxType> = ({
  step,
  getData,
  claimCode,
  setStep,
  initialized,
  updateUserData,
  wallet,
  type,
  claimERC1155,
  claimERC20,
  claimERC721,
  logout
}) => {
  const setAddressCallback = (address: string) => {
    if (type === 'ERC1155') {
      return claimERC1155(address)
    }
    if (type === 'ERC721') {
      return claimERC721(address)
    }
    if (type === 'ERC20') {
      return claimERC20(address)
    }
  }
  const screen = defineCurrentScreen(step, setStep, setAddressCallback)
  const { address, connector } = useAccount()
  const chainId = useChainId()
  const history = useHistory()
  const signer = useEthersSigner()

  useEffect(() => {
    if (!claimCode) { return }
    if (!initialized) {
      getData(
        () => {
          history.push('/')
        },
        connector,
        signer,
        chainId,
        address
      )
    } else {
      if (address && chainId) {
        updateUserData(
          address,
          chainId,
          connector,
          signer,
          () => {
            setStep('initial')
          }
        )
      }
    }
    
  }, [address, chainId, connector, claimCode, signer])
  
  return <Page>
    {defineHeader(
      step,
      wallet,
      setStep
    )}
    <Container>
      {screen}
    </Container> 
  </Page>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ClaimPage)
