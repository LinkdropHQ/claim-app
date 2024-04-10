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
import TProps from './types'
import {
  shortenString
} from 'helpers'
import { defineApplicationConfig } from 'helpers'
const config = defineApplicationConfig()

const PageHeader: FC<TProps> = ({
  backAction,
  address,
  logout
}) => {
  return  <LinkdropHeader>
    {backAction && <LinkdropHeaderBack onClick={backAction}>
      <Icons.ArrowLeftIcon />
    </LinkdropHeaderBack>}
    <LinkdropHeaderLogo src={config.logo} alt="Application Logo" />
    {address && 
      <Profile>
        <Account>
          <Address>
            {shortenString(address)}
          </Address>
        </Account>
        <Logout
          onClick={() => {
            logout()
          }}
        >
          <Icons.LogoutIcon />
        </Logout>
      </Profile>
    }
  </LinkdropHeader>
}

export default PageHeader