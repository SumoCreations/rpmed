import { faBarcode } from '@fortawesome/pro-regular-svg-icons'
import React from 'react'
import { Flex } from 'rebass'
import { Form } from 'rpmed-ui/lib/V1'
import {
  ModelNumberSelectField,
  ModelNumberSelectFn,
  ProductSelectField,
  ProductSelectFn,
  ProductTypeSelectField,
  ProductTypeSelectFn,
} from '../../../ProductRegistryView'
import { FormField, IInteractiveSection } from './types'

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
    <Flex flexDirection="column">
      <ProductTypeSelectField
        onDismiss={handleDismiss('productType')}
        onSelect={handleSelectType}
        value={values.productType || ''}
        label="Product Type"
        placeholder="Select a Product Type"
        name="productType"
      />
      {values.productType ? (
        <ProductSelectField
          onDismiss={handleDismiss('productId')}
          onSelect={handleSelectProduct}
          value={(values.productName as string) || ''}
          label="Product Family"
          placeholder="Select a Product Family"
          name="productId"
        />
      ) : null}
      {values.productId && values.productType ? (
        <ModelNumberSelectField
          onDismiss={handleDismiss('modelNumber')}
          onSelect={handleSelectModel}
          value={values.modelNumber || ''}
          label="Model Number"
          placeholder="Select a Model"
          productId={values.productId}
          productType={values.productType}
          name="modelNumber"
        />
      ) : null}
      {values.lotted ? (
        <FormField
          name="serial"
          label="Serial Number"
          placeholder="i.e. 'MC-161000-000000'"
          type="text"
          required={true}
          icon={faBarcode}
        />
      ) : null}
      {!hideSubmit && (
        <Form.Button disabled={sectionValid} onClick={handleSubmit}>
          <span>Select Model</span>
        </Form.Button>
      )}
    </Flex>
  )
}
