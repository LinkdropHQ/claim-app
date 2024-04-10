import styled from 'styled-components'
import { Widget, Button } from 'components/common'

export const ContainerWidget = styled(Widget)`
  text-align: center;
`

export const WidgetTitle = styled.h2`
  font-size: 22px;
  line-height: 28px;
  margin: 0 0 12px;
  font-weight: 600;
  text-align: center;
  width: 100%;
  color: ${props => props.theme.secondaryTextColor};
`

export const WidgetSubtitle = styled.h3`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  text-align: center;
  width: 100%;
  margin: 0 0 64px;
  color: ${props => props.theme.secondaryTextColor};
`

export const ButtonStyled = styled(Button)`
  width: 100%;
`

export const List = styled.ol`
  font-size: 16px;
  line-height: 24px;
  margin: 0 0 70px;
  padding: 0 0 0 20px;
  text-align: left;
`

export const ListItem = styled.li`

`

export const Link = styled.a`
  color: ${props => props.theme.linkColor};
`
