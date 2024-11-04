import { Provider } from 'react-redux'
import RouterProvider from './router-provider'
import store from 'data/store'
import { Container } from './styled-components'
import { queryClient, config } from './connectors/wallet-connect'
import { QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

function Application () {
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
