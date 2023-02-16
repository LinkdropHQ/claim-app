import { FC, useEffect, useState } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import {
  NotFound,
  ClaimPage,
  Page
} from 'components/pages'
import { Container } from './styled-components'
import { Loader } from 'components/common'

const AppRouter: FC = () => {
  const [ initialized, setInitialized ] = useState<boolean>(false)
  useEffect(() => {
    setInitialized(true)
  }, [])

  if (!initialized) {
    return <Page>
      <Container>
        <Loader />
      </Container>
    </Page>
  }

  return <HashRouter>
    <Switch>
      <Route path='/receive'><ClaimPage /></Route>
      <Route path='*'><NotFound /></Route>
    </Switch>
  </HashRouter>
}

export default AppRouter