// import { media } from '../media'
import { transparentize } from 'polished'
import styled from '../styled-components'

export enum DividerStyle {
  Clear,
  Border,
}

export enum DividerSize {
  Standard,
  Expand,
}

export const Divider = styled.hr<{ style?: DividerStyle; size?: DividerSize }>`
  display: flex;
  border: none;
  border-top: 1px solid
    ${p =>
      p.style === DividerStyle.Border
        ? transparentize(0.7)(p.theme.colorSecondary)
        : 'transparent'};
  flex-grow: ${p => (p.size === DividerSize.Expand ? 1 : 0)};
  margin: 0.5rem 0;
`
