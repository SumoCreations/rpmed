import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import styled from '../styled-components'

export enum IconLocation {
  End,
  Start,
}

const FieldIcon = styled.span<{ location: IconLocation; active?: boolean }>`
  color: ${(p: any) =>
    p.active ? p.theme.colorButtonPrimary : p.theme.colorBodyText};
  position: absolute;
  align-content: center;
  margin: auto 16px;
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  height: 100%;
  width: auto;
  right: 0;
  opacity: ${(p: any) => (p.active ? 1 : 0.5)};
  pointer-events: none;

  & > * {
    display: block;
    margin: auto;
  }
`

export const Icon: React.FC<{
  icon: IconDefinition
  location?: IconLocation
  active?: boolean
}> = ({ icon, location, active }) => (
  <FieldIcon location={location || IconLocation.End} active={active}>
    <FontAwesomeIcon icon={icon} />
  </FieldIcon>
)
