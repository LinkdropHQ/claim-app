import styled from 'styled-components'
import { Title, Text, Button } from 'components/common'

export const Container = styled.div`
  padding-top: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`

export const ScreenTitle = styled(Title)`
  margin-bottom: 30px;
`

export const ScreenSubtitle = styled(Text)`
  margin-bottom: 36px;
  color: ${props => props.theme.additionalTextColor};
`

export const ButtonComponent = styled(Button)`
  width: 100%;
  margin-bottom: 16px;
`

export const IconContainer = styled.div`
  margin-bottom: 35px;
`