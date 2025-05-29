import { FC, useEffect } from 'react'
import ErrorImageBlack from 'images/error-black.png'
import { IAppDispatch, RootState } from 'data/store'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { connect } from 'react-redux'
import {
  Container,
  Image,
  Title,
  Subtitle
} from './styled-components'
import { Loader } from 'components/common'
import { useParams, useHistory } from 'react-router-dom'
import Page from '../page'
import {
  QRNotMapped,
  QRNotFound,
  QRNoConnection,
  QRIncorrectParameter
} from 'components/pages/common'
import { alertError } from 'helpers'

const mapStateToProps = ({
  user: { initialized },
  drop: { error }
}: RootState) => ({ initialized, error })

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getLink: (
        qrId: string, callback: (location: string) => void
      ) => dispatch(
        dropAsyncActions.getLinkByQR(
          qrId, callback 
        )
      )
  }
}

type ReduxType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>

const QR: FC<ReduxType> = ({ getLink, initialized, error }) => {
  const { qrId } = useParams<{ qrId: string }>()
  const history = useHistory()

  useEffect(() => {
    if (!qrId) { return alertError('QR_ID is not found in URL') }
    getLink(qrId, (location) => {
      // const claimLinkURL = new URL(location)
      // if (claimLinkURL.host === window.location.host) {
      // SSR

      if (location.includes('#')) {
        const path = location.split('/#')[1]
        history.push(path)
      } else {
        window.location.href = location
      }
    })
  }, [])

  if (!error) {
    return <Page>
      <Container>
        <Loader size='large' />
      </Container>
    </Page>
  }

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
      {/* <ButtonStyled onClick={() => {}}>Retry</ButtonStyled> */}
    </Container>
  </Page>
}

export default connect(mapStateToProps, mapDispatcherToProps)(QR)
