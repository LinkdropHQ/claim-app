import styled, { css } from "styled-components"
import { TokenImage } from 'components/common'

export const Subtitle = styled.h3`
  font-size: 14px;
  color: ${props => props.theme.primaryTextColor};
  font-weight: 500;
  margin: 0;
`

export const TokenImageContainer = styled(TokenImage)`
  margin-bottom: 16px;
`

export const Container = styled.div`
  margin: 0 auto 0 -20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% + 20px * 2);

  overflow: hidden;
`

export const TokenImageSlider = styled.div<{ sliderImage: number }>`
  display: flex;
  gap: 16px;
  position: relative;
  transition: right .3s;
  ${props => props.sliderImage === 1 && css`
    right: calc(-186px / 2 - 16px / 2);
  `}

  ${props => props.sliderImage === 2 && css`
    right: calc(186px / 2 + 16px / 2);
  `}
`