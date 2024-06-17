import { FC } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import {
  NotFound,
  ClaimPage,
  HomePage
} from 'components/pages'

const AppRouter: FC = () => {
  return <HashRouter>
    <Switch>
      <Route path='/redeem/:claimCode'><ClaimPage /></Route>
      <Route exact path='/'><HomePage /></Route>
      <Route path='*'><NotFound /></Route>
    </Switch>
  </HashRouter>
}

export default AppRouter