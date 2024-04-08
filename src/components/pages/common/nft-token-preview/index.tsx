import { FC, useState } from "react"
import { TProps } from './types'
import { shortenString } from 'helpers'
import { 
  Subtitle,
  TokenImageContainer,
  Container,
  TokenImageSlider
} from './styled-components'
import Token1 from 'images/token-1.png'
import Token2 from 'images/token-2.png'

const defineSubtitle = (tokenId?: string | null) => {
  if (!tokenId || tokenId === '2') { return null }
  if (tokenId === '1') return `Collection of 2 collectibles`
}

const defineTokenImage = (
  tokenId: string | null,
  image: string,
  name: string | null,
  sliderImage: number,
  setSliderImage: (sliderImage: number) => void
) => {
  if (tokenId === '1') {
    return <TokenImageSlider sliderImage={sliderImage}>
      <TokenImageContainer
        src={Token1}
        alt={name || 'NFT Token'}
        onClick={() => {
          setSliderImage(1)
        }}
      />
      <TokenImageContainer
        src={Token2}
        alt={name || 'NFT Token'}
        onClick={() => {
          setSliderImage(2)
        }}
      />
    </TokenImageSlider>
  }

  if (tokenId === '2') {
    return <TokenImageContainer src={Token2} alt={name || 'NFT Token'} />
  }
}

const NFTTokenPreview: FC<TProps> = ({
  image,
  name,
  tokenId,
  className
}) => {
  const [ sliderImage, setSliderImage ] = useState<number>(1)

  return <Container className={className}>
    {defineTokenImage(
      tokenId,
      image,
      name,
      sliderImage,
      setSliderImage
    )}
    <Subtitle>{defineSubtitle(tokenId)}</Subtitle>
  </Container>
}

export default NFTTokenPreview