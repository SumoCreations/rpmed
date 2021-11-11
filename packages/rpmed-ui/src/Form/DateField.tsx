import React, { useRef, useState } from 'react'
import { faCalendarAlt } from '@fortawesome/pro-regular-svg-icons'
import { MiniCal } from './MiniCal'
import { Field } from './Field'
import { Input, InputProps } from './Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Overlay } from '../Overlay'

export interface DateFieldProps extends InputProps {
  /**
   * An initial date to display
   */
  initialDate?: string
  /**
   * Indicates whether or not to align the calendar on the left of right side of the input.
   */
  alignCalendar?: 'left' | 'right'
  /**
   * A date selected on this widget
   */
  value?: string
  /**
   * The format the selected date should be rendered in. Defaults to "YYYY-MM-DD"
   */
  selectedDateFormat?: string
  /**
   * A callback that renders when a date on the calendar has been selected.
   */
  onDateChange?: (date: string) => void
  /**
   * Disables the field from user interaction.
   */
  disabled?: boolean
  /**
   * A placeholder string. Defaults to the date format if not supplied.
   */
  placeholder?: string
  /**
   * An optional form label to display.
   */
  label?: string
  /**
   * The name of the associated input.
   */
  name: string
  /**
   * An optional inline error message.
   */
  error?: string
  /**
   * Indicates if the content of the field is required.
   */
  required?: boolean
  className?: string
}

export const DateField = React.forwardRef<HTMLInputElement, DateFieldProps>(
  (
    {
      alignCalendar = 'left',
      initialDate,
      value,
      onDateChange: handleSelectedDate,
      selectedDateFormat = 'YYYY-MM-DD',
      disabled,
      error,
      required,
      label,
      name,
      placeholder,
      className,
      ...inputProps
    },
    forwardedRef
  ) => {
    const [focused, setFocus] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const toggleFocus: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      e.preventDefault()
      setFocus(!focused)
    }

    const dismissAndHandleSelectedDate = (date: string) => {
      if (handleSelectedDate) {
        handleSelectedDate(date)
      }
      setFocus(false)
    }

    const { x, y, height } = buttonRef.current?.getBoundingClientRect() ?? {}
    return (
      <>
        <Field
          label={label}
          errorMessage={error}
          name={name}
          required={required}
          disabled={disabled}
          className={className}
        >
          <button
            className="bg-white p-2 border pl-4 pr-8 rounded flex flex-grow relative"
            onClick={toggleFocus}
            type="button"
            ref={buttonRef}
          >
            {value ? (
              <p className="text-gray-800">{value}</p>
            ) : (
              <p className="text-gray-400">
                {placeholder ?? selectedDateFormat}
              </p>
            )}
            <div className="absolute right-0 inset-y-0 flex text-contentAreaBorder">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="text-gray-500 mr-2 my-auto"
              />
            </div>
          </button>
          <Input
            {...inputProps}
            name={name}
            type="hidden"
            ref={forwardedRef}
            value={value ?? ''}
          />
        </Field>
        {focused ? (
          <Overlay>
            <div
              className={`fixed bg-white shadow hover:shadow-lg mt-1 transition-shadow ease-in-out duration-500 z-50 w-64 my-auto`}
              style={{
                top: (y ?? 0) + (height ?? 0),
                left: x,
              }}
            >
              <MiniCal
                initialDate={initialDate}
                selectedDate={value}
                onDateSelected={dismissAndHandleSelectedDate}
                selectedDateFormat={selectedDateFormat}
              />
            </div>
            <button
              className="bg-white opacity-25 fixed z-40 h-screen w-screen top-0 left-0"
              onClick={toggleFocus}
            />
          </Overlay>
        ) : null}
      </>
    )
  }
)
