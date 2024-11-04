import { FC, useEffect } from 'react'
import {
  Page,
  MainContent,
  Content
} from './styled-components'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { PageProps } from './types'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'

const mapStateToProps = ({
  drop: { theme },
  user: { address, chainId }
}: RootState) => ({
  address,
  theme,
  chainId
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    logout: () => dispatch(userAsyncActions.logout())
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const PageComponent: FC<PageProps & ReduxType> = ({
  children,
}) => {

  const currentTheme = themes.light
  return <ThemeProvider theme={currentTheme}>
    <Page>
      <MainContent>
        <Content>
          {children}              
        </Content>
      </MainContent>
    </Page>
  </ThemeProvider>
}


export default connect(mapStateToProps, mapDispatcherToProps)(PageComponent)
