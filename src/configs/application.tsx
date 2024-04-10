import LinkdropLogo from 'images/linkdrop.png'
import LumasLogo from 'images/lumas.png'
import AlphemyLogo from 'images/alphemy.png'
import LedgerRTFKTLogo from 'images/ledger-rtfkt.png'

type TApplicationParams = {
  highlightColor: string
  primaryTextColor: string
  additionalTextColor: string
  secondaryTextColor: string
  logo: string
  noteDefaultBgColor: string
  backgroundColor: string
  highlightHoverColor: string
  highlightActiveColor: string
  noteDefaultTextColor: string
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
  secondaryTextColor: '#FFF',
  noteDefaultBgColor: '#E4EDFF',
  noteDefaultTextColor: '#0C5EFF',
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
  noteDefaultTextColor: '#0C5EFF',
  noteDefaultBgColor: '#E4EDFF',
  logo: LumasLogo,
  backgroundColor: '#F7F7FB',
  secondaryTextColor: '#FFF',
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
  noteDefaultBgColor: '#E4EDFF',
  backgroundColor: '#000',
  noteDefaultTextColor: '#0C5EFF',
  highlightHoverColor: 'rgba(255, 255, 255, .6)',
  highlightActiveColor: 'rgba(255, 255, 255, .6)',
  claimFinishedButton: {
    title: 'Read our FAQ',
    url: 'https://alphemy.capital/gift#faq'
  }
}


const ledgerParams: TApplicationParams = {
  highlightColor: '#FFF',
  primaryTextColor: '#FFF',
  footerLogoStyle: 'light',
  secondaryTextColor: '#000',
  additionalTextColor: '#FFF',
  logo: LedgerRTFKTLogo,
  backgroundColor: '#000',
  highlightHoverColor: 'rgba(255, 255, 255, .6)',
  highlightActiveColor: 'rgba(255, 255, 255, .6)',
  noteDefaultBgColor: '#29406D',
  noteDefaultTextColor: '#6294F5'

}

const applicationParams: TConfig = {
  linkdrop: originalParams,
  lumas: lumasParams,
  alphemy: alphemyParams,
  ledger: ledgerParams
}


export default applicationParams