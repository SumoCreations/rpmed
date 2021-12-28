import React from 'react'
import { Form, Input } from 'rpmed-ui'

export const ShippingSpeedSelect: React.FC<{
  value: string
  onSelect: (value: string) => void
}> = ({ value, onSelect: handleSelect }) => (
  <Input.FieldContainer>
    <Form.Label>Shipping Speed</Form.Label>
    <Input.Dropdown value={value} searchable={false}>
      {(_, dismiss) => {
        const selectType = (
          shippingSpeed: string
        ): React.MouseEventHandler => e => {
          e.stopPropagation()
          handleSelect(shippingSpeed)
          dismiss()
        }
        return (
          <React.Fragment>
            <Input.AutocompleteSuggestion
              displayName={'Ground'}
              onClick={selectType('Ground')}
            />
            <Input.AutocompleteSuggestion
              displayName={'2-Day'}
              onClick={selectType('2-Day')}
            />
            <Input.AutocompleteSuggestion
              displayName={'Overnight'}
              onClick={selectType('Overnight')}
            />
          </React.Fragment>
        )
      }}
    </Input.Dropdown>
  </Input.FieldContainer>
)
