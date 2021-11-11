import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { Button } from './Button'
import { ButtonGroup, ButtonGroupProps } from './ButtonGroup'

export default {
  title: 'Form/ButtonGroup',
  component: ButtonGroup,
} as Meta

const Template: Story<ButtonGroupProps> = (args) => (
  <div className="bg-contentAreaBackgroundAlt p-4 flex">
    <ButtonGroup {...args}>
      <Button align="stretch">Click Here</Button>
      <Button align="stretch">No Click Here!</Button>
      <Button align="stretch" appearance="destructive">
        Delete Me
      </Button>
    </ButtonGroup>
  </div>
)

export const Default = Template.bind({})
Default.args = {}

export const Column = Template.bind({})
Column.args = { direction: 'column' }

export const Custom = Template.bind({})
Custom.args = {
  direction: 'column',
  className: 'w-64 mx-auto',
  itemClassName:
    'shadow-lg hover:shadow-xl border-2 border-white hover:border-actionable rounded',
}
