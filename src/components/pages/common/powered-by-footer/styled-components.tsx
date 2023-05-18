import styled from "styled-components"

export const PoweredBy = styled.a`
  margin: 0;
  font-size: 13px;
  color: ${props => props.theme.primaryTextColor};
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  text-decoration: none;
`

export const PoweredByImage = styled.img`
  max-width: 86px;
  margin-left: 6px;
`
