const ipfsPinataGatewayUrl = 'https://gateway.pinata.cloud/ipfs'

const addTokenIdToIPFS = (url: string, tokenId?: string) => {
  if (url.indexOf('{id}') > -1) {
    if (tokenId !== undefined) {
      return url
        .replace('0x{id}', tokenId)
        .replace('{id}', tokenId)
    }
    return url
  } else {
    return url
  }
}

const redefineURL = (url: string, tokenId?: string) => {
  if (url.startsWith('ipfs://')) {
    const urlUpdated = `${ipfsPinataGatewayUrl}/${url.replaceAll('ipfs://', '').replaceAll('ipfs/', '')}`
    return addTokenIdToIPFS(urlUpdated, tokenId)
  } else {
    return addTokenIdToIPFS(url, tokenId)
  }
}

export default redefineURL
