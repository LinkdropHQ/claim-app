import { FC } from 'react'
import { Title, Subtitle } from 'components/pages/common/styles/styled-components'

const ErrorComponent: FC = ({
}) => {
  return <>
    <Title>Seems you're offline</Title>
    <Subtitle>Please, try again</Subtitle>
  </>
}

export default ErrorComponent