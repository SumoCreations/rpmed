import React from 'react'
import { Form, Input } from 'rpmed-ui/lib/V1'

const BLANK_VALUE = 'Not Specified'
const specialties = [
  '',
  'General',
  'Cardiothoracic',
  'Colon and Rectal',
  'OBGYN',
  'Neurological',
  'Ophthalmic',
  'Oral and Maxillofacial',
  'Orthopedic ',
  'ENT / Otolaryngology',
  'Pediatric',
  'Plastic ',
  'Urology',
  'Vascular',
  'Veterinary',
  'Bariatric',
  'Head and Ne',
  'Trauma',
  'ER',
  'Oncology',
  'Podiatry',
  'Hand',
  'Micro',
  'Transplant',
  'Endocrine',
]

export const CustomerSpecialtySelect: React.FC<{
  value: string
  onSelect: (value: string) => void
}> = ({ value, onSelect: handleSelect }) => (
  <Input.FieldContainer>
    <Form.Label>Customer Specialty</Form.Label>
    <Input.Dropdown
      value={(value ?? '').length > 0 ? value : BLANK_VALUE}
      searchable={true}
    >
      {(search, dismiss) => {
        const handleClick = (
          shippingSpeed: string
        ): React.MouseEventHandler => e => {
          e.stopPropagation()
          handleSelect(shippingSpeed)
          dismiss()
        }
        return (
          <React.Fragment>
            {specialties
              .filter(s =>
                search.length > 0
                  ? s.toLowerCase().indexOf(search.toLowerCase()) > -1
                  : true
              )
              .sort()
              .map((s, i) => (
                <Input.AutocompleteSuggestion
                  key={s + `_${i}`}
                  displayName={s.length > 0 ? s : BLANK_VALUE}
                  onClick={handleClick(s)}
                />
              ))}
          </React.Fragment>
        )
      }}
    </Input.Dropdown>
  </Input.FieldContainer>
)
