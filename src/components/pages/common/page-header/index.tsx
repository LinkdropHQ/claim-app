import { FC } from 'react'
import Icons from 'icons'
import {
  LinkdropHeaderLogo,
  LinkdropHeader,
  LinkdropHeaderBack,
  Account,
  Address,
  Logout,
  Profile
} from './styled-components'
import { NetworkIndicator } from '..'
import {
  shortenString
} from 'helpers'
import TProps from './types'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'

import { defineApplicationConfig } from 'helpers'
const config = defineApplicationConfig()

const mapStateToProps = ({
  user: {
    address,
    provider,
    chainId,
    initialized,
    loading
  }
}: RootState) => ({
  address,
  provider,
  chainId,
  initialized,
  loading
})

const mapDispatcherToProps = (dispatch: IAppDispatch ) => {
  return {
    logout: () => dispatch(userAsyncActions.logout())
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps



const PageHeader: FC<ReduxType> = ({
  backAction,
  address,
  chainId,
  logout,
  loading
}) => {

  if (!address || !chainId) {
    return <LinkdropHeader>
      {backAction && <LinkdropHeaderBack onClick={backAction}>
        <Icons.ArrowLeftIcon />
      </LinkdropHeaderBack>}
      <LinkdropHeaderLogo src={config.logo} alt="Application Logo" />
    </LinkdropHeader>
  }
  return <LinkdropHeader>
    <LinkdropHeaderLogo src={config.logo} alt="Application Logo" />
    
    <Profile>
      {address && <Account>
        <Address loading={loading}>
          {shortenString(address)}
          <NetworkIndicator
            chainId={chainId}
          />
        </Address>
      </Account>}
      {address && <Logout
        onClick={() => {
          logout()
        }}
      >
        <Icons.LogoutIcon />
      </Logout>}
    </Profile>
  </LinkdropHeader>
}

export default connect(mapStateToProps, mapDispatcherToProps)(PageHeader)