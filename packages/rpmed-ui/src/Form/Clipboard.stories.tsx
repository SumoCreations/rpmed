import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { Button } from './Button'
import { Clipboard, ClipboardProps } from './Clipboard'

export default {
  title: 'Form/Clipboard',
  component: Clipboard,
} as Meta

const Template: Story<ClipboardProps> = (args) => (
  <div className="bg-contentAreaBackgroundAlt p-4 flex">
    <Clipboard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}

export const WithValue = Template.bind({})
WithValue.args = { value: "I'm a value!" }
