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