import React from 'react'
import { Story, Meta } from '@storybook/react'

import { SelectField, SelectFieldProps } from './SelectField'

export default {
  title: 'Form/SelectField',
  component: SelectField,
} as Meta

const fonts = [
  'Default',
  'Comic',
  'Courier',
  'Georgia',
  'Helvetica',
  'Helvetica Neue',
  'Impact',
  'Lucida',
  'Tahoma',
  'Trebuchet MS',
  'Times',
  'Verdana',
].map((v, i) => ({ name: v, id: `${i}` }))

const selectOptions = [
  { name: 'Example A', id: 'A' },
  { name: 'Example B', id: 'B' },
]

const fontSizes = Array(5)
  .fill(0)
  .map((_, i) => i * 2 + 8)
  .map((v, i) => ({ name: `${v} pt`, id: `${i}` }))

const Template: Story<SelectFieldProps> = (args) => (
  <SelectField {...args} name="fonts" />
)

export const Fonts = Template.bind({})
Fonts.args = {
  label: 'fonts',
  name: 'fonts',
  options: fonts,
}

export const FontSizes = Template.bind({})
FontSizes.args = {
  label: 'sizes',
  name: 'sizes',
  options: fontSizes,
}

export const WithSelectOptions = Template.bind({})
WithSelectOptions.args = {
  label: 'sizes',
  name: 'sizes',
  options: selectOptions,
}

export const Required = Template.bind({})
Required.args = {
  label: 'sizes',
  name: 'sizes',
  options: fontSizes,
  required: true,
}

export const WithError = Template.bind({})
WithError.args = {
  label: 'fonts',
  name: 'fonts',
  options: fonts,
  errors: {
    fonts: { name: 'fonts', message: 'cannot be blank' },
  },
}
