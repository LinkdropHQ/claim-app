import { FC } from 'react'
import {
  ScreenLoaderContainer,
  LoaderStyled,
  ScreenTitle,
  ButtonStyled
} from './styled-components'
import { TProps } from './types'

const ScreenLoader: FC<TProps> = ({
  onClose
}) => {
  return <ScreenLoaderContainer>
    <LoaderStyled />
    <ScreenTitle>
      Waiting for the wallet to connect...
    </ScreenTitle>
    <ButtonStyled onClick={onClose}>
      Go back
    </ButtonStyled>
  </ScreenLoaderContainer>
}

export default ScreenLoader