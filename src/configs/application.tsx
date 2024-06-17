import LinkdropLogo from 'images/linkdrop.png'
import LumasLogo from 'images/lumas.png'
import AlphemyLogo from 'images/alphemy.png'
import WeddingImage from 'images/wedding.png'

type TApplicationParams = {
  highlightColor: string
  primaryTextColor: string
  additionalTextColor: string
  secondaryTextColor: string
  logo: string
  backgroundColor: string
  highlightHoverColor: string
  highlightActiveColor: string
  footerLogoStyle: 'dark' | 'light'
  primaryText?: string
  primaryDescription?: string
  tokenImage?: string
}

type TConfig = Record<string, TApplicationParams>


const originalParams: TApplicationParams = {
  highlightColor: '#0C5EFF',
  primaryTextColor: '#121212',
  footerLogoStyle: 'dark',
  additionalTextColor: '#9D9D9D',
  secondaryTextColor: '#FFF',
  logo: LinkdropLogo,
  backgroundColor: '#F7F7FB',
  highlightHoverColor: '#357AFF',
  highlightActiveColor: '#095AF5'
}

const applicationParams: TConfig = {
  linkdrop: originalParams
}

export default applicationParams