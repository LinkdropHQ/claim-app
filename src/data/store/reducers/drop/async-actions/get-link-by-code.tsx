
import { Dispatch } from 'redux';
import { DropActions } from '../types'
import { UserActions } from '../../user/types'
import { ethers } from 'ethers'
import * as actionsDrop from '../actions'
import * as actionsUser from '../../user/actions'
import { TLinkParams, TDropType, TWalletName } from 'types'
import LinkdropSDK from 'linkdrop-batch-sdk'
const { REACT_APP_DASHBOARD_SERVER_URL, REACT_APP_ZUPLO_API_KEY } = process.env

export default function getLinkByCode(
  linkCode: string,
  callback?: (linkCode: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<UserActions>
  ) => {
    dispatch(actionsDrop.setLoading(true))
    dispatch(actionsDrop.setError(null))
    const sdk = new LinkdropSDK({
      apiHost: REACT_APP_DASHBOARD_SERVER_URL,
      apiKey: REACT_APP_ZUPLO_API_KEY
    })
    dispatch(actionsUser.setSDK(sdk)) 
    const linkKey = ethers.utils.id(linkCode)
    const linkId = new ethers.Wallet(linkKey).address

    const data = await sdk.getLinkParams(linkCode)
    if (data) {
      const {
        creator_address,
        sponsored,
        chain_id,
        campaign_number,
        token_address,
        token_standard,
        token_id,
        token_amount,
        sender_signature,
        wei_amount,
        expiration_time,
        wallet,
        claiming_finished_description,
        claiming_finished_button_title, 
        claiming_finished_button_url,
        available_wallets
      } : TLinkParams = data

      dispatch(actionsDrop.setChainId(Number(chain_id)))
      dispatch(actionsDrop.setTokenAddress(token_address))
      dispatch(actionsDrop.setWallet(wallet as TWalletName))
      dispatch(actionsDrop.setIsManual(!Boolean(sponsored)))
      dispatch(actionsDrop.setExpirationTime(expiration_time))
      dispatch(actionsDrop.setLinkdropMasterAddress(creator_address))
      dispatch(actionsDrop.setLinkdropSignerSignature(sender_signature))
      dispatch(actionsDrop.setCampaignId(campaign_number))
      dispatch(actionsDrop.setWeiAmount(wei_amount))
      dispatch(actionsDrop.setAmount(token_amount))
      dispatch(actionsDrop.setTokenId(token_id))
      dispatch(actionsDrop.setType(token_standard as TDropType))
      dispatch(actionsDrop.setAmount(token_amount))
      dispatch(actionsDrop.setLoading(false))
      dispatch(actionsDrop.setClaimCode(linkCode))
      dispatch(actionsDrop.setLinkId(linkId))
      dispatch(actionsDrop.setAvailableWallets(available_wallets || []))
      dispatch(actionsDrop.setLinkKey(linkKey))
      if (claiming_finished_button_title && claiming_finished_button_url) {
        dispatch(actionsDrop.setClaimingFinishedButtonTitle(claiming_finished_button_title))
        dispatch(actionsDrop.setClaimingFinishedButtonURL(claiming_finished_button_url))
      }
      if (claiming_finished_description) {
        dispatch(actionsDrop.setClaimingFinishedDescription(claiming_finished_description))
      }
      callback && callback(linkCode)
  } 
}}