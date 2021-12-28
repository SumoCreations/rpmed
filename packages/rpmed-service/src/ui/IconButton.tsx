import React from 'react'
import { IconDefinition } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from './styled-components'

export const ClearButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  color: ${(p: any) => p.theme.colorPrimary};
  font-size: 1.25rem;
`

export interface IconButtonProps {
  icon: IconDefinition
  onClick?: () => void
  disabled?: boolean
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  disabled,
}) => {
  const handleClick: React.MouseEventHandler = e => {
    e.preventDefault()
    if (onClick) {
      onClick()
    }
  }
  return (
    <ClearButton disabled={disabled} onClick={handleClick}>
      <FontAwesomeIcon icon={icon} />
    </ClearButton>
  )
}
