import styled from 'styled-components'

export const Container = styled.div`
  max-width: 342px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Footer = styled.a`
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  color: ${props => props.theme.primaryTextColor};
  text-decoration: none;
`