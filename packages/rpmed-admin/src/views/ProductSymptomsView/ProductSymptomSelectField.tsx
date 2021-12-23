import { ErrorMessage } from 'formik'
import * as React from 'react'
import { Box, Flex } from 'rebass'
import { ProductSymptom } from 'rpmed-schema'
import { Form, Indicators, Input } from 'rpmed-ui/lib/V1'
import { useProductSymptomsQuery } from 'rpmed-schema'

export type ProductSymptomSelectFn = (p: ProductSymptom) => void
interface IProductSymptomSelectProps {
  name: string
  label?: string
  value: string
  modelNumber?: string
  onDismiss: () => void
  onSelect: ProductSymptomSelectFn
  placeholder: string
  ignoreIds?: string[]
}

interface ISymptomResultListProps {
  search: string
  modelNumber?: string
  ignoreIds?: string[]
  onSelect: ProductSymptomSelectFn
  onDismiss: () => void
}

const SymptomResultListView: React.FC<ISymptomResultListProps> = ({
  ignoreIds,
  search,
  modelNumber,
  onDismiss: dismiss,
  onSelect: select,
}) => {
  const { data } = useProductSymptomsQuery({ variables: { search, modelNumber } })
  const productSymptoms = (data?.response.productSymptoms ?? []) as ProductSymptom[]
  return productSymptoms ? (
    <React.Fragment>
      {productSymptoms
        .filter(p => (ignoreIds ? !ignoreIds.includes(p.id) : true))
        .sort((a, b) => {
          return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        })
        .map(p => {
          const onClick: React.MouseEventHandler = e => {
            e.stopPropagation()
            select(p)
            dismiss()
          }
          return (
            <Input.AutocompleteSuggestion
              key={`ProductSymptomSearchResult${p.id}`}
              displayName={
                <Input.SuggestionDetailView
                  heading={p.name}
                  description={
                    p.preApproved ? 'Pre-approved Repair' : `Check Warranty`
                  }
                />
              }
              onClick={onClick}
            />
          )
        })}
    </React.Fragment>
  ) : (
    <Flex alignItems="center">
      <Box py={2} m="auto">
        <Indicators.Spinner />
      </Box>
    </Flex>
  )
}

export const ProductSymptomSelectField: React.FunctionComponent<IProductSymptomSelectProps> = props => {
  return (
    <Input.FieldContainer>
      {props.label ? <Form.Label>{props.label}</Form.Label> : null}
      <Input.Dropdown
        value={props.value}
        placeholder={props.placeholder}
        onDismiss={props.onDismiss}
      >
        {(searchValue, dismiss) => (
          <SymptomResultListView
            onDismiss={dismiss}
            search={searchValue}
            modelNumber={props.modelNumber}
            ignoreIds={props.ignoreIds}
            onSelect={props.onSelect}
          />
        )}
      </Input.Dropdown>
      <ErrorMessage name={props.name} component={Input.Error} />
    </Input.FieldContainer>
  )
}
