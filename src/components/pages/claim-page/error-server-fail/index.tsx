import { FC } from 'react'
import { Image, Title, Subtitle, ButtonStyled } from './styled-components'
import ErrorImageBlack from 'images/error-black.png'

const ErrorComponent: FC = () => {
  const errorImage = ErrorImageBlack
  return <>
    <Image src={errorImage} />
    <Title>Claim server error</Title>
    <Subtitle>Please, try again</Subtitle>
    <ButtonStyled onClick={() => window.location.reload()}>Retry</ButtonStyled>
  </>
}

export default ErrorComponent