import { FC } from 'react'
import { Image, Title } from './styled-components'
import ErrorImageBlack from 'images/error-black.png'

const ErrorComponent: FC = () => {
  const errorImage = ErrorImageBlack
  return <>
    <Image src={errorImage} />
    <Title>Link has expired</Title>
  </>
}

export default ErrorComponent