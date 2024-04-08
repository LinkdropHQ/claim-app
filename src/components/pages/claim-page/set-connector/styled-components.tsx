import styled from 'styled-components'
import { Button, Text, TokenImage, Title } from 'components/common'
import { NFTTokenPreview } from 'components/pages/common'

type TScreenButton = {
  onClick: () => void
}

export const TitleComponent = styled(Title)`
  font-size: 22px;
  color: ${props => props.theme.primaryTextColor};
  margin: 0 0 12px;
  max-width: 343px;
  font-weight: 600;
`

export const Container = styled.div`
  text-align: center;
  width: 100%;
`

export const ScreenButton = styled(Button)<TScreenButton>`
  max-width: 100%;
  width: 100%;
  margin-bottom: 16px;
`

export const TextComponent = styled(Text)`
  text-align: center;
  margin-bottom: 32px;
`

export const NFTTokenPreviewStyled = styled(NFTTokenPreview)`
  margin-bottom: 39px;
`