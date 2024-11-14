import styled, { css } from 'styled-components'
import { InputContainerProps, InputFieldProps, InputTitleProps } from './types'

export const InputContainer = styled.div.attrs((props) => ({
  className: props.className,
}))<InputContainerProps>`
  margin-bottom: 24px;
  box-sizing: border-box;
`

export const InputTitle = styled.h3<InputTitleProps>`
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 16px;
  margin: 0 0 12px;

  color: ${(props) => (props.theme && props.theme.primaryTextColor)};
  ${(props) =>
    props.error &&
    css`
      color: ${(props) => (props.theme && props.theme.dangerTextColor)};
    `}
`

export const InputField = styled.input<InputFieldProps>`
  color: ${(props) => (props.theme && props.theme.primaryTextColor)};
  font-size: 14px;
  width: 100%;
  line-height: 20px;
  font-weight: 500;
  padding: 11px 16px;
  border: 1px solid;
  border-color: ${(props) => (props.theme && props.theme.primaryBorderColor)};
  border-radius: 8px;
  transition: border-color 0.3s;
  outline: none;
  margin: 0;

  ::placeholder {
    color: ${(props) => (props.theme && props.theme.additionalTextColor)};
  }

  &:focus {
    border-color: ${(props) =>
      (props.theme && props.theme.primaryHighlightColor)};
    outline: none;
  }

  ${(props) =>
    props.error &&
    css`
      border-color: ${(props) => (props.theme && props.theme.dangerTextColor)};
      &:focus {
        border-color: ${(props) => (props.theme && props.theme.dangerTextColor)};
        outline: none;
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      border-color: transparent;
      cursor: not-allowed;
      background: ${(props) =>
        (props.theme && props.theme.inputDisabledBackgroundColor)};
    `}
  &:hover:not(:focus) {
    ${(props) =>
      !props.error &&
      !props.disabled &&
      css`
        border-color: ${(props) =>
          (props.theme && props.theme.inputHoverBorderColor)};
        outline: none;
      `}
  }
`

export const InputAdditionalText = styled.div<{ type: 'error' | 'note' }>`
  margin-top: 6px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: ${(props) => (props.theme && props.theme.primaryTextColor)};
  svg {
    margin-right: 8px;
  }

  ${(prosp) =>
    prosp.type === 'error' &&
    css`
      color: ${(props) => (props.theme && props.theme.dangerTextColor)};
      svg {
        rect {
          fill: ${(props) => (props.theme && props.theme.dangerTextColor)};
        }
        path {
          stroke: ${(props) => (props.theme && props.theme.dangerTextColor)};
        }
        circle {
          stroke: ${(props) => (props.theme && props.theme.dangerTextColor)};
        }
      }
    `}
`
