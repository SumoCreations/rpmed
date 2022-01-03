import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { ForgotForm, ForgotFormProps, ForgotFormValues } from './ForgotForm'
import { wait } from 'utils'

export default {
  title: 'Forms/ForgotForm',
} as Meta

const Template: Story<ForgotFormProps> = (args) => {
  const [loading, setLoading] = useState(args.loading ?? false)

  const onSubmit: any = async (values: ForgotFormValues) => {
    setLoading(true)
    await wait(1)
    setLoading(false)
    console.log('Submitted', values)
    return undefined
  }

  return (
    <div className="p-4 border rounded">
      <ForgotForm {...args} onSubmit={onSubmit} loading={loading} />
    </div>
  )
}

const args: ForgotFormProps = {
  onSubmit: async (values) => {
    await wait(1)
    console.log('Submitted', values)
    return undefined
  },
  defaultValues: { email: 'admin@rpmed.com' },
}

export const Primary = Template.bind({})
Primary.args = args
