type TDefineApiHeaders = (
  apiKey: string,
) => Record<string, string>

const defineApiHeaders: TDefineApiHeaders = (
  apiKey
) => {
  const headers: Record<string, string> = {}

  if (apiKey) {
    headers['authorization'] = `Bearer ${apiKey}`
  }

  return headers
}

export default defineApiHeaders