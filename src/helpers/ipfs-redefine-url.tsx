const ipfsGatewayUrl = 'https://gateway.pinata.cloud/ipfs'
const ipfsPinataGatewayUrl = 'https://gateway.pinata.cloud/ipfs'

const addTokenIdToIPFS = (url: string, tokenId?: string) => {
  if (url.indexOf('{id}') > -1) {
    if (tokenId !== undefined) {
      return url
        .replace('0x{id}', tokenId)
        .replace('{id}', tokenId)
        .replace(ipfsPinataGatewayUrl, ipfsGatewayUrl)
    }
    return url.replace(ipfsPinataGatewayUrl, ipfsGatewayUrl)
  } else {
    return url.replace(ipfsPinataGatewayUrl, ipfsGatewayUrl)
  }
}

const redefineURL = (url: string, tokenId?: string) => {
  if (url.startsWith('ipfs://')) {
    const urlUpdated = `${ipfsGatewayUrl}/${url.replaceAll('ipfs://', '').replaceAll('ipfs/', '')}`
    return addTokenIdToIPFS(urlUpdated, tokenId)
  } else {
    return addTokenIdToIPFS(url, tokenId)
  }
}

export default redefineURL