import React from 'react'
import { Flex } from 'rebass'
import { Form, Input } from 'rpmed-ui'
import {
  ModelNumberSelectField,
  ModelNumberSelectFn,
} from './ModelNumberSelectField'
import { ProductSelectField, ProductSelectFn } from './ProductSelectField'
import {
  ProductTypeSelectField,
  ProductTypeSelectFn,
} from './ProductTypeSelectField'
import { IInteractiveSection } from './types'

interface IModelNumberSectionProps extends IInteractiveSection {
  onSelectProductType: ProductTypeSelectFn
  onSelectProduct: ProductSelectFn
  onSelectModel: ModelNumberSelectFn
}

/**
 * Presents a simple drill down for gathering the model number details
 * and serial number if necessary.
 * @param param0 The props for this component
 */
export const ModelNumberSection: React.FC<IModelNumberSectionProps> = ({
  hideSubmit,
  onDismiss: handleDismiss,
  onSelectModel: handleSelectModel,
  onSelectProductType: handleSelectType,
  onSelectProduct: handleSelectProduct,
  onSubmit: handleSubmit,
  values,
}) => {
  const sectionValid =
    (values.lotted && (values.serial || '').length < 1) ||
    (values.modelNumber || '').length < 1
  return (
    <Flex flexDirection="column" width={1}>
      <Flex flexDirection={['column', 'row']}>
        <Flex width={[1, 1 / 2]} marginRight={[0, 2]}>
          <ProductTypeSelectField
            onDismiss={handleDismiss?.('productType')}
            onSelect={handleSelectType}
            value={values.productType || ''}
            label="Product Type"
            placeholder="Select a Product Type"
            name="productType"
          />
        </Flex>
        {values.productType ? (
          <ProductSelectField
            onDismiss={handleDismiss?.('productId')}
            onSelect={handleSelectProduct}
            value={(values.productName as string) || ''}
            label="Product Family"
            placeholder="Select a Product Family"
            name="productId"
          />
        ) : null}
      </Flex>
      <Flex flexDirection={['column', 'row']}>
        {values.productId && values.productType ? (
          <Flex width={[1, 1 / 2]} marginRight={[0, 2]}>
            <ModelNumberSelectField
              onDismiss={handleDismiss?.('modelNumber')}
              onSelect={handleSelectModel}
              value={values.modelNumber || ''}
              label="Model Number"
              placeholder="Select a Model"
              productId={values.productId}
              productType={values.productType}
              name="modelNumber"
            />
          </Flex>
        ) : null}
        {values.lotted ? (
          <Flex marginBottom="auto" width={[1, 1 / 2]}>
            <Input.Field
              name="serial"
              label="Serial Number"
              placeholder="i.e. 'MC-161000-000000'"
              type="text"
              required={true}
            />
          </Flex>
        ) : null}
      </Flex>
      {!hideSubmit && (
        <Flex width={[1, values.lotted ? 1 : 1 / 2]}>
          <Form.Button disabled={sectionValid} onClick={handleSubmit}>
            <span>Select Model</span>
          </Form.Button>
        </Flex>
      )}
    </Flex>
  )
}
