import { ERC1155Contract } from 'abi'
import { getERC1155TokenData } from 'data/api'
import { ethers } from 'ethers'
import { getValidImage, getAlchemyTokenImage, createAlchemyInstance, IPFSRedefineUrl } from 'helpers'
import tokenPlaceholder from 'images/token-placeholder.png'

type TTokenERC1155Data = { name: string, image: string, description: string }
type TGetTokenERC1155Data = (provider: any, tokenAddress: string, tokenId: string, chainId: number | null) => Promise<TTokenERC1155Data>

const getTokenData: TGetTokenERC1155Data = async (provider, tokenAddress, tokenId, chainId) => {
  try {
    const alchemy = createAlchemyInstance(chainId)
    if (!alchemy) {
      throw new Error('No Alchemy instance is created')
    }
    const tokenData = await alchemy.nft.getNftMetadata(tokenAddress, tokenId)
    console.log({ tokenData })
    const image = await getAlchemyTokenImage(tokenData)
    console.log({ image })
    return { name: tokenData.title || 'ERC1155 Token', image, description: tokenData.description }
  } catch (err) {
    try {
      const contractInstance = await new ethers.Contract(tokenAddress, ERC1155Contract, provider)
      let actualUrl = await contractInstance.uri(tokenId)
      
      actualUrl = IPFSRedefineUrl(actualUrl, tokenId)
      const tokenData = await getERC1155TokenData(actualUrl, tokenId)
      const image = await getValidImage(tokenData.data.animation_url || tokenData.data.image)
      return {
        ...tokenData.data,
        image
      }
    } catch (e) {
      // @ts-ignore
      // alert(Object.keys(e.transaction).join(', '))
      console.log({ e })
      return { name: 'ERC1155 Token', image: tokenPlaceholder, description: '' }
    }
  }
}



export default getTokenData

// reason, code, method, errorArgs, errorName, errorSignature, address, args, transaction
// , CALL_EXCEPTION, uri(uint256), , , , 0x2953399124f0cbb46d2cbacd8a89cf0599974963, 28595719149218027861343590373982745974520347035085815493722140652219679123216, [object Object]