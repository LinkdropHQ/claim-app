import { FC } from 'react'
import { TokenImage, TokenVideo, TokenVideoSource } from './styled-components'

type TProps = {
  src: string,
  alt: string,
  className?: string
}

const TokenImageComponent: FC<TProps> = ({ src, alt, className }) => {
  if (src.includes('.mp4')) {
    return <TokenVideo muted autoPlay className={className}>
      <TokenVideoSource src={src} type="video/mp4"/>
      Your browser does not support the video tag.
    </TokenVideo>
  }
  return <TokenImage
    src={src}
    alt={alt}
    className={className}
  />
}

export default TokenImageComponent