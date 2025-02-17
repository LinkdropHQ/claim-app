import { FC, useEffect } from 'react'
import {
  UserAddress
} from './styled-components'
import { Loader } from 'components/common'
import {
  Container,
  Image,
  Title,
  Subtitle,
  ButtonStyled
} from '../styles/styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { alertError, shortenString } from 'helpers'
import { useHistory } from 'react-router-dom'
import EligibleToClaimImage from 'images/eligible-to-claim.png'
import { TProps } from './types'

const mapStateToProps = ({
  drop: {
    type,
    multiscanLinkDecrypted
  },
  user: {
    address
  }
}: RootState) => ({
  type,
  address,
  multiscanLinkDecrypted
})

type ReduxType = ReturnType<typeof mapStateToProps> & TProps

const EligibleToClaim: FC<ReduxType> = ({
  address,
  multiscanLinkDecrypted
}) => {
  const history = useHistory()
  useEffect(() => {
    if (!multiscanLinkDecrypted) {
      return alertError('Link is not available')
    }
    history.push(multiscanLinkDecrypted.split('#')[1])
  }, [])
  return <Container>
    <Loader />
    {/* <Image src={EligibleToClaimImage}/>
    <Title>You are eligible to claim</Title>
    <Subtitle>All great, <UserAddress>{shortenString(address)}</UserAddress> is eligible to claim a digital asset</Subtitle>
    <ButtonStyled
      onClick={() => {
        if (!multiscanLinkDecrypted) {
          return alertError('Link is not available')
        }
        history.push(multiscanLinkDecrypted.split('#')[1])
      }}
      appearance='action'
    >
      Proceed
    </ButtonStyled> */}
  </Container>
}

export default connect(mapStateToProps)(EligibleToClaim)