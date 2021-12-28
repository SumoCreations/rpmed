export interface ITheme {
  borderRadius: string
  colorBodyHeader: string
  colorBodyText: string
  colorBodyTextInverted: string
  colorButtonDestructive: string
  colorButtonPrimary: string
  colorContentAreaBackground: string
  colorContentAreaBorder: string
  colorContentAreaBorderSelected: string
  colorErrorText: string
  colorNavigationTextPrimary: string
  colorNavigationTextSecondary: string
  colorPrimary: string
  colorSecondary: string
  fontFamilyBody: string
  fontFamilyHeader: string
  inputFieldMargin: string
  inputPadding: string
  inputTextSize: string
}

const Theme: ITheme = {
  borderRadius: '0.25rem',
  colorBodyHeader: '#3b3a3d',
  colorBodyText: '#3b3a3d',
  colorBodyTextInverted: '#fff',
  colorButtonDestructive: '#d73a49',
  colorButtonPrimary: '#66cd00',
  colorContentAreaBackground: '#fefefe',
  colorContentAreaBorder: '#ccc',
  colorContentAreaBorderSelected: '#4b5472',
  colorErrorText: '#d73a49',
  colorNavigationTextPrimary: '#fcfaff',
  colorNavigationTextSecondary: '#4b5472',
  colorPrimary: '#4b5472',
  colorSecondary: '#e6e5e8',
  fontFamilyBody: 'Arial,"Helvetica Neue",Helvetica,sans-serif',
  fontFamilyHeader: 'Arial,"Helvetica Neue",Helvetica,sans-serif',
  inputFieldMargin: '6px 0 6px 0',
  inputPadding: '8px 38px 8px 14px',
  inputTextSize: '14px',
}

export default Theme
