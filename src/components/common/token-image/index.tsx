import { FC } from 'react'
import { TokenImage, TokenVideo, TokenVideoSource } from './styled-components'
import { TProps } from './types'

const defineSrcUrl = (
  src: string
) => {
  // current solution
  if (!src.includes('ucarecdn.com')) {
    return src
  }

  return `${src}-/preview/368x368/-/format/auto/-/quality/smart/`
}

const TokenImageComponent: FC<TProps> = ({
  src,
  alt,
  className
}) => {
  const finalSrc = defineSrcUrl(src)
  if (src.includes('.mp4') || src.includes('video/mp4')) {
    return <TokenVideo muted autoPlay className={className} loop playsInline>
      <TokenVideoSource src={finalSrc} type="video/mp4"/>
      Your browser does not support the video tag.
    </TokenVideo>
  }
  return <TokenImage
    src={finalSrc}
    alt={alt}
    className={className}
  />
}

export default TokenImageComponent