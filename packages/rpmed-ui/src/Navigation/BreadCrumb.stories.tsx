import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { BreadCrumb, BreadCrumbProps } from './BreadCrumb'

export default {
  title: 'Navigation/Bread Crumb',
  component: BreadCrumb,
} as Meta

const Template: Story<BreadCrumbProps> = (args) => <BreadCrumb {...args} />

const args: BreadCrumbProps = {
  trail: [
    { label: 'Downloads', to: '/downloads' },
    { label: 'File 1', to: '/file1' },
    { label: 'Supporting File 2', url: 'http://google.com' },
  ],
}

export const Standard = Template.bind({})
Standard.args = args
