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
  const [ privacyPolicy, setPrivacyPolicy ] = useState(false)

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
        <CheckboxContainer>
          <CheckboxStyled
            value={platformTerms}
            onChange={() => setPlatformTerms(!platformTerms)}
          />
          <span>I agree to the <LinkStyled target='_blank' href="https://rtfkt.com/legal-2D">RTFKT Digital Collectible terms</LinkStyled></span>
        </CheckboxContainer>

        <CheckboxContainer>
          <CheckboxStyled
            value={marketingPolicy}
            onChange={() => setMarketingPolicy(!marketingPolicy)}
          />
          <span>I agree to the <LinkStyled target='_blank' href="https://rtfkt.com/tos">RTFKT Platform Terms of Services</LinkStyled> and RTFKT Marketing Policy</span>
        </CheckboxContainer>

        <CheckboxContainer>
          <CheckboxStyled
            value={digitalCollectibleTerms}
            onChange={() => setDigitalCollectibleTerms(!digitalCollectibleTerms)}
          />
          <span>I agree to the <LinkStyled target='_blank' href="https://rtfkt.com/legal-overview#licenses-owned">Digital Collectible Terms</LinkStyled> applicable to each RTFKT NFT I own</span>
        </CheckboxContainer>


        <CheckboxContainer>
          <CheckboxStyled
            value={privacyPolicy}
            onChange={() => setPrivacyPolicy(!privacyPolicy)}
          />
          <span>I acknowledge the <LinkStyled target='_blank' href="https://rtfkt.com/privacy">RTFKT Privacy Policy.</LinkStyled></span>
        </CheckboxContainer>
        

        <CheckboxContainer>
          <CheckboxStyled
            value={sanctionsPolicy}
            onChange={() => setSanctionsPolicy(!sanctionsPolicy)}
          />
            <span>I confirm I am not subject to sanctions under the OFAC, UN, EU, UK or other  applicable authorities. Failure to comply will void transaction and forfeit any refund</span>
        </CheckboxContainer>
        
      </Content>
      <ButtonStyled
        appearance='action'
        onClick={() => onConfirm(true)}
        disabled={
          !platformTerms ||
          !sanctionsPolicy ||
          !marketingPolicy ||
          !digitalCollectibleTerms ||
          !privacyPolicy
        }
      >
        Accept and proceed
      </ButtonStyled>
    </Body>
    
  </Container>
}

export default ConfirmModal