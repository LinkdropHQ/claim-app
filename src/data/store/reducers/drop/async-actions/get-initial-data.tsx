
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
import { getHashVariables } from 'helpers'
import { RootState, IAppDispatch } from 'data/store'
import { TTheme } from 'types'

export default function getData(
  userAddress?: string,
  userChainId?: number
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    
    try {
      dispatch(actionsDrop.setLoading(true))
      const {
        weiAmount,
        nftAddress,
        tokenId,
        expirationTime,
        linkKey,
        linkdropMasterAddress,
        linkdropSignerSignature,
        campaignId,
        w,
        manual,
        tokenAddress: linkTokenAddress,
        tokenAmount,
        chainId: linkChainId,
        autoClaim,
        theme = 'dark',
        redirectToOnboarding
      } = getHashVariables()

      await dispatch(asyncActionsUser.initialize(
        userAddress,
        userChainId
      ))

      const {
        user: {
          provider,
          address,
          hasConnector
        },
        drop: {
          isClaimed
        }
      } = getState()

      const tokenAddress = linkTokenAddress || nftAddress

      dispatch(actionsDrop.setChainId(Number(linkChainId)))
      dispatch(actionsDrop.setTokenAddress(tokenAddress))
      dispatch(actionsDrop.setWallet(w))
      dispatch(actionsDrop.setIsManual(Boolean(manual)))
      dispatch(actionsDrop.setExpirationTime(expirationTime))
      dispatch(actionsDrop.setLinkdropMasterAddress(linkdropMasterAddress))
      dispatch(actionsDrop.setLinkdropSignerSignature(linkdropSignerSignature))
      dispatch(actionsDrop.setCampaignId(campaignId))
      dispatch(actionsDrop.setWeiAmount(weiAmount))
      dispatch(actionsDrop.setLinkKey(linkKey))
      dispatch(actionsDrop.setAutoClaim(Boolean(autoClaim)))
      dispatch(actionsDrop.setTheme(theme as TTheme))
      dispatch(actionsDrop.setRedirctToOnboarding(Boolean(redirectToOnboarding)))
  
      if (tokenId && tokenAmount) {
        const { name, image, description } = await getERC1155Data(provider, tokenAddress, tokenId)
        dispatch(actionsDrop.setAmount(tokenAmount))
        dispatch(actionsDrop.setTokenId(tokenId))
        dispatch(actionsToken.setDescription(description))
        dispatch(actionsToken.setImage(image))
        dispatch(actionsToken.setName(name))
        dispatch(actionsDrop.setType('erc1155'))
      }

      if (tokenId && !tokenAmount) {
        const { name, image, description } = await getERC721Data(provider, tokenAddress, tokenId)
        dispatch(actionsDrop.setTokenId(tokenId))
        dispatch(actionsToken.setDescription(description))
        dispatch(actionsToken.setImage(image))
        dispatch(actionsToken.setName(name))
        dispatch(actionsDrop.setType('erc721'))
      }

      if (tokenAmount && !tokenId) {
        const { symbol, decimals, image } = await getERC20Data(provider, tokenAddress)
        dispatch(actionsToken.setName(symbol))
        dispatch(actionsToken.setImage(image))
        dispatch(actionsToken.setDecimals(decimals))
        dispatch(actionsDrop.setAmount(tokenAmount))
        dispatch(actionsDrop.setType('erc20'))
      }

      if (Number(expirationTime) < +new Date()) {
        dispatch(actionsDrop.setLoading(false))
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

      // if (userChainId !== Number(linkChainId)) {
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
