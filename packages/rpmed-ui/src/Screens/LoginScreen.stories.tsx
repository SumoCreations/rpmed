import React from 'react'
import { Story, Meta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import { LoginScreen, LoginScreenProps } from './LoginScreen'

export default {
  title: 'Screens/LoginScreen',
} as Meta

const Template: Story<{}> = (args) => {
  return <LoginScreen {...args} />
}

const args: LoginScreenProps = {}

export const Primary = Template.bind({})
Primary.args = args

Primary.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/csIZsgYkRZwRcHlzytg6Zh/Order-Portal?node-id=2%3A5',
  },
}
