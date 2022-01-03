import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { ResetForm, ResetFormProps, ResetFormValues } from './ResetForm'
import { wait } from 'utils'

export default {
  title: 'Forms/ResetForm',
} as Meta

const Template: Story<ResetFormProps> = (args) => {
  const [loading, setLoading] = useState(args.loading ?? false)

  const onSubmit: any = async (values: ResetFormValues) => {
    setLoading(true)
    await wait(1)
    setLoading(false)
    console.log('Submitted', values)
    return undefined
  }

  return (
    <div className="p-4 border rounded">
      <ResetForm {...args} onSubmit={onSubmit} loading={loading} />
    </div>
  )
}

const args: ResetFormProps = {
  onSubmit: async (values) => {
    await wait(1)
    console.log('Submitted', values)
    return undefined
  },
}

export const Primary = Template.bind({})
Primary.args = args
