import { FC, useEffect } from 'react'
import {
  Page,
  MainContent,
  Content
} from './styled-components'
import { ThemeProvider } from 'styled-components'
import themes from 'themes'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { PageProps } from './types'

const mapStateToProps = ({
  drop: { theme },
  user: { address, chainId }
}: RootState) => ({
  address,
  theme,
  chainId
})


type ReduxType = ReturnType<typeof mapStateToProps>

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


export default connect(mapStateToProps)(PageComponent)
