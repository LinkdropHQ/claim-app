import styled from 'styled-components'
import { Button, Text, Title } from 'components/common'
import { NFTTokenPreview } from 'components/pages/common'

type TScreenButton = {
  onClick: () => void
}

export const TitleComponent = styled(Title)`
  margin: 0 0 12px;
  font-weight: 600;
`

export const Container = styled.div`
  text-align: center;
  max-width: 343px;
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


export const UserAddress = styled.span`
  color: ${props => props.theme.linkColor};
`

export const NFTTokenPreviewStyled = styled(NFTTokenPreview)`
  margin-bottom: 39px;
`