import StyleableLink from '../StyleableLink'
import styled from '../styled-components'

const ItemLink = styled(StyleableLink)`
  color: ${(p: any) => p.theme.colorPrimary};
`

export default ItemLink
