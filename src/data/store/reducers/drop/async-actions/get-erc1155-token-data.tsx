import { ERC1155Contract } from 'abi'
import { getERC1155TokenData } from 'data/api'
import { ethers } from 'ethers'
import { IPFSRedefineUrl } from 'helpers'
import nftPlaceholder from 'images/nft-placeholder.png'
import NewYorkVideo from 'videos/2-1.mp4'
import TokyoVideo from 'videos/2-2.mp4'
import Token1Video from 'videos/1.mp4'
import Token2Video from 'videos/2.mp4'
import Token3Video from 'videos/3.mp4'
import Token4Video from 'videos/4.mp4'


type TTokenERC1155Data = { name: string, image: string, description: string }
type TGetTokenERC1155Data = (provider: any, tokenAddress: string, tokenId: string) => Promise<TTokenERC1155Data>

const definePreview = (
  tokenAddress: string,
  tokenId: string
) => {
  if (tokenAddress.toLowerCase() === '0x74ee68a33f6c9f113e22b3b77418b75f85d07d22') {
    return NewYorkVideo
  }
  if (tokenAddress.toLowerCase() === '0x215f2d92d843afafc475b5f7f34c8685eadb4c91') {
    return TokyoVideo
  }
  if (tokenAddress.toLowerCase() === '0xe0a754632ac6c770b8da814d111249fc0e86746d'){
    if (tokenId === '1') {
      return Token1Video
    }
    if (tokenId === '2') {
      return Token2Video
    }
    if (tokenId === '3') {
      return Token3Video
    }
    if (tokenId === '4') {
      return Token4Video
    }
  }
  return NewYorkVideo
}

const getTokenData: TGetTokenERC1155Data = async (provider, tokenAddress, tokenId ) => {
  try {
    const contractInstance = await new ethers.Contract(tokenAddress, ERC1155Contract, provider)
    let actualUrl = await contractInstance.uri(tokenId)
    actualUrl = IPFSRedefineUrl(actualUrl, tokenId)
    const tokenData = await getERC1155TokenData(actualUrl, tokenId)
    // const image = await getValidImage(tokenData.data.animation_url || tokenData.data.image)

    const image = definePreview(tokenAddress, tokenId)

    return {
      ...tokenData.data,
      image
    }
  } catch (e) {
    // @ts-ignore
    // alert(Object.keys(e.transaction).join(', '))
    return { name: 'ERC1155', image: nftPlaceholder, description: '' }
  }
}



export default getTokenData

// reason, code, method, errorArgs, errorName, errorSignature, address, args, transaction
// , CALL_EXCEPTION, uri(uint256), , , , 0x2953399124f0cbb46d2cbacd8a89cf0599974963, 28595719149218027861343590373982745974520347035085815493722140652219679123216, [object Object]