import styled from "styled-components"

export const LinkdropHeader = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`

export const LinkdropHeaderLogo = styled.img`
  max-width: 120px;
`

export const LinkdropHeaderBack = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;

  svg {
    path {
      fill: #FFF;
    }
  }
`

export const Account = styled.div`
  height: 36px;
  margin-right: 16px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 2px 0 2px;
  justify-content: center;
  color: ${props => props.theme.primaryTextColor};
  font-size: 14px;
  border-radius: 36px;
  border: 1px solid #3D3F49;
  background:  #1D1F2B;
`

export const Address = styled.div`
  height: 28px;
  border-radius: 28px;
  padding-left: 14px;
  padding-right: 14px;
  display: flex;
  align-items: center;
`

export const Logout = styled.div`
  border-radius: 36px;
  border: 1px solid #3D3F49;
  background: #1D1F2B;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color .3s;
`

export const Profile = styled.div`
  display: none;
  position: fixed;
  top: 32px;
  right: 56px; 

  @media (min-width: 768px) {
    display: flex;
  }
`