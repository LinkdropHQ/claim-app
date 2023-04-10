import styled from 'styled-components'
import { Button, TokenImage, Title, Text } from 'components/common'
import Icons from 'icons'

export const TitleComponent = styled(Title)`
  margin-bottom: 40px;
`

export const Description = styled(Text)`
  margin: 0 0 30px;
`

export const Container = styled.div`
  text-align: center;
`

export const ButtonsContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
`

export const ScreenButton = styled(Button)`
  width: 100%;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0px;
  }
`

export const TokenImageContainer = styled.div`
  position: relative;
  padding: 12px 12px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 0 auto;
`

export const TokenImageSmall = styled(TokenImage)`
  width: 226px;
  height: 226px;
  border-radius: 8px;
  margin-bottom: 24px;
  background: ${props => props.theme.widgetColor};
`

export const DoneIcon = styled(Icons.DoneIcon)`
  position: absolute;
  border: 6px solid ${props => props.theme.blankColor};
  border-radius: 100%;
  top: 0px;
  right: 0px;
  background: ${props => props.theme.blankColor};
`

export const UserAddress = styled.span`
  color: ${props => props.theme.linkColor};
`