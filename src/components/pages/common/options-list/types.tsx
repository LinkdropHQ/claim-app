export type TOption = {
  title: string
  icon?: JSX.Element
  onClick?: () => void
  recommended?: boolean
  tag?: string
  href?: string
}

export type TProps = {
  options: (TOption | undefined)[]
  className?: string
}
