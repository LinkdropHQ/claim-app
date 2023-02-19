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
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import ZerionLogo from 'images/zerion.png'
import AuthClient, { generateNonce } from "@walletconnect/auth-client"
import { useWeb3Modal } from "@web3modal/react"
import { defineSystem, getHashVariables } from 'helpers'
import { Dispatch } from 'redux';
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { DropActions } from 'data/store/reducers/drop/types'
import { TokenActions } from 'data/store/reducers/token/types'

const { REACT_APP_WC_PROJECT_ID } = process.env


const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & IAppDispatch) => {
  return {
      getData: (
        address?: string,
        chainId?: number
      ) => dispatch(dropAsyncActions.getInitialData(
        address,
        chainId
      )),
  }
}

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type }
}: RootState) => ({
  name, image, type, tokenId
})

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

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

const ChooseWallet: FC<ReduxType> = ({
  getData
}) => {
  const { chainId } = getHashVariables()
  const system = defineSystem()
  const [ client, setClient ] = useState<AuthClient | null>()
  useEffect(() => {
    if (!client) { return }
    client
      .request({
        aud: window.location.href,
        domain: window.location.hostname.split(".").slice(-2).join("."),
        chainId: `eip155:${chainId}`,
        nonce: generateNonce(),
        statement: "Sign in with Zerion Wallet"
      })
      .then(({ uri }) => {
        if (!uri) { return }
        const href = system === 'desktop' ? `https://wallet.zerion.io/wc?uri=${encodeURIComponent(uri)}` :  `zerion://wc?uri=${encodeURIComponent(uri)}`
        window.location.href =href
      })
  }, [client])

  const { isOpen, open } = useWeb3Modal()

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
          url: window.location.host,
          icons: ["https://jazzy-donut-086baa.netlify.app/zerion.png"],
        }
      })

      setClient(authClient)
      authClient.on("auth_response", ({ params }) => {
        // @ts-ignore
        if (Boolean(params && params.result && params.result.p)) {
          // @ts-ignore
          const { iss } = params.result.p
          const walletData = iss.split(":")
          const walletAddress = walletData[4]
          const walletChainId = walletData[3]
          getData(
            walletAddress,
            walletChainId
          )
        } else {
          // @ts-ignore
          console.error(params.message)
        }

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

export default connect(mapStateToProps, mapDispatcherToProps)(ChooseWallet)