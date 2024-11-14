import styled, {
  css,
  keyframes
} from "styled-components"
import { TAccount } from './types'

const backgroundAnimation = keyframes`
  0% { background-position: left top; }
  50% { background-position: right bottom; }
  100% { background-position: left top; }
`

export const LinkdropHeader = styled.header`
  position: relative;
  width: 100%;
  max-width: 1188px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 24px;
`

export const LinkdropHeaderLogo = styled.img`
  max-width: 107px;
`

export const LinkdropHeaderBack = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
`

export const Account = styled.div`
  height: 36px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 2px 0 2px;
  color: ${props => props.theme.primaryTextColor};
  justify-content: center;
  font-size: 14px;
  border-radius: 36px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  background: ${props => props.theme.primaryBackgroundColor};

  @media (max-width: 450px) {
    display: none;
  }
`

export const Address = styled.div<TAccount>`
  height: 28px;
  border-radius: 28px;
  background: ${props => props.theme.secondaryColor};
  color: ${props => props.theme.primaryTextColor};
  padding: 4px 8px;
  display: flex;
  align-items: center;

  ${props => props.loading && css`
    color: ${props.theme.secondaryTextColor};
    background-image: ${props.theme.loadingBackgroundColor};
    animation-name: ${backgroundAnimation};
    animation-duration: 10s;
    animation-iteration-count: infinite;
    transition: background-position 0.3s, transform 0.3s;
    background-position: left top;
    background-size: 200%;
  `}
`

export const Logout = styled.div<{
}>`
  border-radius: 36px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  background: ${props => props.theme.primaryBackgroundColor};
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s;
  svg {
    path {
      stroke: ${props => props.theme.primaryTextColor};
    }
  }
  &:hover {
    ${props => {
      return css`
        border-color: transparent;
        background-color: ${props => props.theme.tagDefaultColor};
      `
    }};
  }
`

export const Profile = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: end;
  font-size: 12px;
  line-height: 36px;
  min-height: 58px;
  margin-left: auto;
  color: ${props => props.theme.primaryTextColor};
`