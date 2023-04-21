import { IMetamaskError } from 'types'
import {
  toHex,
} from 'helpers'
import chains from 'configs/chains'
import { plausibleApi } from 'data/api'

async function switchNetwork (
	provider: any,
  chainId: number,
  campaignId: string,
  callback: () => void
) {
  console.log({ chainId: toHex(chainId) })
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: toHex(chainId) }],
    })

    plausibleApi.invokeEvent({
      eventName: 'netw_switch',
      data: {
        campaignId: campaignId,
      }
    })

    callback && callback()
  } catch (err) {
      const switchError = err as IMetamaskError
      // if (switchError.code && (switchError.code === 4902 || switchError.code === -32603)) { // 4902 for regular cases, -32603 for metamask
        try {
          const chainObj = chains[chainId]
          if (chainObj) {
            const data = {
              chainName: chainObj.chainName,
              nativeCurrency: chainObj.nativeCurrency,
              rpcUrls: chainObj.rpcUrls,
              blockExplorerUrls: chainObj.blockExplorerUrls,
              chainId: toHex(chainId)
            }

            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [data],
            })

            plausibleApi.invokeEvent({
              eventName: 'netw_add',
              data: {
                campaignId: campaignId,
              }
            })

            callback && callback()
          }
        } catch (addError) {
          alert('Application cannot switch network')
          console.error({
            addError
          })
        }
      // }    
  }
}

export default switchNetwork