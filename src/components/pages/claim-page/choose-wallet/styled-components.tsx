import styled from 'styled-components'
import { Button, Text, Title } from 'components/common'
import { AdditionalNoteComponent } from 'linkdrop-ui'

type TScreenButton = {
  onClick: () => void
}


export const AdditionalNoteComponentStyled = styled(AdditionalNoteComponent)`
  background-color: ${props => props.theme.noteDefaultBgColor};
  color: ${props => props.theme.noteDefaultTextColor};

  svg {
    circle {
      stroke: ${props => props.theme.noteDefaultTextColor};
    }
    stroke: ${props => props.theme.noteDefaultTextColor};
  }
`


export const TitleComponent = styled(Title)`
  font-size: 22px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0 0 12px;
  max-width: 343px;
  font-weight: 600;
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
  line-height: 24px;
`

export const WalletIcon = styled.img`
  max-width: 140px;
  margin-bottom: 25px;
`

export const AdditionalAction = styled.div`
  color: ${props => props.theme.additionalTextColor};
  font-size: 16px;
  text-align: center;
  cursor: pointer;
`
