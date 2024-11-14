import React, { FC } from 'react'
import {
  OptionsListContainer,
  OptionsListItem,
  OptionTag,
  OptionImage,
  OptionsListItemLink
} from './styled-components'
import { TProps } from './types'
import { TOption } from './types'

const OptionsList: FC<TProps> = ({ options, className }) => {
  return (
    <OptionsListContainer className={className}>
      {options.map((option: TOption | undefined) => {
        if (!option) {
          return null
        }
        const { title, icon, onClick, recommended, tag, href } = option
        if (href) {
          return (
            <OptionsListItemLink href={href} target='_self' key={title}>
              {icon && <OptionImage>{icon}</OptionImage>}
              {title}
              {recommended && !tag && <OptionTag>Recommended</OptionTag>}
              {tag && <OptionTag>{tag}</OptionTag>}
            </OptionsListItemLink>
          )
        }
        return (
          <OptionsListItem onClick={onClick} key={title}>
            {icon && <OptionImage>{icon}</OptionImage>}
            {title}
            {recommended && !tag && <OptionTag>Recommended</OptionTag>}
            {tag && <OptionTag>{tag}</OptionTag>}
          </OptionsListItem>
        )
      })}
    </OptionsListContainer>
  )
}

export default OptionsList
