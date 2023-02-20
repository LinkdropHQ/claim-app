import styled from 'styled-components'

type TProps = {
  src: string,
  alt: string
}

export const TokenImage = styled.img<TProps>`
  width: 184px;
  height: 184px;
  object-fit: cover;
  display: block; 
  border-radius: 8px;
  overflow: hidden;
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