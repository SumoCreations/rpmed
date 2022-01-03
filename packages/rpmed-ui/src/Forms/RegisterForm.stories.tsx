import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import {
  RegisterForm,
  RegisterFormProps,
  RegisterFormValues,
} from './RegisterForm'
import { wait } from 'utils'

export default {
  title: 'Forms/RegisterForm',
} as Meta

const Template: Story<RegisterFormProps> = (args) => {
  const [loading, setLoading] = useState(args.loading ?? false)

  const onSubmit: any = async (values: RegisterFormValues) => {
    setLoading(true)
    await wait(1)
    setLoading(false)
    console.log('Submitted', values)
    return undefined
  }

  return (
    <div className="p-4 border rounded">
      <RegisterForm {...args} onSubmit={onSubmit} loading={loading} />
    </div>
  )
}

const args: RegisterFormProps = {
  onSubmit: async (values) => {
    await wait(1)
    console.log('Submitted', values)
    return undefined
  },
  defaultValues: { name: 'John Ferguson', hospital: 'Hospital 1' } as any,
}

export const Primary = Template.bind({})
Primary.args = args
