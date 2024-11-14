import React, { FC } from 'react'
import { InputContainer, InputField, InputTitle, InputAdditionalText } from './styled-components'
import { IProps } from './types'

const InputComponent: FC<IProps> = ({
  placeholder,
  title,
  disabled = false,
  type = 'text',
  onChange,
  error,
  name,
  value = '',
  className,
  refProp,
  note,
  onClick,
}) => {
  return (
    <InputContainer disabled={disabled} error={error} className={className} onClick={onClick}>
      {title && <InputTitle error={error}>{title}</InputTitle>}
      <InputField
        ref={refProp}
        name={name}
        onChange={(evt) => onChange(evt.target.value)}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        error={error}
      />
      {error && (
        <InputAdditionalText type='error'>
          {error}
        </InputAdditionalText>
      )}
      {note && (
        <InputAdditionalText type='note'>
          {note}
        </InputAdditionalText>
      )}
    </InputContainer>
  )
}

export default InputComponent
