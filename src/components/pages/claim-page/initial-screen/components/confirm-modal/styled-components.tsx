import styled, { css } from "styled-components"
import { Checkbox } from "linkdrop-ui"
import { Button } from 'components/common'
import { Link } from 'components/common'

export const Container = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  z-index: 100;
  transform: translateY(100%);
  transition: transform .3s;
  background: rgb(0, 0, 0);
  height: 100%;

  ${props => props.visible && css`
    transform: translateY(0%);
  `}
`

export const Body = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${props => props.theme.blankColor};
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  padding: 36px 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  line-height: 1;
  max-width: 343px;
  width: 100%;
`

export const BackArrow = styled.div`
  margin-right: 12px;
  cursor: pointer;

  svg {
    stroke: ${props => props.theme.primaryTextColor};

    path {
      fill: ${props => props.theme.primaryTextColor}

    }
  }
`

export const Title = styled.h2`
  font-size: 24px;
  line-height: 1;
  margin: 0;
  color: ${props => props.theme.primaryTextColor};
`

export const Content = styled.div`
  color: ${props => props.theme.primaryTextColor};
  text-align: left;
  max-width: 343px;
`

export const Paragraph = styled.p`
  margin-bottom: 24px;
  font-weight: 500;

  &:last-child {
    margin-bottom: 0px;
  }
`

export const CheckboxStyled = styled(Checkbox)`
margin-right: 8px;
  & > div > div {
    background: ${props => props.theme.blankColor};
  }

  input:checked {
    ~ .CustomCheckboxClassName {
      background: #0057ff;
      border-color: #0057ff;
    }
  }

  svg {
    path {
      stroke: #FFF;
    }
  }
`

export const CheckboxContainer = styled.div`
  display: flex;
  cursor: pointer;
  font-weight: 400;
  align-items: flex-start;
  margin-bottom: 20px;
`

export const ButtonStyled = styled(Button)<{ disabled: boolean }>`
  width: 100%;
  max-width: 343px;

  ${props => props.disabled && css`
    color: ${props.theme.buttonDefaultDisabledTextColor};
  `}
`

export const LinkStyled = styled(Link)`
  margin-left: 4px;
  font-weight: 600;
`