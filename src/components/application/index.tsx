import { Provider } from 'react-redux'
import RouterProvider from './router-provider'
import store from 'data/store'
import { Container } from './styled-components'
import { queryClient, config } from './connectors/wallet-connect'
import { QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useEffect, useState } from 'react'
import { Loader } from 'components/common'

function Application () {
  const [
    init,
    setInit
  ] = useState<boolean>(false)

  useEffect(() => {
    if (window.location.href.includes('/#/')) {
      window.location.href = window.location.href.replace('/#/', '/')
      return
    }
    setInit(true)
  }, [])

  if (!init) {
    return <Loader />
  }

  return <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <Container>
        <Provider store={store}>
          <RouterProvider />
        </Provider>
      </Container>
    </QueryClientProvider>
  </WagmiProvider>
}

export default Application
