import React from 'react'
import { Flex } from 'rebass'
import { Form, Input } from 'rpmed-ui/lib/V1'
import { ModelNumber, Product } from 'rpmed-schema'
import { ModelNumberSelectFn } from './ModelNumberSelectField'
import { ProductSelectField, ProductSelectFn } from './ProductSelectField'
import { IInteractiveSection } from './types'
import { useModelNumbersQuery, useProductsQuery } from 'rpmed-schema'
import { ItemList } from './ItemList'

interface IModelNumberGridProps extends IInteractiveSection {
  onSelectProduct: ProductSelectFn
  onSelectModel: ModelNumberSelectFn
}

const FormField = Input.Renderer<{ serial?: string }>()

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

  const handleSelectItem = (id?: string) => {
    const model = modelNumbers.find(m => m?.id === id)
    handleSelectModel(model as ModelNumber)
  }

  const handleDoesNotKnow = (e: React.MouseEvent) => {
    const unavailableProduct = products.find(
      (p: any) => p?.name.toLowerCase() === 'unknown'
    )
    handleSelectProduct(unavailableProduct as Product)
    handleSelectModel(unknownModel[0] as ModelNumber)
    handleSubmit?.(e)
  }
  console.log(values)
  return (
    <Flex flexDirection="column" width={1}>
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
        <ItemList
          onSelect={handleSelectItem}
          items={modelNumbers.map(m => ({
            id: m?.id ?? 'n/a',
            selected: m?.id === values.modelNumber,
            title: m?.id ?? 'n/a',
            description: m?.description ?? '...',
          }))}
        />
      ) : null}
      {values.lotted ? (
        <Flex marginBottom="auto" width={[1]}>
          <FormField name="serial" label="Serial Number" required={true} />
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
