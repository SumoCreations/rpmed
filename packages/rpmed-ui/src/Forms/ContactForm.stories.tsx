import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { ContactForm, ContactFormProps, ContactFormValues } from './ContactForm'
import { wait } from 'utils'

export default {
  title: 'Forms/ContactForm',
} as Meta

const Template: Story<ContactFormProps> = (args) => {
  const [loading, setLoading] = useState(args.loading ?? false)

  const onSubmit: any = async (values: ContactFormValues) => {
    setLoading(true)
    await wait(1)
    setLoading(false)
    console.log('Submitted', values)
    return undefined
  }

  return (
    <div className="p-4 border rounded">
      <ContactForm {...args} onSubmit={onSubmit} loading={loading} />
    </div>
  )
}

const args: ContactFormProps = {
  onSubmit: async (values) => {
    await wait(1)
    console.log('Submitted', values)
    return undefined
  },
  defaultValues: { name: 'John Ferguson' } as any,
}

export const Primary = Template.bind({})
Primary.args = args
