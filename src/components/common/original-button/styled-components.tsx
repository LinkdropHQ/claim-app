import styled, { css, keyframes } from 'styled-components'
import Loader from '../loader'
import { TProps } from './types'

const backgroundAnimation = keyframes`
  0% { background-position: left top; }
  50% { background-position: right bottom; }
  100% { background-position: left top; }
`

export const ButtonLoader = styled(Loader)`
  margin-right: 8px;
`

export const Button = styled.button.attrs((props) => ({
  className: props.className,
}))<TProps<string>>`
  cursor: pointer;
  font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 14px 30px;
  font-size: 14px;
  height: 48px;
  line-height: 1;
  display: flex;
  align-items: center;
  font-weight: 500;
  justify-content: center;
  border-radius: 12px;
  //default
  transition: color 0.3s, background-color 0.3s, border-color 0.3s;
  background-color: ${(props) =>
    props.theme && props.theme.buttonDefaultBackgroundColor};
  color: ${(props) => props.theme && props.theme.primaryTextColor};
  border: 1px solid;
  border-color: ${(props) => props.theme && props.theme.primaryBorderColor};
  box-sizing: border-box;

  ${(props) =>
    props.appearance === 'default' &&
    props.disabled &&
    css`
      border-color: ${(props) =>
        (props.theme && props.theme.buttonDefaultDisabledBorderColor)};
      color: ${(props) =>
        (props.theme && props.theme.buttonDefaultDisabledTextColor)};
    `}

  ${(props) =>
    !props.disabled &&
    css`
      &:hover {
        border-color: ${(props) =>
          (props.theme && props.theme.buttonDefaultBorderHoverColor)};
        background-color: ${(props) =>
          (props.theme && props.theme.buttonDefaultBackgroundHoverColor)};
      }
      &:active {
        border-color: ${(props) =>
          (props.theme && props.theme.buttonDefaultBorderActiveColor)};
        background-color: ${(props) =>
          (props.theme && props.theme.buttonDefaultBackgroundActiveColor)};
      }
    `}

  ${(props) =>
    props.size === 'extra-small' &&
    css`
      padding: 4px 8px;
      height: 28px;
      font-size: 14px;
      border-radius: 8px;
    `}

  ${(props) =>
    props.size === 'small' &&
    css`
      padding: 12px 24px;
      height: 40px;
      font-size: 12px;
      border-radius: 12px;
    `}

  ${(props) =>
    props.size === 'large' &&
    css`
      padding: 16px 36px;
      font-size: 16px;
      height: 56px;
      border-radius: 16px;
    `}

  // action
  ${(props) =>
    props.appearance === 'action' &&
    css`
      border: none;
      background-color: ${(props) =>
        props.theme && props.theme.buttonActionBackgroundColor};
      color: ${(props) => props.theme && props.theme.secondaryTextColor};

      ${!props.disabled &&
      css`
        &:hover {
          background-color: ${(props) =>
            props.theme && props.theme.buttonActionBackgroundHoverColor};
        }
        &:active {
          background-color: ${(props) =>
            props.theme && props.theme.buttonActionBackgroundActiveColor};
        }
      `}

      ${props.disabled &&
      css`
        background-color: ${(props) =>
          props.theme && props.theme.buttonDisabledBackgroundColor};
        color: ${(props) => props.theme && props.theme.additionalTextColor};
      `}
    `}


  ${(props) =>
    props.appearance === 'additional' &&
    css`
      border: none;
      background-color: ${(props) =>
        (props.theme && props.theme.buttonAdditionalBackgroundColor)};
      color: ${(props) => (props.theme && props.theme.primaryHighlightColor)};

      ${!props.disabled &&
      css`
        &:hover {
          background-color: ${(props) =>
            (props.theme && props.theme.buttonAdditionalBackgroundHoverColor)};
          color: ${(props) =>
            (props.theme && props.theme.buttonAdditionalTextHoverColor)};
        }
        &:active {
          background-color: ${(props) =>
            (props.theme && props.theme.buttonAdditionalBackgroundActiveColor)};
          color: ${(props) =>
            (props.theme && props.theme.buttonAdditionalTextActiveColor)};
        }
      `}

      ${props.disabled &&
      css`
        background-color: ${(props) =>
          (props.theme && props.theme.buttonDisabledBackgroundColor)};
        color: ${(props) => (props.theme && props.theme.additionalTextColor)};
      `}
    `}

  ${(props) =>
    props.loading &&
    css`
      background: ${(props) => (props.theme && props.theme.buttonGradient)};
      background-size: 200%;
      background-position: left top;
      transition: background-position 0.3s, transform 0.3s;
      border: none;
      color: ${(props) => (props.theme && props.theme.secondaryTextColor)};
      animation-name: ${backgroundAnimation};
      animation-duration: 10s;
      animation-iteration-count: infinite;
      transition: background-position 0.3s, transform 0.3s;
      background-position: left top;
      background-size: 200%;

      ${!props.disabled &&
      css`
        &:hover {
          background-position: right top;
        }
        &:active {
          background-position: center center;
          transform: scale(1.01);
        }
      `}
    `}

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}
`
