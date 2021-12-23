import { faAsterisk } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import styled from '../styled-components'

const RequiredFormat = styled.span`
  color: ${p => p.theme.colorPrimary};
  font-size: 12px;
  margin: auto 4px;
  display: flex;
  flex-grow: 0;

  & > * {
    margin: auto;
  }
`

const RequiredIcon: React.FC<{}> = () => (
  <RequiredFormat>
    <FontAwesomeIcon icon={faAsterisk} size="xs" />
  </RequiredFormat>
)

export default RequiredIcon
