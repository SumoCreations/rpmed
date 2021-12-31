import { faSearch } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { transparentize } from 'polished'
import * as React from 'react'
import styled from '../styled-components'

export const SearchInput = styled.input`
  background: ${(p) => transparentize(0.2)(p.theme.colorBodyTextInverted)};
  display: flex;
  border: 2px solid ${(p) => p.theme.colorPrimary};
  border-radius: 1rem;
  font-size: 16px;
  padding: 18px 18px 18px 2.25rem;
  flex-grow: 1;
  width: auto;
  max-width: 18rem;
  margin: 0;
  outline: transparent;
  opacity: 0.85;
  transition: all 0.25s ease-in-out;
  width: 100%;

  &:focus {
    background: ${(p) => transparentize(0)(p.theme.colorBodyTextInverted)};
    opacity: 1;
    max-width: 100%;
  }
`

export const SearchView = styled.p`
  margin: 0;
  display: flex;
  flex-grow: 1;
  position: relative;
`

export const SearchIcon = styled.span`
  color: ${(p) => p.theme.colorPrimary};
  position: absolute;
  left: 0.5rem;
  top: 0;
  padding: 0.5rem;
  display: block;
  margin: 0;
  z-index: 1;
  pointer-events: none;
`

interface ISearchInputProps {
  placeholder: string
  onChange?: React.ChangeEventHandler
  value: string
}

export const Search: React.FC<ISearchInputProps> = ({
  placeholder,
  onChange,
  value,
}) => (
  <SearchView>
    <SearchIcon>
      <FontAwesomeIcon icon={faSearch} />
    </SearchIcon>
    <SearchInput
      type="search"
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  </SearchView>
)
