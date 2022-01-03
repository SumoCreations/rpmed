import { ErrorMessage } from 'formik'
import * as React from 'react'
import { Box, Flex } from 'rebass'
import { ModelNumber, ProductType } from 'rpmed-schema'
import { Form, Indicators, Input } from 'rpmed-ui/lib/V1'
import { useModelNumbersQuery } from 'rpmed-schema'

export type ModelNumberSelectFn = Input.DropDownSelectFn<ModelNumber>

interface IModelNumberSelectFieldProps
  extends Input.IDynamicDropdownProps<ModelNumber> {
  productType?: ProductType | null
  productId?: string | null
}

interface IResultProps {
  ignoreIds?: string[]
  productType?: ProductType | null
  productId?: string | null
  search: string
  onSelect: ModelNumberSelectFn
  onDismiss: () => void
}

const nrml = (s: string) => s.trim().toLowerCase()
const sortByName = (a: ModelNumber, b: ModelNumber) =>
  nrml(a.id) > nrml(b.id) ? 1 : nrml(a.id) < nrml(b.id) ? -1 : 0

const Results: React.FC<IResultProps> = ({
  ignoreIds,
  onDismiss: dismiss,
  onSelect: select,
  productId,
  productType,
  search,
}) => {
  const { data, loading } = useModelNumbersQuery({
    variables: {
      productId,
      productType,
      search,
    },
  })
  const modelNumbers = data?.response?.modelNumbers
  return modelNumbers ? (
    <React.Fragment>
      {loading ? (
        <Flex p={[3]}>
          <Indicators.Spinner />
        </Flex>
      ) : (
        modelNumbers
          .map(m => m as ModelNumber)
          .filter(m => (ignoreIds ? !ignoreIds.includes(m.id) : true))
          .sort(sortByName)
          .map(m => {
            const onClick: React.MouseEventHandler = e => {
              e.stopPropagation()
              select(m as ModelNumber)
              dismiss()
            }
            return (
              <Input.AutocompleteSuggestion
                key={`ModelNumbersSearchResult${m.id}`}
                displayName={<Input.SuggestionDetailView heading={m.id} />}
                onClick={onClick}
              />
            )
          })
      )}
    </React.Fragment>
  ) : (
    <Flex alignItems="center">
      <Box py={2} m="auto">
        <Indicators.Spinner />
      </Box>
    </Flex>
  )
}

export const ModelNumberSelectField: React.FC<IModelNumberSelectFieldProps> = props => {
  return (
    <Input.FieldContainer margin={props.margin}>
      {props.label ? <Form.Label>{props.label}</Form.Label> : null}
      <Input.Dropdown {...props}>
        {(searchValue, dismiss) => {
          const clearSelection: React.MouseEventHandler = e => {
            e.stopPropagation()
            props.onSelect({
              description: '',
              feeWithWarranty: {},
              feeWithoutWarranty: {},
              id: '',
              lotted: false,
              pricing: {},
              productIds: [],
              productType: ProductType.Accessory,
              products: [],
              symptoms: [],
              warrantyTerm: 0,
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
              <Results
                onDismiss={dismiss}
                onSelect={props.onSelect}
                ignoreIds={props.ignoreIds}
                search={searchValue}
                productId={props.productId}
                productType={props.productType}
              />
            </React.Fragment>
          )
        }}
      </Input.Dropdown>
      <ErrorMessage name={props.name} component={Input.Error} />
    </Input.FieldContainer>
  )
}
