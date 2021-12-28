import * as styledComponents from 'styled-components'

import { ITheme } from './theme'

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as any

const remCalc = (px: number) => `${0.0625 * px}rem`

export { css, createGlobalStyle, keyframes, remCalc, ThemeProvider }
export default styled
