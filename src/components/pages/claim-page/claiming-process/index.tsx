import { FC, useEffect } from 'react'
import { ScreenSubtitle, ScreenTitle, Container, ButtonComponent, IconContainer } from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { defineExplorerURL } from 'helpers'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { Loader } from 'components/common'
import { TDropType } from 'types'
import { utils } from 'ethers'

const mapStateToProps = ({
  drop: {
    hash,
    chainId,
    amount,
    type
  },
  token: {
    decimals,
    name
  }
}: RootState) => ({
  hash,
  chainId,
  decimals,
  amount,
  type,
  name
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    checkTransactionStatus: () => dispatch(
      dropAsyncActions.checkTransactionStatus()
    )
  }
}

const defineTitle = (
  tokenType: TDropType,
  decimals: number,
  amount: string | null,
  name: string
) => {
  if (tokenType === 'ERC721' || tokenType === 'ERC1155') {
    return "Claiming your NFT"
  }
  if (decimals && amount && name) {
    return `Claiming ${utils.formatUnits(amount as string, decimals)} ${name}`
  }
  return 'Claiming tokens'
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const ClaimingProcess: FC<ReduxType> = ({
  hash,
  chainId,
  checkTransactionStatus,
  type,
  decimals,
  amount,
  name
}) => {
  useEffect(() => {
    if (!hash) { return }
    checkTransactionStatus()
  }, [])

  const title = defineTitle(
    type as TDropType,
    decimals,
    amount,
    name
  )

  const explorerUrl = chainId && hash ? <ButtonComponent
    href={`${defineExplorerURL(chainId)}/tx/${hash}`}
    title='View in explorer'
    target='_blank'
    appearance='default'
  /> : null
  return <Container>
    <IconContainer>
      <Loader />
    </IconContainer>
    <ScreenTitle>
      {title}
    </ScreenTitle>
    <ScreenSubtitle>This might take a few minutes. Feel free to check back later</ScreenSubtitle>
    {explorerUrl} 
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ClaimingProcess)
