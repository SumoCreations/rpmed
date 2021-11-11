import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { Group } from './Group'
import { Toolbar, Primary } from '.'

export default {
  title: 'Actions/Group',
  component: Group,
} as Meta

const Template: Story = (args) => (
  <div className="bg-contentAreaBackgroundAlt p-4 flex">
    <Group {...args}>
      <Toolbar>1</Toolbar>
      <Toolbar>2</Toolbar>
      <Toolbar>3</Toolbar>
      <Primary>P</Primary>
    </Group>
  </div>
)

export const Default = Template.bind({})
Default.args = {}
