type TDefineTitle = (tokenId: string | null) => string

const defineTitle: TDefineTitle = (tokenId) => {
  if (tokenId === '2') return 'RTFKT x LEDGER Chalk Blade Edition 🔒'
  if (tokenId === '1') return 'LEDGER x RTFKT Collector Edition'
  return ''
}

export default defineTitle
