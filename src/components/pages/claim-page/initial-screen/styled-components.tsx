import styled from 'styled-components'
import { Button, Text, TokenImage, Title } from 'components/common'

export const TitleComponent = styled(Title)`
  margin: 0 0 12px;
  font-weight: 600;
`

export const Subtitle = styled.h3`
  font-size: 14px;
  color: ${props => props.theme.primaryTextColor};
  font-weight: 500;
  margin: 0 0 36px;
`

export const Container = styled.div`
  text-align: center;
  max-width: 343px;
`

export const ScreenButton = styled(Button)`
  max-width: 100%;
  width: 100%;
  margin-bottom: 16px;
`

export const TextComponent = styled(Text)`
  text-align: center;
  margin-bottom: 32px;
`

export const TokenImageContainer = styled(TokenImage)`
  margin: 0 auto 25px;
  background: ${props => props.theme.widgetColor};
`

export const UserAddress = styled.span`
  color: ${props => props.theme.linkColor};
`
