import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import React from 'react'
import ReactSelect, { MultiValue } from 'react-select'

export interface DropDownListItemType {
  /**
   * The label to render when displaying the item.
   */
  label: string
  /**
   * A secondary heading / label to
   */
  secondaryLabel?: string
  /**
   * The unique id for this item.
   */
  id: string
  /**
   * An optional value to be used if it is different from the name.
   */
  value?: string
  /**
   * An optional icon to prepend on the list item.
   */
  icon?: IconDefinition
  /**
   * Alters the appearance of the item to appear less prevalent.
   */
  informational?: boolean
  /**
   * The color of the avatar associated to this item.
   */
  avatarColor?: string
}

interface MultiSelectProps {
  id?: string
  name: string
  label?: string
  placeholder?: string
  closeMenuOnSelect?: boolean
  options?: DropDownListItemType[]
  onChange?: (value: string) => void
  onSelect?: (selection: string) => void
  value?: string
}

export const MultiSelect = React.forwardRef<any, MultiSelectProps>(
  (
    {
      id,
      name,
      label,
      placeholder,
      options = [],
      closeMenuOnSelect = false,
      onChange: handleOnInputChange,
      onSelect: handleSelect,
      value,
    },
    ref
  ) => {
    const defaultValue = options.filter(
      (option) => (value?.indexOf(option.id) ?? -1) > -1
    )

    const handleChange = (selection: MultiValue<DropDownListItemType>) => {
      handleSelect?.(selection.map((s) => s.id).join(' '))
    }

    return (
      <div className="flex flex-col w-full">
        <label htmlFor={id}>{label}</label>
        <ReactSelect
          isMulti
          isClearable
          id={id}
          name={name}
          value={defaultValue}
          options={options}
          formatOptionLabel={(option: DropDownListItemType) => (
            <>
              {option.icon ? (
                <FontAwesomeIcon icon={option.icon} className="mr-2" />
              ) : null}
              <span>{option.label}</span>
            </>
          )}
          getOptionLabel={(option: DropDownListItemType) => option.label}
          getOptionValue={(option: DropDownListItemType) => option.id}
          placeholder={placeholder}
          closeMenuOnSelect={closeMenuOnSelect}
          className="pro__client__multi__select_container w-full"
          classNamePrefix="pro__client__multi__select"
          onInputChange={handleOnInputChange}
          onChange={handleChange}
          styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
        />
        <input type="hidden" ref={ref} name={name} id={id} />
      </div>
    )
  }
)
