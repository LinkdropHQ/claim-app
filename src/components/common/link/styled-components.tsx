import styled from "styled-components"

export const LinkComponent = styled.a`
  color: ${props => props.theme.primaryHighlightColor};
  text-decoration: none;

  &:active,
  &:hover,
  &:visited {
    color: ${props => props.theme.primaryHighlightColor};
  }
`