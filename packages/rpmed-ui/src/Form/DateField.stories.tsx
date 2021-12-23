import React, { useState } from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { DateField, DateFieldProps } from './DateField'

export default {
  title: 'Form/Fields/DateField',
  component: DateField,
} as Meta

const Template: Story<DateFieldProps> = (args) => {
  const [selectedDate, setSelectedDate] = useState(null as string | null)
  const handleSelectedDate = (date: string) => setSelectedDate(date)
  return (
    <div className="p-4 border rounded">
      <DateField
        {...args}
        onDateChange={handleSelectedDate}
        value={selectedDate ?? args.value}
      />
      <p className="text-md">
        Selected Date: <strong className="font-semibold">{selectedDate}</strong>
      </p>
    </div>
  )
}

const args: DateFieldProps = { name: 'startsAt', label: 'Starts At' }

export const Standard = Template.bind({})
Standard.args = args

export const CustomPlaceholder = Template.bind({})
CustomPlaceholder.args = { ...args, placeholder: 'When does the event begin?' }

export const CustomDateFormat = Template.bind({})
CustomDateFormat.args = { ...args, selectedDateFormat: 'MMM DD, YYYY' }

export const Required = Template.bind({})
Required.args = { ...args, required: true }

export const Error = Template.bind({})
Error.args = {
  ...args,
  required: true,
  error: 'Please select a valid date.',
}

export const Disabled = Template.bind({})
Disabled.args = { ...args, disabled: true }
