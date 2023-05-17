import { FC, useEffect, useState } from 'react'
import ErrorImageBlack from 'images/error-black.png'
import { IAppDispatch, RootState } from 'data/store'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { connect } from 'react-redux'
import {
  Container,
  Image,
  Title,
  Subtitle,
  IconContainer,
  LoadingTitle,
  ButtonStyled
} from './styled-components'
import { useParams, useHistory } from 'react-router-dom'
import Page from '../page'
import { QRNotMapped, QRNotFound, QRNoConnection, QRIncorrectParameter } from 'components/pages/common'
import Icons from 'icons'
import { alertError, defineSystem } from 'helpers'
import { useAccount, useConnect } from 'wagmi'

const mapStateToProps = ({
  user: { initialized },
  drop: { error, loading },
}: RootState) => ({ initialized, error, loading })

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getLink: (
      multiscanQRId: string,
      scanId: string,
      scanIdSig: string,
      multiscanQREncCode: string,
      address: string,
      callback: (location: string) => void
      ) => dispatch(
        dropAsyncActions.getLinkByMultiQR(
          multiscanQRId,
          scanId,
          scanIdSig,
          multiscanQREncCode,
          address,
          callback 
        )
      )
  }
}
type TParams = { multiscanQRId: string, scanId: string, scanIdSig: string, multiscanQREncCode: string }
type ReduxType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>

const Scan: FC<ReduxType> = ({ getLink, error, loading }) => {
  const { multiscanQRId, scanId, scanIdSig, multiscanQREncCode } = useParams<TParams>()
  const history = useHistory()
  const { address, isConnected } = useAccount()
  const [ isInjected, setIsInjected ] = useState<boolean>(false)
  const [ initialized, setInitialized ] = useState<boolean>(false)
  const system = defineSystem()

  const { connect, connectors } = useConnect()
  const injected = connectors.find(connector => connector.id === 'injected')
  

  useEffect(() => {
    const init = async () => {
      if(window &&
        window.ethereum &&
        window.ethereum.isCoinbaseWallet &&
        system !== 'desktop' && 
        injected &&
        injected.ready
      ) {
        connect({ connector: injected })
        console.log('DETECTED AS INJECTED')
        setIsInjected(true)
      } else {
        console.log('DETECTED AS NOT INJECTED')
        setIsInjected(false)
      }
      setInitialized(true)
    }
    init()
    
  }, [])

  useEffect(() => {
    if (!initialized || !address) {
      return
    }
    if (isInjected) {
      getLink(
        multiscanQRId,
        scanId,
        scanIdSig,
        multiscanQREncCode,
        address,
        (location) => {
          const path = location.split('/#')[1]
          console.log({ path })
          history.push(path)
        }
      )
    }
  }, [initialized, address])


  if (loading || !initialized) {
    return <Page>
      <Container>
        <IconContainer>
          <Icons.LinkdropIcon />
        </IconContainer>
        <LoadingTitle>Linkdrop</LoadingTitle>
      </Container>
    </Page>
  }

  if (error) {
    if (error === 'qr_not_mapped') {
      return <Page>
        <QRNotMapped />
      </Page>
    }

    if (error === 'qr_not_found') {
      return <Page>
        <QRNotFound />
      </Page>
    }

    if (error === 'qr_no_connection') {
      return <Page>
        <QRNoConnection />
      </Page>
    }

    if (error === 'qr_incorrect_parameter') {
      return <Page>
        <QRIncorrectParameter />
      </Page>
    }

    return <Page>
      <Container>
        <Image src={ErrorImageBlack} />
        <Title>Something went wrong</Title>
        <Subtitle>Please, try again later</Subtitle>
      </Container>
    </Page>
  }

  // if we are not on web3
  return <Page>
    <Container>
      <Title>Claim digital asset</Title>
      <Subtitle>To claim this asset, you will need to have Wallet set up and ready to use</Subtitle>
      <ButtonStyled 
        appearance='action'
        onClick={() => {
          connect({ connector: injected })
          setIsInjected(true)
        }}
      >
        Connect
      </ButtonStyled>
    </Container>
  </Page>
  
}

export default connect(mapStateToProps, mapDispatcherToProps)(Scan)
