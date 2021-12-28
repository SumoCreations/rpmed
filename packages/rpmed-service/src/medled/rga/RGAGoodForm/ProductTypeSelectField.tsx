import { ErrorMessage } from 'formik'
import * as React from 'react'
import { ProductType } from 'rpmed-schema'
import { Form, Input } from 'rpmed-ui'

export type ProductTypeSelectFn = Input.DropDownSelectFn<ProductType>

export const ProductTypeSelectField: React.FunctionComponent<Input.IDynamicDropdownProps<
  ProductType
>> = props => {
  return (
    <Input.FieldContainer margin={props.margin}>
      {props.label ? <Form.Label>{props.label}</Form.Label> : null}
      <Input.Dropdown {...props}>
        {(_, dismiss) => {
          const selectType = (
            productType: ProductType | null
          ): React.MouseEventHandler => e => {
            e.stopPropagation()
            props.onSelect(productType as ProductType)
            dismiss()
          }
          return (
            <React.Fragment>
              {props.clearable ? (
                <Input.AutocompleteSuggestion
                  displayName={props.clearable}
                  onClick={selectType(null)}
                />
              ) : null}
              <Input.AutocompleteSuggestion
                displayName={ProductType.Headlight}
                onClick={selectType(ProductType.Headlight)}
              />
              <Input.AutocompleteSuggestion
                displayName={ProductType.Accessory}
                onClick={selectType(ProductType.Accessory)}
              />
            </React.Fragment>
          )
        }}
      </Input.Dropdown>
      <ErrorMessage name={props.name} component={Input.Error} />
    </Input.FieldContainer>
  )
}
