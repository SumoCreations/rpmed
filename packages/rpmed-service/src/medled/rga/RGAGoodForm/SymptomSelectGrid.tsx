import React, { useEffect } from 'react'
import { Flex } from 'rebass'
import { Form, GridNav } from 'rpmed-ui/lib/V1'
import { useProductSymptomsQuery } from 'rpmed-schema'
import { ProductSymptomSelectFn } from './ProductSymptomSelectField'
import { IInteractiveSection } from './types'
import { ProductSymptom } from 'rpmed-schema'
import { ItemList } from './ItemList'

interface ISymptomSelectGridProps extends IInteractiveSection {
  onSelectSymptom: ProductSymptomSelectFn
  onToggleWarranty: () => any
}

/**
 * Presents any details regarding selecting a symptom and determining
 * warranty coverage.
 * @param param0 Props for this component.
 */
export const SymptomSelectGrid: React.FC<ISymptomSelectGridProps> = ({
  onSelectSymptom: handleSymptom,
  onSubmit: handleSubmit,
  values,
}) => {
  const { data } = useProductSymptomsQuery({
    variables: { search: '', modelNumber: values.modelNumber },
  })
  const productSymptoms = data?.response?.productSymptoms ?? []
  const sectionValid = (values.symptomId || '').length > 0
  const handleSelectItem = (id: string) => {
    const productSymptom = productSymptoms.find(ps => ps?.id === id)
    if (productSymptom) {
      handleSymptom(productSymptom as ProductSymptom)
    }
  }
  const other = productSymptoms.find(s => s?.name === 'Other')
  const sortedSymptoms = [
    ...productSymptoms
      .filter(s => s?.name !== 'Other')
      .sort((a, b) =>
        (a?.name ?? '') > (b?.name ?? '')
          ? 1
          : (a?.name ?? '') < (b?.name ?? '')
          ? -1
          : (a?.id ?? '') > (b?.id ?? '')
          ? 1
          : -1
      ),
    other,
  ]

  useEffect(() => {
    if (!values.symptomDescription && values.symptomId) {
      const symptom = productSymptoms.find(s => s?.id === values.symptomId)
      if (symptom) {
        handleSymptom(symptom as ProductSymptom)
      }
    }
  }, [productSymptoms, values])

  return (
    <Flex flexDirection="column" width={1}>
      {/* <Heading.Section>Symptom / Problem (2/6)</Heading.Section>
      <Divider.Light /> */}
      {values.productId ? (
        <ItemList
          onSelect={handleSelectItem}
          items={sortedSymptoms.map(i => ({
            id: i?.id ?? 'n/a',
            selected: i?.id === values.symptomId,
            title: i?.name ?? 'n/a',
            description: i?.synopsis ?? '...',
          }))}
        />
      ) : null}
      {/* <GridNav.Container>
        {sortedSymptoms.map(productSymptom => {
          return (
            <GridNav.Item
              key={`${productSymptom?.id}Item`}
              selected={productSymptom?.id === values.symptomId}
            >
              <GridNav.OverlayButton
                onClick={handleSelectSymptomClick(
                  productSymptom as ProductSymptom
                )}
              />
              <GridNav.ItemContent>
                <GridNav.ItemTitle>
                  <GridNav.ItemLink to="/troubleshoot">
                    {productSymptom?.name}
                  </GridNav.ItemLink>
                </GridNav.ItemTitle>
                <GridNav.ItemDescription>
                  {productSymptom?.synopsis}
                </GridNav.ItemDescription>
              </GridNav.ItemContent>
            </GridNav.Item>
          )
        })}
      </GridNav.Container> */}
      <Flex paddingTop={2} width={1}>
        <Form.Button disabled={!sectionValid} onClick={handleSubmit}>
          <span>Confirm Symptom</span>
        </Form.Button>
      </Flex>
    </Flex>
  )
}
