import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { TextField, TextFieldProps } from './TextField'

export default {
  title: 'Form/Fields/TextField',
  component: TextField,
} as Meta

const Template: Story<TextFieldProps> = ({ ...args }) => <TextField {...args} />

const args = {
  label: 'Email',
  name: 'email',
  onChange: action('changed'),
  placeholder: 'email@example.com',
}

export const Standard = Template.bind({})
Standard.args = args

export const Required = Template.bind({})
Required.args = { ...args, required: true }

export const Error = Template.bind({})
Error.args = {
  ...args,
  required: true,
  errors: {
    email: { name: 'email', message: 'Please enter a valid email address.' },
  },
}

const MultiTemplate: Story<TextFieldProps> = ({ ...args }) => (
  <div>
    <TextField {...args} />
    <TextField {...args} />
  </div>
)

export const MultipleFields = MultiTemplate.bind({})
MultipleFields.args = { ...args, required: true }
