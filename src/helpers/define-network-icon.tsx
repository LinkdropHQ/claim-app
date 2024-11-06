import BaseNetworkIcon from 'images/base-network-icon.png'
import PolygonNetworkIcon from 'images/polygon-network-icon.png'
import MainnetNetworkIcon from 'images/mainnet-network-icon.png'
import XLayerNetworkIcon from 'images/xlayer-network-icon.png'

const defineNetworkIcon = (chainId: number) => {
  switch (chainId) {
    case 1:
      return MainnetNetworkIcon
    case 137:
      return PolygonNetworkIcon
    case 8453:
      return BaseNetworkIcon
    case 196:
      return XLayerNetworkIcon
    case 543210:
      return MainnetNetworkIcon
    default:
      return MainnetNetworkIcon
  }
}

export default defineNetworkIcon
