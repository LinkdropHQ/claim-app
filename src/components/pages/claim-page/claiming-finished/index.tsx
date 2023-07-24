import { FC, useEffect } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { 
  TitleComponent,
  ButtonsContainer,
  ScreenButton,
  TokenImageLarge,
  TokenImageContainer,
  DoneIcon,
  Container,
  Subtitle,
  DoneIconERC20
} from './styled-components'
import { defineExplorerURL } from 'helpers'
import { plausibleApi } from 'data/api'
import {
  ERC20TokenPreview,
  ClaimingFinishedButton,
  PoweredByFooter
} from 'components/pages/common'
import ClaimingFinishedERC20 from 'images/claiming-finished-erc20.png'

const mapStateToProps = ({
  drop: {
    hash,
    chainId,
    campaignId,
    type,
    amount,
    claiming_finished_description
  },
  token: {
    image,
    name,
    decimals
  }
}: RootState) => ({
  image,
  name,
  chainId,
  hash,
  type,
  campaignId,
  amount,
  decimals,
  claiming_finished_description
})

type ReduxType = ReturnType<typeof mapStateToProps>

const ClaimingFinished: FC<ReduxType> = ({
  image,
  name,
  hash,
  chainId,
  campaignId,
  type,
  amount,
  decimals,
  claiming_finished_description
}) => {
  useEffect(() => {
    plausibleApi.invokeEvent({
      eventName: 'claim_finished',
      data: {
        campaignId: campaignId as string,
      }
    })
  }, [])
  const explorerUrl = chainId && hash ? <ScreenButton
    onClick={() => {
      plausibleApi.invokeEvent({
        eventName: 'click_explorer',
        data: {
          campaignId: campaignId as string,
        }
      })
      window.open(`${defineExplorerURL(chainId)}/tx/${hash}`, '_blank')
    }}
    title='View in Explorer'
    appearance='inverted'
  /> : null

  const content = type === 'ERC20' ? <ERC20TokenPreview
    name={name}
    image={image as string}
    amount={amount as string}
    decimals={decimals}
    status='finished'
  /> : <>
    {image && <TokenImageContainer>
      <DoneIcon />
      <TokenImageLarge
        src={image}
        alt={name}
      />
    </TokenImageContainer>}
  </>

  return <Container>
    {content}
    <TitleComponent>
      {type === 'ERC20' && <DoneIconERC20 src={ClaimingFinishedERC20} />}
        Successfully claimed
      </TitleComponent>
    <Subtitle>
      {claiming_finished_description || `Your ${type === 'ERC20' ? 'tokens' : 'NFT'} will appear in your account in a few minutes`}
    </Subtitle>
    <ButtonsContainer>
      <ClaimingFinishedButton />
      {explorerUrl}
    </ButtonsContainer>
    <PoweredByFooter />
  </Container>
}

export default connect(mapStateToProps)(ClaimingFinished)