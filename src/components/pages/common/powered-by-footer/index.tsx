import { FC } from 'react'
import {
  PoweredBy,
  PoweredByImage
} from './styled-components'
import LinkdropLogo from 'images/linkdrop-header.png'

const PoweredByFooter = () => {
  return <PoweredBy href='https://linkdrop.io' target='_blank'>
    Powered by
    <PoweredByImage src={LinkdropLogo} alt="Linkdrop Logo"/>
  </PoweredBy>
}


export default PoweredByFooter