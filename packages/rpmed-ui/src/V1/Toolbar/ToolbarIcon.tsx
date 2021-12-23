import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import styled from '../styled-components'

const IconView = styled.span`
  color: ${p => p.theme.colorBodyText};
  align-content: center;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  height: 100%;
  width: auto;

  & > * {
    display: block;
    margin: auto;
  }
`

export const Icon: React.FC<{ icon: IconDefinition }> = ({ icon }) => (
  <IconView>
    <FontAwesomeIcon icon={icon} />
  </IconView>
)
