import { FC, useEffect } from 'react'
import { ScreenSubtitle, ScreenTitle, Container, ButtonComponent, IconContainer } from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { defineExplorerURL } from 'helpers'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { Loader } from 'components/common'

const mapStateToProps = ({
  drop: { hash, chainId }
}: RootState) => ({
  hash,
  chainId
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    checkTransactionStatus: () => dispatch(
      dropAsyncActions.checkTransactionStatus()
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const ClaimingProcess: FC<ReduxType> = ({ hash, chainId, checkTransactionStatus }) => {
  useEffect(() => {
    if (!hash) { return }
    checkTransactionStatus()
  }, [])

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
    <ScreenTitle>Claiming your NFT</ScreenTitle>
    <ScreenSubtitle>This might take a few minutes. Feel free to check back later</ScreenSubtitle>
    {explorerUrl} 
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ClaimingProcess)
