import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { Icon, IconProps } from './Icon'
import { faCalendarAlt } from '@fortawesome/pro-regular-svg-icons'

export default {
  title: 'Form/Icon',
  component: Icon,
} as Meta

const Template: Story<IconProps> = (args) => (
  <div className="bg-gray-100 p-10 flex">
    <Icon {...args} />
  </div>
)

export const Primary = Template.bind({})
Primary.args = { mode: 'primary', icon: faCalendarAlt }

export const Secondary = Template.bind({})
Secondary.args = { mode: 'secondary', icon: faCalendarAlt }

const DarkTemplate: Story<IconProps> = (args) => (
  <div className="bg-primary-default p-10 flex">
    <Icon {...args} />
  </div>
)

export const Negative = DarkTemplate.bind({})
Negative.args = { mode: 'negative', icon: faCalendarAlt }
