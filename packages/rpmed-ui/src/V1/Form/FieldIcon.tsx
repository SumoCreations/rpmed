import { IconName } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import styled from '../styled-components'

const FieldIcon = styled.span`
  color: ${p => p.theme.colorBodyText};
  position: absolute;
  align-content: center;
  margin: auto 16px;
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  height: 100%;
  width: auto;
  right: 0;
  opacity: 0.5;

  & > * {
    display: block;
    margin: auto;
  }
`

const Icon: React.FC<{ icon: IconName }> = ({ icon }) => (
  <FieldIcon>
    <FontAwesomeIcon icon={icon} />
  </FieldIcon>
)

export default Icon
