import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { IconButton, IconButtonProps } from './IconButton'
import { faPlus } from '@fortawesome/pro-regular-svg-icons'

export default {
  title: 'Form/IconButton',
  component: IconButton,
} as Meta

const Template: Story<IconButtonProps> = (args) => (
  <div className="bg-gray-100 p-10 flex">
    <IconButton {...args} />
  </div>
)

export const Primary = Template.bind({})
Primary.args = { mode: 'primary', icon: faPlus, label: 'New' }

export const Secondary = Template.bind({})
Secondary.args = { mode: 'secondary', icon: faPlus, label: 'New' }

const DarkTemplate: Story<IconButtonProps> = (args) => (
  <div className="bg-primary-default p-10 flex">
    <IconButton {...args} />
  </div>
)

export const Negative = DarkTemplate.bind({})
Negative.args = { mode: 'negative', icon: faPlus, label: 'New' }
