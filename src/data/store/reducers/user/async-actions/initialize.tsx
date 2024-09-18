import { Dispatch } from 'redux'
import * as actions from '../actions'
import { UserActions } from '../types'
import { RootState } from 'data/store'
import { ethers } from 'ethers'
import { DropActions } from '../../drop/types'
import {
  defineJSONRpcUrl,
} from 'helpers'

const { REACT_APP_INFURA_ID } = process.env

const initialize = (
  onReload: () => void,
  connector: any,
  signer: any,
  userChainId?: number,
  userAddress?: string
) => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<DropActions>,
    getState: () => RootState
  ) => {

    dispatch(actions.setInitialized(false))

    const {
      drop: {
        chainId: linkChainId,
        campaignId,
        linkdropMasterAddress,
        linkId,
        factoryAddress
      }
    } = getState()

    if (!campaignId) {
      return onReload && onReload() 
    }

    if (!REACT_APP_INFURA_ID) {
      return alert('REACT_APP_INFURA_ID is not provided in .env file')
    }

    if (!linkChainId) {
      return alert('chainId of link is not provided in store')
    }

    if (!linkId) {
      return alert('linkId of link is not provided in store')
    }

    if (!linkdropMasterAddress) {
      return alert('linkdropMasterAddress of link is not provided in store')
    }

    if (!campaignId) {
      return alert('campaignId of link is not provided in store')
    }

    const jsonRpcUrl = defineJSONRpcUrl({ chainId: Number(linkChainId), infuraPk: REACT_APP_INFURA_ID })
    const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl)
    dispatch(actions.setProvider(provider))

    if (!userChainId || !userAddress || !connector) {
      dispatch(actions.setHasConnector(false))
    } else {
      dispatch(actions.setHasConnector(true))
      dispatch(actions.setAddress(userAddress))
      dispatch(actions.setChainId(userChainId))
      if (connector.getProvider) {
        const provider = await connector.getProvider()
        dispatch(actions.setUserProvider(provider))
      }
      
      dispatch(actions.setSigner(signer))
    }

    dispatch(actions.setInitialized(true))
  }
}

export default initialize