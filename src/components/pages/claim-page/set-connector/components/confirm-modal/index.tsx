import { FC, useState } from 'react'
import { TProps } from './types'
import {
  Container,
  Header,
  Paragraph,
  BackArrow,
  Title,
  CheckboxStyled,
  Content,
  Body,
  CheckboxContainer,
  ButtonStyled,
  LinkStyled
} from './styled-components'
import Icons from 'icons'


const ConfirmModal: FC<TProps> = ({
  onConfirm,
  visible,
  onClose
}) => {
  const [ platformTerms, setPlatformTerms ] = useState(false)
  const [ marketingPolicy, setMarketingPolicy ] = useState(false)
  const [ digitalCollectibleTerms , setDigitalCollectibleTerms ] = useState(false)
  const [ sanctionsPolicy , setSanctionsPolicy ] = useState(false)

  return <Container visible={visible}>
    <Body>
      <Header>
        <BackArrow onClick={() => {
          onClose()
        }}>
          <Icons.ArrowLeftIcon />
        </BackArrow>
        <Title>
          Before you claim
        </Title>
      </Header>
      <Content>
        <Paragraph>I have read and agree:</Paragraph>
        <CheckboxContainer>
          <CheckboxStyled
            value={platformTerms}
            onChange={() => setPlatformTerms(!platformTerms)}
          />
          RTFKT Platform <LinkStyled href="https://google.com">Terms of Services</LinkStyled>
        </CheckboxContainer>

        <CheckboxContainer>
          <CheckboxStyled
            value={marketingPolicy}
            onChange={() => setMarketingPolicy(!marketingPolicy)}
          />
          RTFKT <LinkStyled href="https://google.com">Marketing Policy</LinkStyled>
        </CheckboxContainer>

        <CheckboxContainer>
          <CheckboxStyled
            value={digitalCollectibleTerms}
            onChange={() => setDigitalCollectibleTerms(!digitalCollectibleTerms)}
          />
          RTFKT <LinkStyled href="https://google.com">Digital Collectible Terms</LinkStyled>
        </CheckboxContainer>

        <CheckboxContainer>
          <CheckboxStyled
            value={sanctionsPolicy}
            onChange={() => setSanctionsPolicy(!sanctionsPolicy)}
          />
          I confirm I am not subject to sanctions under the OFAC, UN, EU, UK or other applicable authorities. Failure to comply will void transaction and forfeit any refund
        </CheckboxContainer>
        
      </Content>
      <ButtonStyled
        appearance='action'
        onClick={() => onConfirm(true)}
        disabled={
          !platformTerms || !sanctionsPolicy || !marketingPolicy || !digitalCollectibleTerms
        }
      >
        Accept and proceed
      </ButtonStyled>
    </Body>
    
  </Container>
}

export default ConfirmModal