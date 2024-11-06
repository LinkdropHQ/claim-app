type TGasLimits = {
  [chainId: number]: string
}

const gasPriceLimits: TGasLimits = {
  137: '2012406786686', // 212406786686
  1: '2012406786686',
  13371: '2012406786686',
  8453: '2012406786686',
  196: '2012406786686',
  543210: '2012406786686'
}

export default gasPriceLimits