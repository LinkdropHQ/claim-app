import { Network } from 'alchemy-sdk'

type TDefineAlchemyNetwork = (
  chainId: number | null
) => Network | void

const defineAlchemyNetwork: TDefineAlchemyNetwork = (
  chainId
) => {
  if (!chainId) {
    return
  }
  
  switch (chainId) {
    case 1:
      return Network.ETH_MAINNET
    case 5:
      return Network.ETH_GOERLI
    case 137:
      return Network.MATIC_MAINNET
    default:
      return Network.MATIC_MUMBAI
  }
}

export default defineAlchemyNetwork