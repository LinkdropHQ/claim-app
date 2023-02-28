import styled from 'styled-components'
import { Button, Title, Loader } from 'components/common'

export const ScreenLoaderContainer = styled.div`
  display: flex;
  background: ${props => props.theme.blankColor};
  position: fixed;
  flex-direction: column;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  padding: 40px;
  z-index: 10;
`

export const ButtonStyled = styled(Button)`
  width: 100%;
`

export const ScreenTitle = styled(Title)`
  margin-bottom: 70px;
  text-align: center;
`

export const LoaderStyled = styled(Loader)`
  margin-bottom: 30px;
`