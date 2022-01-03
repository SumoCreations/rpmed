import styled from '../styled-components'
import { SIDEBAR_WIDTH } from './constants'

export const Body = styled.div`
  display: flex;
  flex-grow: 1;
  padding-left: ${SIDEBAR_WIDTH};

  @media print {
    padding: 0;
  }
`
