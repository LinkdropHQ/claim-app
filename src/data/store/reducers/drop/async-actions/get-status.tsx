import LinkdropSDK from 'linkdrop-sdk'

export default async function getStatus(
  sdk: LinkdropSDK | null,
  claimCode: string | null
) {
  try {
    if (!sdk || !claimCode) {
      return null
    }
    const { status, txHash } = await sdk.getLinkStatus(claimCode)
    return {
      status, txHash
    }
  } catch (err) {
    // @ts-ignore
    // alert(Object.values(err).join(', '))
    return null
  }
}
