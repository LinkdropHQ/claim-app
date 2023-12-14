import LinkdropLogo from 'images/linkdrop.png'
import LumasLogo from 'images/lumas.png'
import AlphemyLogo from 'images/alphemy.png'

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
  claimFinishedButton?: {
    title: string
    url: string
  }
}

type TConfig = Record<string, TApplicationParams>


const originalParams: TApplicationParams = {
  highlightColor: '#0C5EFF',
  primaryTextColor: '#121212',
  footerLogoStyle: 'dark',
  additionalTextColor: '#9D9D9D',
  secondaryTextColor: 'FFF',
  logo: LinkdropLogo,
  backgroundColor: '#F7F7FB',
  highlightHoverColor: '#357AFF',
  highlightActiveColor: '#095AF5'
}

const lumasParams: TApplicationParams = {
  highlightColor: '#8719CB',
  primaryTextColor: '#121212',
  footerLogoStyle: 'dark',
  additionalTextColor: '#9D9D9D',
  logo: LumasLogo,
  backgroundColor: '#F7F7FB',
  secondaryTextColor: 'FFF',
  highlightHoverColor: '#6A149F',
  highlightActiveColor: '#6A149F'
}

const alphemyParams: TApplicationParams = {
  highlightColor: '#FFF',
  primaryTextColor: '#FFF',
  footerLogoStyle: 'light',
  secondaryTextColor: '#000',
  additionalTextColor: 'rgba(255, 255, 255, .4)',
  logo: AlphemyLogo,
  backgroundColor: '#000',
  highlightHoverColor: 'rgba(255, 255, 255, .6)',
  highlightActiveColor: 'rgba(255, 255, 255, .6)',
  claimFinishedButton: {
    title: 'Read our FAQ',
    url: 'https://linkdrop.io'
  }
}

const applicationParams: TConfig = {
  linkdrop: originalParams,
  lumas: lumasParams,
  alphemy: alphemyParams
}


export default applicationParams