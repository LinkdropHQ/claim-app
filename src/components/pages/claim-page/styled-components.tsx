import styled from 'styled-components'

export const Container = styled.div`
  max-width: 342px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`

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
  max-height: 40px;
`

export const LinkdropHeaderBack = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
`