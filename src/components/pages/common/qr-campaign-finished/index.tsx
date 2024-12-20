import { FC } from 'react'
import {
  Container,
  Image,
  Title
} from '../styles/styled-components'
import QRError from 'images/expired-error.png'

const ErrorScreen: FC = () => {
  return <Container>
    <Image src={QRError} />
    <Title>Campaign is finished</Title>
    {/* <Subtitle>Campaign will start at June 20, 2023 19:30:00 +UTC 00:00</Subtitle> */}
  </Container>
}

export default ErrorScreen