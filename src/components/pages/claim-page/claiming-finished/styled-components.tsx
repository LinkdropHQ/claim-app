import styled from 'styled-components'
import { Button, TokenImage, Title, Text } from 'components/common'
import Icons from 'icons'
import { NFTTokenPreview } from 'components/pages/common'

export const TitleComponent = styled(Title)`
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Subtitle = styled.h3`
  font-size: 16px;
  line-height: 23px;
  margin: 0 0 30px;
  text-align: center;
  color: ${props => props.theme.additionalTextColor};
  font-weight: 500;
`

export const Container = styled.div`
  text-align: center;
  width: 100%;
`

export const ButtonsContainer = styled.div`
  width: 100%;
  padding-bottom: 40px;
`

export const ScreenButton = styled(Button)`
  width: 100%;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0px;
  }
`

export const TokenImageContainer = styled.div`
  position: relative;
  padding: 12px 12px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin: 0 auto;
`

export const TokenImageLarge = styled(TokenImage)`
  width: 226px;
  height: 226px;
  border-radius: 8px;
  margin-bottom: 24px;
  background: ${props => props.theme.widgetColor};
`

export const DoneIcon = styled(Icons.DoneIcon)`
  position: absolute;
  border: 6px solid ${props => props.theme.blankColor};
  border-radius: 100%;
  top: 0px;
  left: calc(50% + 80px);
  z-index: 2;
  background: ${props => props.theme.blankColor};
`

export const UserAddress = styled.span`
  color: ${props => props.theme.linkColor};
`

export const DoneIconERC20 = styled.img`
  max-width: 24px;
  margin-right: 8px;
`

export const NFTTokenPreviewStyled = styled(NFTTokenPreview)`
  margin-bottom: 39px;
`