import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { ServiceForm, ServiceFormProps, ServiceFormValues } from './ServiceForm'
import { wait } from 'utils'

export default {
  title: 'Forms/ServiceForm',
} as Meta

const Template: Story<ServiceFormProps> = (args) => {
  const [loading, setLoading] = useState(args.loading ?? false)

  const onSubmit: any = async (values: ServiceFormValues) => {
    setLoading(true)
    await wait(1)
    setLoading(false)
    console.log('Submitted', values)
    return undefined
  }

  return (
    <div className="p-4 border rounded">
      <ServiceForm {...args} onSubmit={onSubmit} loading={loading} />
    </div>
  )
}

const args: ServiceFormProps = {
  onSubmit: async (values) => {
    await wait(1)
    console.log('Submitted', values)
    return undefined
  },
  defaultValues: { name: 'John Ferguson', hospital: 'Hospital 1' } as any,
}

export const Primary = Template.bind({})
Primary.args = args
