import { FC } from 'react'
import { ButtonStyled } from './styled-components'
import { plausibleApi } from 'data/api'
import { RootState } from 'data/store'
import { connect } from 'react-redux'

const mapStateToProps = ({
  drop: {
    chainId,
    tokenId,
    tokenAddress,
    campaignId,
    type,
    claiming_finished_button_title,
    claiming_finished_button_url,
    claiming_finished_description
  },
  user: {
    address,
    email
  }
}: RootState) => ({
  chainId,
  tokenId,
  type,
  tokenAddress,
  campaignId,
  claiming_finished_button_title,
  claiming_finished_button_url,
  claiming_finished_description,
  address,
  email
})

type ReduxType = ReturnType<typeof mapStateToProps>

const ClaimingFinishedButton: FC<ReduxType> = ({
  tokenAddress,
  chainId,
  campaignId,
  claiming_finished_button_title,
  claiming_finished_button_url,
}) => {
  if (claiming_finished_button_url && claiming_finished_button_title) {
    return <ButtonStyled
      onClick={() => {
        plausibleApi.invokeEvent({
          eventName: 'click_custom_redirect_button',
          data: {
            campaignId: campaignId as string,
          }
        })
        window.open(claiming_finished_button_url, '_blank')
      }}
      appearance='action'
    >
      {claiming_finished_button_title}
    </ButtonStyled>
  }
  
  if (!tokenAddress || !chainId) { return null }

  return <ButtonStyled
    onClick={() => {
      plausibleApi.invokeEvent({
        eventName: 'click_redirect_button',
        data: {
          campaignId: campaignId as string,
        }
      })
      window.open('https://keys.coinbase.com', '_blank')
    }}
    appearance='action'
  >
    See in Wallet
  </ButtonStyled>
}

export default connect(mapStateToProps)(ClaimingFinishedButton)
