type TDefineDescription = (tokenId: string) => string

const defineDescription: TDefineDescription = (tokenId) => {
  if (tokenId === '1') return 'Get your 2 exclusive digital collectibles and claim ownership of your RTFKT x LEDGER Collector Edition.'
  if (tokenId === '2') return 'Get your exclusive digital collectible and claim ownership of your RTFKT x LEDGER NANO X Chalk Blade Edition.'
  return ''
}

export default defineDescription
