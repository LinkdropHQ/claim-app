type TButtonAppearance = 'action' | 'default' | 'additional'
type TButtonSize = 'default' | 'extra-small' | 'small' | 'large'

export type TProps<TLoadingType = boolean> = {
  title?: string
  disabled?: boolean
  loading?: TLoadingType
  onClick?: () => void
  appearance?: TButtonAppearance
  className?: string
  size?: TButtonSize
  type?: string
  children?: React.ReactNode
}
