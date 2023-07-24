import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import {
  defineExplorerURL,
} from 'helpers'
import { 
  TitleComponent,
  ButtonsContainer,
  ScreenButton,
  TokenImageLarge,
  TokenImageContainer,
  DoneIcon,
  Subtitle,
  DoneIconERC20
} from './styled-components'
import { plausibleApi } from 'data/api'
import {
  ERC20TokenPreview,
  ClaimingFinishedButton,
  PoweredByFooter
} from 'components/pages/common'
import AlreadyClaimedERC20 from 'images/already-claimed-erc20.png'

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
  campaignId,
  type,
  decimals,
  amount,
  claiming_finished_description
})

type ReduxType = ReturnType<typeof mapStateToProps>

const AlreadyClaimed: FC<ReduxType> = ({
  image,
  name,
  chainId,
  hash,
  campaignId,
  type,
  amount,
  decimals,
  claiming_finished_description
}) => {

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
  /> : <>
    {image && <TokenImageContainer>
      <DoneIcon />
      <TokenImageLarge
        src={image}
        alt={name}
      />
    </TokenImageContainer>}
  </>

  return <>
    {content}
    <TitleComponent>
      {type === 'ERC20' && <DoneIconERC20 src={AlreadyClaimedERC20} />}
      Already claimed
    </TitleComponent>
    <Subtitle>
      {claiming_finished_description || `Somebody has already claimed this link. In case it was you, find ${type === 'ERC20' ? 'tokens' : 'NFT'} in your wallet`}
     
    </Subtitle>
    <ButtonsContainer>
      <ClaimingFinishedButton />
      {explorerUrl}
    </ButtonsContainer>
    <PoweredByFooter />
  </>
}

export default connect(mapStateToProps)(AlreadyClaimed)