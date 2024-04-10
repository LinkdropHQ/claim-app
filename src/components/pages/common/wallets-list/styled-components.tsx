import styled from 'styled-components'
import { Button, Text, Title } from 'components/common'
import { OptionsList } from 'linkdrop-ui'
import { AdditionalNoteComponent } from 'linkdrop-ui'


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
  width: 100%;
`

export const ScreenButton = styled(Button)`
  max-width: 100%;
  width: 100%;
  margin-bottom: 20px;

  svg {
    margin-right: 10px;
  }
`

export const TextComponent = styled(Text)`
  text-align: center;
  margin-bottom: 32px;
`

export const AdditionalAction = styled.div`
  color: ${props => props.theme.additionalTextColor};
  font-size: 16px;
  text-align: center;
  cursor: pointer;
`

export const OptionsListStyled = styled(OptionsList)`
  width: 100%;
  margin: 0 0 36px;
  li {
    background-color: #1D1F2B;
    color: #FFF;

  }

  @media (max-width: 500px) {
    margin: 0 0 150px;
  }    
`

export const WalletIcon = styled.img`
  max-width: 24px;
`

export const LinkButton = styled.div`
  cursor: pointer;
  color: ${props => props.theme.linkColor};
  font-size: 16px;
  text-align: center;
  margin-bottom: 36px;
`