import styled from 'styled-components'
import { Button } from 'components/common'

export const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 24px;
  color: ${props => props.theme.primaryTextColor};
`

export const Subtitle = styled.h3`
  color: ${props => props.theme.additionalTextColor};
  font-size: 14px;
  margin: 0 0 40px;
`

export const ButtonStyled = styled(Button)`
  width: 100%;
  margin-bottom: 16px;
`
