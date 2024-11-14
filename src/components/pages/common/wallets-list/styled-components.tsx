import styled from 'styled-components'
import { Text, Title } from 'components/common'
import { OptionsList } from '../'

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

export const TextComponent = styled(Text)`
  text-align: center;
  margin-bottom: 22px;
`

export const OptionsListStyled = styled(OptionsList)`
  width: 100%;
  margin: 0 0 36px;
  li {
    margin-bottom: 12px;
    justify-content: center;

    & > div {
      margin-right: 12px;
    }
  }
  @media (max-width: 500px) {
    margin: 0 0 150px;
  }    
`

export const WalletIcon = styled.img`
  width: 33px;
  height: 33px;
  border-radius: none;
`

export const ImageContainer = styled.div`
  margin: 0 auto 22px;
`