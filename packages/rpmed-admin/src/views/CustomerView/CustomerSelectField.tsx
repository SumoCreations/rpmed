import { ErrorMessage } from 'formik'
import * as React from 'react'
import { Form, Input } from 'rpmed-ui/lib/V1'
import { useCustomersQuery, Customer } from 'rpmed-schema'

export type CustomerSelectFn = (p: Customer) => void

interface ICustomerSelectProps {
  name: string
  label: string
  value: string
  onDismiss: () => void
  onSelect: CustomerSelectFn
  placeholder: string
}

interface ICustomerListProps {
  onDismiss: () => void
  onSelect: CustomerSelectFn
  search: string
}

const CustomerList: React.FC<ICustomerListProps> = ({
  search,
  onDismiss: dismiss,
  onSelect: select,
}) => {
  const { data } = useCustomersQuery({ variables: { search } })
  const customers = data?.response.customers ?? []
  return (
    <React.Fragment>
      {customers.map(c => {
        const onClick: React.MouseEventHandler = e => {
          e.stopPropagation()
          select(c as Customer)
          dismiss()
        }
        return (
          <Input.AutocompleteSuggestion
            key={`CustomerSearchResult${c?.id}`}
            displayName={`${c?.name} (${c?.email})`}
            onClick={onClick}
          />
        )
      })}
    </React.Fragment>
  )
}

export const CustomerSelectField: React.FC<ICustomerSelectProps> = props => {
  return (
    <Input.FieldContainer>
      <Form.Label>{props.placeholder}</Form.Label>
      <Input.Dropdown
        value={props.value}
        placeholder={props.placeholder}
        onDismiss={props.onDismiss}
      >
        {(searchValue, dismiss) => (
          <CustomerList
            search={searchValue}
            onDismiss={dismiss}
            onSelect={props.onSelect}
          />
        )}
      </Input.Dropdown>
      <ErrorMessage name={props.name} component={Input.Error} />
    </Input.FieldContainer>
  )
}
