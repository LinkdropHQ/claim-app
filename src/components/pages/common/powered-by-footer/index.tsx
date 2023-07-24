import { FC } from 'react'
import {
  PoweredBy,
  PoweredByImage
} from './styled-components'
import LinkdropLogo from 'images/linkdrop-header.png'
import { plausibleApi } from 'data/api'
import { RootState } from 'data/store'
import { connect } from 'react-redux'

const mapStateToProps = ({
  drop: { campaignId }
}: RootState) => ({
  campaignId
})

type ReduxType = ReturnType<typeof mapStateToProps>

const PoweredByFooter: FC<ReduxType> = ({
  campaignId
}) => {
  return <PoweredBy onClick={() => {
    window.open('https://linkdrop.io', '_blank')
    plausibleApi.invokeEvent({
      eventName: 'powered_by_linkdrop_click',
      data: {
        campaignId: String(campaignId)
      }
    })
  }}>
    Powered by
    <PoweredByImage src={LinkdropLogo} alt="Linkdrop Logo"/>
  </PoweredBy>
}


export default connect(mapStateToProps)(PoweredByFooter)