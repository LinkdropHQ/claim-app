import styled from 'styled-components'
import { Button, Text, TokenImage, Note, Title } from 'components/common'
import Icons from 'icons'

type TScreenButton = {
  onClick: () => void
}

export const TitleComponent = styled(Title)`
  font-size: 22px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0 0 12px;
  max-width: 343px;
`

export const Container = styled.div`
  text-align: center;
`

export const ScreenButton = styled(Button)<TScreenButton>`
  max-width: 100%;
  width: 100%;
  margin-bottom: 20px;
`

export const TextComponent = styled(Text)`
  text-align: center;
  margin-bottom: 32px;
`

export const WalletIcon = styled.img`
  max-width: 60px;
  margin-bottom: 25px;
`

export const AdditionalAction = styled.div`
  color: ${props => props.theme.additionalTextColor};
  font-size: 16px;
  text-align: center;
  cursor: pointer;
`

export const Link = styled.a`
  color: ${props => props.theme.linkColor};
  text-decoration: none;
`