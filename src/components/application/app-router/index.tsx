import { FC } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import {
  NotFound,
  ClaimPage,
  QR,
  HomePage,
  MultiQR
} from 'components/pages'

const AppRouter: FC = () => {
  return <HashRouter>
    <Switch>
      <Route path='/redeem/:claimCode'><ClaimPage /></Route>
      <Route path='/qr/:qrId'><QR /></Route>
      <Route path='/mqr/:qrSecret/:qrEncCode'><MultiQR /></Route>
      <Route exact path='/'><HomePage /></Route>
      <Route path='*'><NotFound /></Route>
    </Switch>
  </HashRouter>
}

export default AppRouter