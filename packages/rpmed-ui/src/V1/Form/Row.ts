import { media } from '../media'
import styled from '../styled-components'

const Row = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  width: auto;
  list-style: none;
  ${media.minSm`flex-direction: row;`}
`
export enum ItemSize {
  Long = 'long',
  Medium = 'medium',
  Short = 'short',
}

interface IRowItemProps {
  size: ItemSize
}

const lengthForsize = (size: ItemSize): string => {
  switch (size) {
    case ItemSize.Long:
      return 'auto'
    case ItemSize.Medium:
      return '50%'
    case ItemSize.Short:
      return '25%'
  }
}

const RowItem = styled.li<IRowItemProps>`
  max-width: 100%;
  flex-basis: auto;
  margin: 0;
  flex-grow: 1;
  display: flex;
  ${p => media.minSm`
    margin: 0 12px 0 0;
    max-width: ${lengthForsize(p.size)}
    flex-basis: ${lengthForsize(p.size)}
  `}
`

export { Row, RowItem }
