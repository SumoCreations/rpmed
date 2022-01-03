import * as React from 'react'
import styled from '../styled-components'
import logo from '../../logo-standalone.png'

export const LogoImg = styled.img`
  width: auto;
  max-width: 100%;
  height: auto;
  display: block;
`

const LogoContainer = styled.div`
  width: 80px;
`

const LogoMark: React.FC<{}> = () => (
  <LogoContainer>
    <LogoImg src={logo} />
  </LogoContainer>
)

export default LogoMark
