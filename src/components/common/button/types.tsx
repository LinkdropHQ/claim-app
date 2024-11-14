import { TButtonAppearance } from 'types'

type TButtonTarget = '_blank' | '_self' | '_parent' | '_top'

export type TProps = {
  title?: string
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  appearance?: TButtonAppearance
  className?: string
  size?: 'default' | 'small' | 'extra-small'
  href?: string
  to?: string
  target?: TButtonTarget
  type?: string
  children?: React.ReactNode | React.ReactNode[]
}
