import React from 'react'
import StyleableLink from '../StyleableLink'
import styled from '../styled-components'

const ItemLink: React.FC<any> = styled(StyleableLink)`
  color: ${(p: any) => p.theme.colorPrimary};
`

export default ItemLink
