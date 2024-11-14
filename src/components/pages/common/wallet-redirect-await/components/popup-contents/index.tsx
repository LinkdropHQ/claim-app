import { FC } from 'react'
// import {
//   OverlayParagraph,
//   OverlaySubtitle
// } from 'linkdrop-ui'
import { ListItemContent, OrderedList, OrderedListItem } from './styled-components'
import { Button } from 'components/common'
import { copyToClipboard } from 'helpers'

const PopupContents: FC = () => {
  return <>
    {/* <OverlaySubtitle>Install and set up the wallet</OverlaySubtitle>
    <OverlayParagraph>
      To claim an NFT you need to download the wallet, and set it up, following the instructions inside the wallet app. 
    </OverlayParagraph>
    <OverlaySubtitle>“Open in...” button doesn’t work</OverlaySubtitle>
    <OverlayParagraph>
      Sometimes deep links do not work on particular devices. If that happens, please:
    </OverlayParagraph>
    <OrderedList>
      <OrderedListItem>
        <ListItemContent>
          Copy the claim link
          <Button
            appearance='additional'
            size='extra-small'
            onClick={() => {
              copyToClipboard({ value: window.location.href })
            }}
          >Copy</Button>
        </ListItemContent>
      </OrderedListItem>
      <OrderedListItem>Open the dApp browser in your wallet app</OrderedListItem>
      <OrderedListItem>Paste the link in the dApp browser and load the page to proceed</OrderedListItem>
    </OrderedList> */}
  </>
}

export default PopupContents