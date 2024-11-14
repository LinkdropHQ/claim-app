import { FC } from 'react'
import { Anchor, ButtonLink } from './styled-components'
import { TProps } from './types'
import OriginalButton from '../original-button'

const ButtonComponent: FC<TProps> = (props) => {
  const { href, to, target, size = 'large', className } = props
  if (href) {
    return (
      <Anchor href={href} target={target}>
        <OriginalButton {...props} size={size} className={className} />
      </Anchor>
    )
  }
  if (to) {
    return (
      <ButtonLink to={to}>
        <OriginalButton {...props} size={size} />
      </ButtonLink>
    )
  }
  return <OriginalButton {...props} size={size} className={className} />
}

export default ButtonComponent
