import styled from 'styled-components'
import { Button } from 'components/common'

export const Image = styled.img`
  max-width: 240px;
  margin-bottom: 24px;
`

export const Title = styled.h2`
  margin: 0 0 40px;
  font-size: 24px;
  color: ${props => props.theme.primaryTextColor};
`

export const ButtonStyled = styled(Button)`
  width: 100%;
`

export const Subtitle = styled.h3`
  color: ${props => props.theme.additionalTextColor};
  font-size: 14px;
  margin: 0 0 40px;
`