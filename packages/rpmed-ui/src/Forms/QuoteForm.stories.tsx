import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { QuoteForm, QuoteFormProps, QuoteFormValues } from './QuoteForm'
import { wait } from 'utils'

export default {
  title: 'Forms/QuoteForm',
} as Meta

const Template: Story<QuoteFormProps> = (args) => {
  const [loading, setLoading] = useState(args.loading ?? false)

  const onSubmit: any = async (values: QuoteFormValues) => {
    setLoading(true)
    await wait(1)
    setLoading(false)
    console.log('Submitted', values)
    return undefined
  }

  return (
    <div className="p-4 border rounded">
      <QuoteForm {...args} onSubmit={onSubmit} loading={loading} />
    </div>
  )
}

const args: QuoteFormProps = {
  onSubmit: async (values) => {
    await wait(1)
    console.log('Submitted', values)
    return undefined
  },
  defaultValues: { name: 'John Ferguson', hospital: 'Hospital 1' } as any,
}

export const Primary = Template.bind({})
Primary.args = args
