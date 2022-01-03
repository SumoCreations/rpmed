import React, { useState } from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import Primary from './Primary'

export default {
  title: 'V1/Header/Primary',
  component: Primary,
} as Meta

const Template: Story<{}> = () => {
  return <Primary />
}

const args = {}

export const Standard: any = Template.bind({})
Standard.args = args
