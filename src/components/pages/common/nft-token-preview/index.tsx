import { FC, useState } from "react"
import { TProps } from './types'
import { 
  Subtitle,
  TokenImageContainer,
  Container,
  TokenImageSlider
} from './styled-components'
import Token1 from 'images/token-1.png'
import Token2 from 'images/token-2.png'

const tokenAddressCustom = '0xe0195b5e2c917fb3174d19ddff8a92a993b54981'


const defineSubtitle = (
  tokenAddress: string,
  name: string,
  tokenId?: string | null,
) => {
  if (tokenAddress === tokenAddressCustom) {
    if (!tokenId || tokenId === '2') { return null }
    if (tokenId === '1') return `Collection of 2 collectibles`
  }
  return name
}

const defineTokenImage = (
  tokenId: string | null,
  image: string,
  name: string | null,
  tokenAddress: string,
  sliderImage: number,
  setSliderImage: (sliderImage: number) => void
) => {
  if (tokenAddress === tokenAddressCustom) {
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

  return <TokenImageContainer src={image} alt={name || 'NFT Token'} />
}

const NFTTokenPreview: FC<TProps> = ({
  image,
  name,
  tokenId,
  className,
  tokenAddress
}) => {
  const [ sliderImage, setSliderImage ] = useState<number>(1)

  return <Container className={className}>
    {defineTokenImage(
      tokenId,
      image,
      name,
      tokenAddress,
      sliderImage,
      setSliderImage
    )}
    <Subtitle>{defineSubtitle(
      tokenAddress,
      name,
      tokenId
    )}</Subtitle>
  </Container>
}

export default NFTTokenPreview