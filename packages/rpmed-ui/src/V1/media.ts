import { FlattenInterpolation, ThemeProps } from 'styled-components'
import { css as makeCss } from './styled-components'
import { ITheme } from './theme'

const css = makeCss as any

enum CSSUnit {
  Px = 'px',
  Rem = 'rem',
  Em = 'em',
}

interface ICSSMeasurement {
  value: number
  unit: CSSUnit
}

export const gutterWidth: ICSSMeasurement = { value: 1, unit: CSSUnit.Rem }
export const outerMargin: ICSSMeasurement = { value: 2, unit: CSSUnit.Rem }
export const gutterCompensation = `${gutterWidth.value * 0.5 * -1}${
  gutterWidth.unit
}`
export const halfGutterWidth = `${gutterWidth.value * 0.5}${gutterWidth.unit}`
export const xsMin = 30
export const smMin = 48
export const mdMin = 64
export const lgMin = 75
export const screenXsMin = xsMin
export const screenSmMin = smMin
export const screenMdMin = mdMin
export const screenLgMin = lgMin
export const containerSm = `${smMin + gutterWidth.value}${gutterWidth.unit}`
export const containerMd = `${mdMin + gutterWidth.value}${gutterWidth.unit}`
export const containerLg = `${lgMin + gutterWidth.value}${gutterWidth.unit}`

interface ISizeMap {
  [key: string]: string
}

/* tslint:disable:object-literal-sort-keys */
const sizes: ISizeMap = {
  minXs: '375px',
  minSm: '544px',
  minMd: '768px',
  minLg: '992px',
  minXl: '1200px',
}
/* tslint:enable:object-literal-sort-keys */

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (literals: TemplateStringsArray, ...placeholders: any[]) => css`
    @media (min-width: ${sizes[label]}) {
      ${css(literals, ...placeholders)}
    }
  `
  return acc
}, {} as Record<keyof typeof sizes, (l: TemplateStringsArray, ...p: any[]) => FlattenInterpolation<ThemeProps<ITheme>>>)

/* tslint:disable:object-literal-sort-keys */
const viewports: ISizeMap = {
  small: '48em',
  medium: '64em',
  large: '75em',
}
/* tslint:enable:object-literal-sort-keys */

export const viewport = Object.keys(viewports).reduce((acc, label) => {
  acc[label] = (literals: TemplateStringsArray, ...placeholders: any[]) => css`
    @media only screen and (min-width: ${viewports[label]}) {
      ${css(literals, ...placeholders)}
    }
  `
  return acc
}, {} as Record<keyof typeof viewports, (l: TemplateStringsArray, ...p: any[]) => FlattenInterpolation<ThemeProps<ITheme>>>)
