import { FC, useState, useEffect } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  TextComponent,
  WalletIcon,
  AdditionalAction,
  Link
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import ZerionLogo from 'images/zerion.png'
import AuthClient, { generateNonce } from "@walletconnect/auth-client"
import { useWeb3Modal } from "@web3modal/react"
import { defineSystem } from 'helpers'

const { REACT_APP_WC_PROJECT_ID } = process.env

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type }
}: RootState) => ({
  name, image, type, tokenId
})

type ReduxType = ReturnType<typeof mapStateToProps>

const defineUrlHref = () => {
  const system = defineSystem()
  switch (system) {
    case 'android':
      return 'https://play.google.com/store/apps/details?id=io.zerion.android&_branch_match_id=1131934258497997120&utm_source=zerion_homepage&utm_campaign=wallet_launch&utm_medium=homepage&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXz8nMy9arSi3KzM/Ty8zXTzE0zDfz9DPIKkwCAJ6OLGAiAAAA&pli=1'
    case 'ios':
      return 'https://apps.apple.com/ru/app/zerion-crypto-wallet-defi/id1456732565?l=en'
    default:
      return 'https://zerion.io/'
  }
}

const ChooseWallet: FC<ReduxType> = () => {
  const [ client, setClient ] = useState<AuthClient | null>();
  useEffect(() => {
    if (!client) { return }
    client
      .request({
        aud: window.location.href,
        domain: window.location.hostname.split(".").slice(-2).join("."),
        chainId: "eip155:1",
        nonce: generateNonce(),
      })
      .then(({ uri }) => {
        alert(`rainbow://wc?uri=${uri}`)
        window.location.href = `rainbow://wc?uri=${uri}`
      })
  }, [client])

  const { isOpen, open } = useWeb3Modal();

  

  return <Container> 
    <WalletIcon src={ZerionLogo} /> 
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      Claim NFT using your Zerion Wallet. <Link target="_blank" href={defineUrlHref()}>Download the app</Link> or use another wallet.
    </TextComponent>
    <ScreenButton onClick={async () => {
      const authClient = await AuthClient.init({
        projectId: REACT_APP_WC_PROJECT_ID as string,
        metadata: {
          name: "Linkdrop-Test",
          description: "A dapp using WalletConnect AuthClient",
          url: "https://jazzy-donut-086baa.netlify.app/",
          icons: ["https://jazzy-donut-086baa.netlify.app/zerion.png"],
        }
      })

      setClient(authClient)

      authClient.on("auth_response", (result) => {
        console.log({ result })
        clearTimeout('connected')
      })
    }}>
      Use Zerion
    </ScreenButton>
    <AdditionalAction onClick={() => {
      open()
    }}>
      Choose another wallet
    </AdditionalAction>
  </Container>
}

export default connect(mapStateToProps)(ChooseWallet)