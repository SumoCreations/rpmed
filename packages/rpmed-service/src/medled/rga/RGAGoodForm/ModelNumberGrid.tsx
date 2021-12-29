import React from 'react'
import { Flex } from 'rebass'
import { Form, Divider, GridNav, Heading, Input } from 'rpmed-ui/lib/V1'
import { ModelNumber, Product } from 'rpmed-schema'
import { ModelNumberSelectFn } from './ModelNumberSelectField'
import { ProductSelectField, ProductSelectFn } from './ProductSelectField'
import { IInteractiveSection } from './types'
import { useModelNumbersQuery, useProductsQuery } from '../graphql'

interface IModelNumberGridProps extends IInteractiveSection {
  onSelectProduct: ProductSelectFn
  onSelectModel: ModelNumberSelectFn
}

/**
 * Presents a simple drill down for gathering the model number details
 * and serial number if necessary.
 * @param param0 The props for this component
 */
export const ModelNumberGrid: React.FC<IModelNumberGridProps> = ({
  onDismiss: handleDismiss,
  onSelectModel: handleSelectModel,
  onSelectProduct: handleSelectProduct,
  onSubmit: handleSubmit,
  values,
}) => {
  const sectionValid =
    (values.lotted && (values.serial || '').length < 1) ||
    (values.modelNumber || '').length < 1

  const { data: productData } = useProductsQuery({
    variables: {
      search: '',
    },
  })
  const products = productData?.response?.products ?? []

  const { data: unknownModelData } = useModelNumbersQuery({
    variables: {
      search: 'Unknown',
    },
  })
  const unknownModel = unknownModelData?.response?.modelNumbers ?? []

  const { data: modelData } = useModelNumbersQuery({
    variables: {
      productId: values.productId,
      search: '',
    },
  })
  const modelNumbers = modelData?.response?.modelNumbers ?? []

  const handleSelectModelClick = (
    modelNumber?: ModelNumber
  ): React.MouseEventHandler => e => {
    e.preventDefault()
    handleSelectModel(modelNumber as ModelNumber)
  }
  const handleDoesNotKnow = (e: React.MouseEvent) => {
    const unavailableProduct = products.find(
      (p: any) => p?.name.toLowerCase() === 'unknown'
    )
    handleSelectProduct(unavailableProduct as Product)
    handleSelectModel(unknownModel[0] as ModelNumber)
    handleSubmit?.(e)
  }

  return (
    <Flex flexDirection="column" width={1}>
      <Heading.Section>Model Info (1/6)</Heading.Section>
      <Divider.Light />
      <Flex flexDirection={['column', 'row']}>
        <ProductSelectField
          onDismiss={handleDismiss?.('productId')}
          onSelect={handleSelectProduct}
          value={(values.productName as string) || ''}
          label="Product Family"
          placeholder="Select a Product Family"
          name="productId"
        />
      </Flex>
      {values.productId ? (
        <GridNav.Container>
          {modelNumbers.map((modelNumber, id) => {
            return (
              <GridNav.Item
                key={`${modelNumber}Item${id}`}
                selected={modelNumber?.id === values.modelNumber}
              >
                <GridNav.OverlayButton
                  onClick={handleSelectModelClick(modelNumber as ModelNumber)}
                />
                <GridNav.ItemContent>
                  <GridNav.ItemTitle>
                    <GridNav.ItemLink to="/troubleshoot">
                      {modelNumber?.id}
                    </GridNav.ItemLink>
                  </GridNav.ItemTitle>
                  <GridNav.ItemDescription>
                    {modelNumber?.description}
                  </GridNav.ItemDescription>
                </GridNav.ItemContent>
              </GridNav.Item>
            )
          })}
        </GridNav.Container>
      ) : null}
      {values.lotted ? (
        <Flex marginBottom="auto" width={[1]}>
          <Input.Field name="serial" label="Serial Number" required={true} />
        </Flex>
      ) : null}
      <Flex marginTop={2}>
        <Flex width={[1, 2 / 3]}>
          <Form.Button disabled={sectionValid} onClick={handleSubmit}>
            <span>Select Model</span>
          </Form.Button>
        </Flex>
        <Flex width={[1, 1 / 3]} marginLeft={[0, 3]}>
          <Form.Button onClick={handleDoesNotKnow} destructive={true}>
            <span>I Don't Know</span>
          </Form.Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
