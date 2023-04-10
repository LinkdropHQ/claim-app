
import { Dispatch } from 'redux'
import * as actionsDrop from '../actions'
import * as actionsToken from '../../token/actions'
import * as asyncActionsUser from '../../user/async-actions'
import { DropActions } from '../types'
import { TokenActions } from '../../token/types'
import { UserActions } from '../../user/types'
import getERC1155Data from './get-erc1155-token-data'
import getERC721Data from './get-erc721-token-data'
import getERC20Data from './get-erc20-token-data'
import { RootState, IAppDispatch } from 'data/store'
import { plausibleApi } from 'data/api'

export default function getData(
  onReload: () => void,
  connector: any,
  userChainId?: number,
  userAddress?: string
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    
    try {
      dispatch(actionsDrop.setLoading(true))
      console.log({ userChainId, userAddress, connector })
      await dispatch(asyncActionsUser.initialize(
        onReload,
        connector,
        userChainId,
        userAddress
      ))

      const {
        user: {
          provider,
          address,
          hasConnector
        },
        drop: {
          isClaimed,
          tokenAddress: linkTokenAddress,
          chainId: linkChainId,
          expirationTime,
          tokenId,
          amount,
          type,
          campaignId
        }
      } = getState()

      if (type === 'ERC1155' && linkTokenAddress && tokenId) {
        const { name, image, description } = await getERC1155Data(provider, linkTokenAddress, tokenId, linkChainId)
        dispatch(actionsToken.setDescription(description))
        dispatch(actionsToken.setImage(image))
        dispatch(actionsToken.setName(name))
      }

      if (type === 'ERC721' && linkTokenAddress && tokenId) {
        const { name, image, description } = await getERC721Data(provider, linkTokenAddress, tokenId, linkChainId)
        dispatch(actionsDrop.setTokenId(tokenId))
        dispatch(actionsToken.setDescription(description))
        dispatch(actionsToken.setImage(image))
        dispatch(actionsToken.setName(name))
      }

      if (type === 'ERC20' && linkTokenAddress) {
        const { symbol, decimals, image } = await getERC20Data(provider, linkTokenAddress, linkChainId)
        dispatch(actionsToken.setName(symbol))
        dispatch(actionsToken.setImage(image))
        dispatch(actionsToken.setDecimals(decimals))
      }

      if (Number(expirationTime) < +new Date()) {
        dispatch(actionsDrop.setLoading(false))
        plausibleApi.invokeEvent({
          eventName: 'error',
          data: {
            err_name: 'link_expired',
            campaignId: campaignId as string
          }
        })
        return dispatch(actionsDrop.setStep('link_expired'))
      }

      if (isClaimed) {
        dispatch(actionsDrop.setLoading(false))
        return dispatch(actionsDrop.setStep('already_claimed'))
      }

      if (!hasConnector && !address) {
        dispatch(actionsDrop.setLoading(false))
        return dispatch(actionsDrop.setStep('set_connector'))
      }

      // if (userChainId && Number(userChainId) !== Number(linkChainId)) {
      //   dispatch(actionsDrop.setLoading(false))
      //   return dispatch(actionsDrop.setStep('change_network'))
      // }

      dispatch(actionsDrop.setLoading(false))
      dispatch(actionsDrop.setStep('initial'))
    } catch (
      error: any
    ) {
      console.log(error, error.statusCode)
    }
  }
}
