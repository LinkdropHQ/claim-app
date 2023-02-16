import { FC } from 'react'
import { Image, Title, Subtitle } from './styled-components'
import SmileBlack from 'images/smile-black.png'

const ErrorComponent: FC = () => {
  const errorImage = SmileBlack
  return <>
    <Image src={errorImage} />
    <Title>NFT already claimed</Title>
    <Subtitle>Please check your wallet</Subtitle>
  </>
}

export default ErrorComponent