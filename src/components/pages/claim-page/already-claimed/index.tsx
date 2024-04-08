import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { 
  TitleComponent,
  ButtonsContainer,
  TokenImageContainer,
  DoneIcon,
  Subtitle,
  DoneIconERC20,
  NFTTokenPreviewStyled
} from './styled-components'
import {
  ERC20TokenPreview,
  ClaimingFinishedButton,
  PoweredByFooter,
  ClaimingFinishedSecondaryButton
} from 'components/pages/common'
import AlreadyClaimedERC20 from 'images/already-claimed-erc20.png'

const mapStateToProps = ({
  drop: {
    type,
    amount,
    tokenId,
    claiming_finished_description
  },
  token: {
    image,
    name,
    decimals,
    
  }
}: RootState) => ({
  image,
  name,
  tokenId,
  type,
  decimals,
  amount,
  claiming_finished_description
})

type ReduxType = ReturnType<typeof mapStateToProps>

const AlreadyClaimed: FC<ReduxType> = ({
  image,
  name,
  type,
  amount,
  decimals,
  tokenId,
  claiming_finished_description
}) => {

  const content = type === 'ERC20' ? <ERC20TokenPreview
    name={name}
    image={image as string}
    amount={amount as string}
    decimals={decimals}
  /> : <>
    {image && <TokenImageContainer>
      <DoneIcon />
      <NFTTokenPreviewStyled image={image} name={name} tokenId={tokenId} />
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
      <ClaimingFinishedSecondaryButton />
    </ButtonsContainer>
    <PoweredByFooter />
  </>
}

export default connect(mapStateToProps)(AlreadyClaimed)