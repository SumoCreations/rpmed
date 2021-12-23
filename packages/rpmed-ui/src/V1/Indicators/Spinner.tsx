import { SizeProp } from '@fortawesome/fontawesome-svg-core'
import { faSpinnerThird } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { Rotate } from '../Animations'
import styled from '../styled-components'

const IndicatorContainer = styled.div`
  display: flex;
  flex-grow: 0;
  flex-shrink: 1;
`

interface IProps {
  size?: SizeProp
}

export const Spinner: React.FC<IProps> = ({ size }) => (
  <IndicatorContainer>
    <Rotate>
      <FontAwesomeIcon icon={faSpinnerThird} size={size} />
    </Rotate>
  </IndicatorContainer>
)
