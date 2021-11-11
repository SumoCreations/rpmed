import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Field, FieldProps } from './Field'

export default {
  title: 'Form/Fields/Field',
  component: Field,
}

const Template: Story<FieldProps> = (args) => (
  <Field {...args}>
    <p className="py-2 px-4 bg-blue-100 rounded">Input element goes here.</p>
  </Field>
)

const args = {
  name: 'demo',
  onChange: action('changed'),
  placeholder: 'enter some text',
}

export const Standard = Template.bind({})
Standard.args = args

export const Required = Template.bind({})
Required.args = { ...args, label: 'email', required: true }

export const WithError = Template.bind({})
WithError.args = {
  ...args,
  required: true,
  errors: { demo: { name: 'demo', message: 'cannot be blank' } },
}
