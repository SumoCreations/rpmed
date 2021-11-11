import { lighten } from 'polished'

export interface ITheme {
  borderRadius: string
  buttonPadding: string
  colorBodyHeader: string
  colorBodyText: string
  colorBodyTextInverted: string
  colorButtonDestructive: string
  colorButtonPrimary: string
  colorContentAreaBackground: string
  colorContentAreaBorder: string
  colorContentAreaBorderSelected: string
  colorDrawerBackground: string
  colorErrorText: string
  colorNavigationTextPrimary: string
  colorNavigationTextSecondary: string
  colorPrimary: string
  colorSecondary: string
  fontFamilyBody: string
  fontFamilyHeader: string
  inputFieldMargin: string
  inputTextSize: string
  inputPadding: string
  inputPaddingForIcon: string
}

const Theme: ITheme = {
  borderRadius: '0.25rem',
  buttonPadding: '8px 14px 8px 14px',
  colorBodyHeader: '#3b3a3d',
  colorBodyText: '#3b3a3d',
  colorBodyTextInverted: '#fff',
  colorButtonDestructive: '#d73a49',
  colorButtonPrimary: '#66cd00',
  colorContentAreaBackground: '#fefefe',
  colorContentAreaBorder: '#ccc',
  colorContentAreaBorderSelected: '#4b5472',
  colorDrawerBackground: lighten(0.3)('#fefefe'),
  colorErrorText: '#d73a49',
  colorNavigationTextPrimary: '#fcfaff',
  colorNavigationTextSecondary: '#4b5472',
  colorPrimary: '#4b5472',
  colorSecondary: '#e6e5e8',
  fontFamilyBody: '"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif',
  fontFamilyHeader:
    '"Yanone Kaffeesatz","Helvetica Neue",Helvetica,Arial,sans-serif',
  inputFieldMargin: '6px 0 6px 0',
  inputPaddingForIcon: '4px 34px 4px 14px',
  inputPadding: '4px 14px 4px 14px',
  inputTextSize: '14px',
}

export default Theme
