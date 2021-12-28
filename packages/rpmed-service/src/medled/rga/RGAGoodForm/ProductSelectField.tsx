import { ErrorMessage } from 'formik'
import * as React from 'react'
import { Box, Flex } from 'rebass'
import { Product } from 'rpmed-schema'
import { Form, Indicators, Input } from 'rpmed-ui'
import { useProductsQuery } from '../graphql'

export type ProductSelectFn = Input.DropDownSelectFn<Product>

interface IProductResultProps {
  ignoreIds?: string[]
  onDismiss?: () => void
  onSelect: ProductSelectFn
  search: string
}

const nrml = (s: string) => s.trim().toLowerCase()
const sortByName = (a: Product, b: Product) =>
  nrml(a.name) > nrml(b.name) ? 1 : nrml(a.name) < nrml(b.name) ? -1 : 0

const ProductResults: React.FC<IProductResultProps> = ({
  search,
  onDismiss: dismiss,
  onSelect: select,
  ignoreIds,
}) => {
  const { loading, data } = useProductsQuery({ variables: { search } })
  const products = (data && data.response && data.response.products) || null
  return !loading && products ? (
    <React.Fragment>
      {products
        .map((p: any) => p as Product)
        .filter((p: any) => (ignoreIds ? !ignoreIds.includes(p.id) : true))
        .sort(sortByName)
        .map((p: any) => {
          const onClick: React.MouseEventHandler = e => {
            e.stopPropagation()
            select(p)
            if (dismiss) {
              dismiss()
            }
          }
          return (
            <Input.AutocompleteSuggestion
              key={`ProductSearchResult${p.id}`}
              displayName={p.name}
              onClick={onClick}
            />
          )
        })}
    </React.Fragment>
  ) : (
    <Flex p={[3]} alignItems="center">
      <Box m="auto">
        <Indicators.Spinner />
      </Box>
    </Flex>
  )
}

export const ProductSelectField: React.FunctionComponent<Input.IDynamicDropdownProps<
  Product
>> = props => {
  return (
    <Input.FieldContainer margin={props.margin}>
      {props.label ? <Form.Label>{props.label}</Form.Label> : null}
      <Input.Dropdown
        value={props.value}
        placeholder={props.placeholder}
        onDismiss={props.onDismiss}
        padding={props.padding}
        height={props.height}
      >
        {(searchValue, dismiss) => {
          const clearSelection: React.MouseEventHandler = e => {
            e.stopPropagation()
            props.onSelect({
              description: '',
              id: '',
              name: props.clearable || '',
            })
            dismiss()
          }
          return (
            <React.Fragment>
              {props.clearable ? (
                <Input.AutocompleteSuggestion
                  displayName={props.clearable}
                  onClick={clearSelection}
                />
              ) : null}
              <ProductResults
                onDismiss={dismiss}
                onSelect={props.onSelect}
                search={searchValue}
                ignoreIds={props.ignoreIds}
              />
            </React.Fragment>
          )
        }}
      </Input.Dropdown>
      <ErrorMessage name={props.name} component={Input.Error} />
    </Input.FieldContainer>
  )
}
