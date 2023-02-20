import { ERC1155Contract } from 'abi'
import { getERC1155TokenData } from 'data/api'
import { ethers } from 'ethers'
import { IPFSRedefineUrl } from 'helpers'
import { getValidImage } from 'helpers'
import nftPlaceholder from 'images/nft-placeholder.png'
import Token1Video from 'videos/1.mp4'
import Token2Video from 'videos/2.mp4'
import Token3Video from 'videos/3.mp4'
import Token4Video from 'videos/4.mp4'

type TTokenERC1155Data = { name: string, image: string, description: string }
type TGetTokenERC1155Data = (provider: any, tokenAddress: string, tokenId: string) => Promise<TTokenERC1155Data>

const getTokenData: TGetTokenERC1155Data = async (provider, tokenAddress, tokenId ) => {
  try {
    const contractInstance = await new ethers.Contract(tokenAddress, ERC1155Contract, provider)
    
    let actualUrl = await contractInstance.uri(tokenId)
    actualUrl = IPFSRedefineUrl(actualUrl, tokenId)
    const tokenData = await getERC1155TokenData(actualUrl, tokenId)
    // const image = await getValidImage(tokenData.data.animation_url || tokenData.data.image)
    return {
      ...tokenData.data,
      image: tokenId === '1' ? Token1Video : tokenId === '2' ? Token2Video : tokenId === '3' ? Token3Video : Token4Video
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