import styled from 'styled-components'
import { Button, TokenImage, Title } from 'components/common'
import Icons from 'icons'

type TScreenButton = {
}

export const TitleComponent = styled(Title)`
  margin-bottom: 30px;
`

export const Subtitle = styled.h3`
  font-size: 14px;
  line-height: 23px;
  margin: 0 0 40px;
  text-align: center;
  color: ${props => props.theme.additionalTextColor};
  font-weight: 400;
`

export const ButtonsContainer = styled.div`
  width: 100%;
  padding-bottom: 40px;
`

export const ScreenButton = styled(Button)<TScreenButton>`
  width: 100%;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0px;
  }
`

export const TokenImageContainer = styled.div`
  position: relative;
  padding: 12px 12px 0px;
`

export const TokenImageSmall = styled(TokenImage)`
  max-width: 223px;
  max-height: 223px;
  border-radius: 8px;
  margin-bottom: 24px;
  background: ${props => props.theme.widgetColor};
`

export const DoneIcon = styled(Icons.OrangeExclamationIcon)`
  position: absolute;
  border: 6px solid ${props => props.theme.blankColor};
  border-radius: 100%;
  top: 0px;
  right: 0px;
  background: ${props => props.theme.blankColor};
`
