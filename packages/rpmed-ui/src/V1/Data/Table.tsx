import { transparentize } from 'polished'
import * as React from 'react'
import styled from '../styled-components'

const TableView = styled.table`
  border-spacing: 0;
  width: 100%;
`

const Header = styled.thead``

const TH = styled.th<IDataCellProps>`
  font-weight: 400;
  font-size: 0.875rem;
  border-top: 0;
  padding: 0.5rem;
  text-align: ${(p) => (p.contentType === 'numeric' ? 'right' : 'left')};
  width: ${(p) => p.width};
`

const HeaderCell = styled(TH as any)<IDataCellProps>`
  font-weight: 400;
  font-size: 0.875rem;
  color: ${(p) => p.theme.colorPrimary};
  border-bottom: 0.1rem solid
    ${(p) => transparentize(0.8)(p.theme.colorPrimary)};
`

const TotalCell = styled(TH as any)`
  font-weight: 600;
  background: ${(p) => transparentize(0.95)(p.theme.colorPrimary)};
  border-bottom: 0.1rem solid
    ${(p) => transparentize(0.875)(p.theme.colorPrimary)};
`

const Cell = styled.td<IDataCellProps>`
  font-weight: 400;
  font-size: 0.875rem;
  color: ${(p) => p.theme.colorPrimary};
  border-bottom: 0.1rem solid
    ${(p) => transparentize(0.95)(p.theme.colorPrimary)};
  border-top: 0;
  padding: 0.5rem;
  text-align: ${(p) => (p.contentType === 'numeric' ? 'right' : 'left')};
  width: ${(p) => p.width};
`

export type ColumnContentType = 'text' | 'numeric'

type DataTableValue = JSX.Element | string | number | undefined | null

interface IDataCellProps {
  contentType: ColumnContentType
  width: string
}

interface IDataTableProps {
  columnContentTypes: ColumnContentType[]
  headings?: string[]
  sortable: boolean[]
  totals?: DataTableValue[]
  rows: DataTableValue[][]
  initialSortColumnIndex: number
  widths?: string[]
}

const DataTableHeader: React.FC<IDataTableProps> = (p) => (
  <Header>
    <tr>
      {p.headings &&
        p.headings.map((heading, index) => (
          <HeaderCell
            key={`heading-${index}`}
            contentType={p.columnContentTypes[index]}
            width={
              p.widths ? p.widths[index] : `${1 / (p.headings || []).length}%`
            }
          >
            {heading}
          </HeaderCell>
        ))}
    </tr>
    {p.totals && (
      <tr>
        {p.totals.map((total, index) => (
          <TotalCell
            key={`total-${total}-${index}`}
            contentType={p.columnContentTypes[index]}
            width={
              p.widths ? p.widths[index] : `${1 / (p.headings || []).length}%`
            }
          >
            {index === 0 && total === '' ? 'Totals' : total}
          </TotalCell>
        ))}
      </tr>
    )}
  </Header>
)

export const Table: React.FC<IDataTableProps> = (p) => (
  <TableView>
    {p.headings && <DataTableHeader {...p} />}
    <tbody>
      {p.rows.map((row, y) => (
        <tr key={`row-${y}`}>
          {row.map((val, x) => (
            <Cell
              key={`cell-${x}-${y}`}
              contentType={p.columnContentTypes[x]}
              width={p.widths ? p.widths[x] : `${1 / row.length}%`}
            >
              {val}
            </Cell>
          ))}
        </tr>
      ))}
    </tbody>
  </TableView>
)
