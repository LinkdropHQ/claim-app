import { FC } from 'react'
import {
  Route,
  Switch,
  HashRouter,
  BrowserRouter
} from 'react-router-dom'
import {
  NotFound,
  ClaimPage,
  QR,
  HomePage,
  MultiQR,
  Scan
} from 'components/pages'

const AppRouter: FC = () => {
  return <BrowserRouter>
    <Switch>
      <Route path='/redeem/:claimCode'><ClaimPage /></Route>
      <Route path='/qr/:qrId'><QR /></Route>
      <Route path='/mqr/:qrSecret/:qrEncCode'><MultiQR /></Route>
      <Route path='/scan/:multiscanQRId/:scanId/:scanIdSig/:multiscanQREncCode'><Scan /></Route>
      <Route exact path='/'><HomePage /></Route>
      <Route path='*'><NotFound /></Route>
    </Switch>
  </BrowserRouter>
}

export default AppRouter