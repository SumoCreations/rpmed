import * as React from 'react'
import styled from '../styled-components'
import logo from './logo.png'

const LogoImg = styled.img`
  width: auto;
  max-width: 100%;
  height: auto;
  display: block;
`

const LogoContainer = styled.div`
  width: 180px;
`

const Logo: React.FC<{}> = () => (
  <LogoContainer>
    <LogoImg src={logo} />
  </LogoContainer>
)

export default Logo
