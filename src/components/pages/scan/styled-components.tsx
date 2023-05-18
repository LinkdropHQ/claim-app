import styled from 'styled-components'
import { Button } from 'components/common'

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 343px;
  margin: 0 auto;
  justify-content: center;
  text-align: center;
`

export const Image = styled.img`
  max-width: 240px;
  margin-bottom: 24px;
`

export const Title = styled.h2`
  margin: 0 0 8px;
  font-size: 24px;
  text-align: center;
  font-weight: 600;
  color: ${props => props.theme.primaryTextColor};
`

export const Subtitle = styled.h3`
  color: ${props => props.theme.additionalTextColor};
  font-size: 14px;
  margin: 0 0 40px;
`

export const ButtonStyled = styled(Button)`
  width: 100%;
  margin-bottom: 16px;
`

export const IconContainer = styled.div`
  margin-bottom: 35px;
  margin-top: 50px;
`

export const LoadingTitle = styled.h3`
  font-size: 24px;
  line-height: 32px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0 0 12px;
  text-align: center;
`

export const LoadingText = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.theme.additionalTextColor};
  margin: 0;
  text-align: center;
`
