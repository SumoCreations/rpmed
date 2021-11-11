import React from 'react'
import ReactSelect from 'react-select'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface SelectOption {
  id: string
  name: string
  icon?: IconDefinition
}

export interface SelectProps {
  id?: string
  name: string
  placeholder?: string
  options?: SelectOption[]
  onChange?: (value: string) => void
  onSelect?: (id: string | null) => void
  value?: string
  disabled?: boolean
  clearable?: boolean
}

export const Select = React.forwardRef<any, SelectProps>(
  (
    {
      id,
      name,
      placeholder,
      options = [],
      onChange: handleOnInputChange,
      onSelect: handleSelect,
      value,
      disabled,
      clearable,
    },
    ref
  ) => {
    const defaultValue = options.filter((s) => s.id === value)
    const handleChange = (s: SelectOption | null) => {
      handleSelect?.(s?.id ?? null)
    }
    return (
      <div className="w-full flex-grow flex">
        <ReactSelect
          name={name}
          options={options}
          value={defaultValue}
          defaultValue={defaultValue}
          getOptionLabel={(option: SelectOption) => option.name}
          getOptionValue={(option: SelectOption) => option.id}
          placeholder={placeholder}
          className="client__multi__select_container w-full"
          classNamePrefix="client__multi__select"
          onInputChange={handleOnInputChange}
          isClearable={clearable}
          isDisabled={disabled}
          onChange={handleChange}
          closeMenuOnSelect
        />
        <input type="hidden" ref={ref} name={name} id={id} />
      </div>
    )
  }
)
