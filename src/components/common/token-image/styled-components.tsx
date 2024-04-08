import styled, { css } from 'styled-components'
import { TProps } from './types'

export const TokenImage = styled.img<TProps>`
  width: 184px;
  height: 184px;
  object-fit: cover;
  display: block; 
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(96, 97, 112, 0.16);
  ${props => props.onClick && css`
    cursor: pointer;
  `}
`

export const TokenVideo = styled.video`
  width: 184px;
  height: 184px;
  object-fit: cover;
  display: block; 
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
`

export const TokenVideoSource = styled.source`
  
`