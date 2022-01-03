import { faTimes } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import React from 'react'
import { Box, Flex } from 'rebass'
import { ErrorList } from 'rpmed-validation-schema'
import { ProductType, RgaGood } from 'rpmed-schema'
import { Actions, Heading, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import { mapDefaultValues } from '../../../validations'
import { useUpdateRGAGood } from '../graphql'
import {
  IRGAEditGoodFormValues,
  RGAGoodEditForm,
} from './RGAGoodEditForm/RgaGoodEditForm'
import { RGAGoodFormSubmitHandler } from './RGAGoodForm'

export const EditRGAGoodView: React.FC<{
  good: RgaGood
  rgaId: string
  onDismiss: () => any
  onUpdate?: () => void
}> = ({ good, onDismiss: dismiss, onUpdate: handleUpdate, rgaId }) => {
  const updateRgaGood = useUpdateRGAGood()
  const handleSubmit: RGAGoodFormSubmitHandler = async (values, actions) => {
    const result = await updateRgaGood({
      variables: {
        id: good.id,
        rgaGoodInput: {
          customerEmail: values.customerEmail,
          customerName: values.customerName,
          customerSpecialty: values.customerSpecialty,
          customerPhone: values.customerPhone,
          customerStreet: values.customerStreet,
          customerStreet2: values.customerStreet2,
          customerCity: values.customerCity,
          customerState: values.customerState,
          customerZip: values.customerZip,
          customerCountry: values.customerCountry,
          modelNumber: values.modelNumber,
          notes: values.notes ?? 'n/a',
          po: values.po ?? 'n/a',
          productId: values.productId ?? 'n/a',
          productName: values.productName ?? 'n/a',
          productType: values.productType ?? ProductType.Headlight,
          rma: values.rma ?? 'n/a',
          serial: values.serial ?? 'n/a',
          shippingSpeed: values.shippingSpeed ?? 'Ground',
          symptomId: values.symptomId as string,
          warrantied: values.ssd === true ? false : values.warrantied ?? false,
          ssd: values.ssd === true,
          additionalComments: values.additionalComments,
          datePurchased: values.datePurchased,
          disposition: values.disposition,
          newSerial: values.newSerial,
          lotted: values.lotted,
        },
        rgaId,
      },
    })
    actions.setSubmitting(false)
    const errors = (get(result, 'data.response.errors') || []) as ErrorList
    if (errors.length > 0) {
      errors.forEach(({ path, message }) => {
        actions.setFieldError((path as any), message)
      })
      return
    }
    if (handleUpdate) {
      handleUpdate()
    }
    dismiss()
  }
  const initialValues = mapDefaultValues<IRGAEditGoodFormValues>(
    { ...good } as IRGAEditGoodFormValues,
    { warrantied: false } as any
  )
  return (
    <Layout.FullScreen>
      <Box my={[1, 1, 1, 4]} mx="auto" width={[1, 1, 1, 3 / 4]}>
        <Toolbar.View>
          <Toolbar.Item spreadLeft={false}>
            <Actions.Group>
              <Actions.Toolbar onClick={dismiss}>
                <FontAwesomeIcon icon={faTimes} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
          <Box width={1} my="auto" mx={3}>
            <Flex flexDirection="column">
              <Heading.ToolBarOne>Editing Good</Heading.ToolBarOne>
              <Heading.ToolBarTwo>
                {good.modelNumber} {good.lotted ? `(${good.serial})` : ''}
              </Heading.ToolBarTwo>
            </Flex>
          </Box>
        </Toolbar.View>
        <RGAGoodEditForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={dismiss}
        />
      </Box>
    </Layout.FullScreen>
  )
}
