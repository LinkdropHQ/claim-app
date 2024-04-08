import { FC } from 'react'
import { TokenImage, TokenVideo, TokenVideoSource } from './styled-components'
import { TProps } from './types'

const TokenImageComponent: FC<TProps> = ({
  src,
  alt,
  className,
  onClick
}) => {
  if (src.includes('.mp4')) {
    return <TokenVideo muted autoPlay className={className} loop playsInline>
      <TokenVideoSource src={src} type="video/mp4"/>
      Your browser does not support the video tag.
    </TokenVideo>
  }
  return <TokenImage
    onClick={onClick}
    src={src}
    alt={alt}
    className={className}
  />
}

export default TokenImageComponent