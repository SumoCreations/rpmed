import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { PageForm, PageFormProps, PageFormValues } from './PageForm'
import { wait } from 'utils'

export default {
  title: 'Forms/PageForm',
} as Meta

const Template: Story<PageFormProps> = (args) => {
  const [loading, setLoading] = useState(args.loading ?? false)

  const onSubmit: any = async (values: PageFormValues) => {
    setLoading(true)
    await wait(1)
    setLoading(false)
    console.log('Submitted', values)
    return undefined
  }

  return (
    <div className="p-4 border rounded">
      <PageForm {...args} onSubmit={onSubmit} loading={loading} />
    </div>
  )
}

const args: PageFormProps = {
  onSubmit: async (values) => {
    await wait(1)
    console.log('Submitted', values)
    return undefined
  },
}

export const Primary = Template.bind({})
Primary.args = args

export const Prepopulated = Template.bind({})
Prepopulated.args = { ...args, defaultValues: { title: 'Surgical', slug: "surgical-resources", keywords: "example, keywords", description: "A page description." } }
