import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { Field } from './Field'
import { MaskedInput, MaskedInputProps } from './MaskedInput'
import { faPhone } from '@fortawesome/pro-light-svg-icons/faPhone'

export default {
  title: 'Form/MaskedInput',
  component: Field,
} as Meta

const Template: Story<MaskedInputProps> = (args) => (
  <div className="bg-contentAreaBackgroundAlt p-4 flex">
    <Field name={args.name} label={args.name} icon={faPhone}>
      <MaskedInput {...args} />
    </Field>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  name: 'Phone Number',
  format: 'phone',
}

export const Date = Template.bind({})
Date.args = {
  name: 'Birthdate',
  format: 'date',
}

export const Zipcode = Template.bind({})
Zipcode.args = {
  name: 'Zip Code',
  format: 'zip',
}
