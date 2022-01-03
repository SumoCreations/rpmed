import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Input, InputProps } from './Input'

export default {
  title: 'Form/Input',
  component: Input,
} as Meta

const Template: Story<InputProps> = ({ ...args }) => <Input {...args} />

const args = {
  name: 'demo',
  onChange: action('changed'),
  placeholder: 'enter some text',
}

export const Standard = Template.bind({})
Standard.args = args
