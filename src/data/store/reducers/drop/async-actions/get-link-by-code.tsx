
import { Dispatch } from 'redux';
import { DropActions } from '../types'
import { UserActions } from '../../user/types'
import { ethers } from 'ethers'
import * as actionsDrop from '../actions'
import * as actionsUser from '../../user/actions'
import {
  TLinkParams,
  TDropType,
  TWalletName
} from 'types'
import LinkdropBatchSDK from 'linkdrop-batch-sdk'
import * as actionsToken from '../../token/actions'
import { TokenActions } from '../../token/types'

const {
  REACT_APP_DASHBOARD_SERVER_URL,
  REACT_APP_ZUPLO_API_KEY
} = process.env

export default function getLinkByCode(
  linkCode: string,
  linkAddress?: string | null,
  autoclaim?: boolean | null,
  callback?: (linkCode: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<UserActions> & Dispatch<TokenActions>
  ) => {
    dispatch(actionsDrop.setLoading(true))
    dispatch(actionsDrop.setError(null))
    const sdk = new LinkdropBatchSDK({
      apiHost: REACT_APP_DASHBOARD_SERVER_URL,
      apiKey: REACT_APP_ZUPLO_API_KEY as string
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
        claiming_finished_button_on,
        claiming_finished_auto_redirect,
        preferred_wallet_on,
        linkdrop_token,
        token_image,
        token_name,
        additional_wallets_on,
        factory_address,
        is_redirect,
        redirect_link
      } : TLinkParams = data

      if (is_redirect && redirect_link) {
        if (window.location.href === redirect_link) {
          return 
        }

        window.open(redirect_link, '_blank')
        return
      }


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
      dispatch(actionsDrop.setFactoryAddress(factory_address))

      dispatch(actionsDrop.setAdditionalWalletsOn(additional_wallets_on))

      dispatch(actionsDrop.setClaimCode(linkCode))
      dispatch(actionsDrop.setLinkId(linkId))
      dispatch(actionsDrop.setLinkKey(linkKey))
      dispatch(actionsDrop.setPreferredWalletOn(Boolean(preferred_wallet_on)))

      if (linkdrop_token) {
        dispatch(actionsToken.setImage(token_image))
        dispatch(actionsToken.setName(token_name))
        dispatch(actionsToken.setLinkdropToken(linkdrop_token))
      }

      if (
        claiming_finished_button_title &&
        claiming_finished_button_url &&
        claiming_finished_button_on
      ) {
        dispatch(actionsDrop.setClaimingFinishedButtonTitle(claiming_finished_button_title))
        dispatch(actionsDrop.setClaimingFinishedButtonURL(claiming_finished_button_url))
        dispatch(actionsDrop.setClaimingFinishedAutoRedirect(claiming_finished_auto_redirect))
      }

      
      if (claiming_finished_description) {
        dispatch(actionsDrop.setClaimingFinishedDescription(claiming_finished_description))
      }

      if (linkAddress) {
        dispatch(actionsUser.setAddress(linkAddress))
      }

      if (autoclaim) {
        dispatch(actionsDrop.setAutoclaim(autoclaim))
      }

      callback && callback(linkCode)
  } 
}}