import get from 'lodash.get'
import React, { useState } from 'react'
import { Flex } from 'rebass'
import { ProductType, ValidationError, RgaGood } from 'rpmed-schema'
import { Heading, Indicators } from 'rpmed-ui/lib/V1'
import { Modal } from 'rpmed-ui'
import {
  useCreateRgaGoodMutation,
  useUpdateRgaGoodMutation,
} from 'rpmed-schema'
import {
  FormSection,
  RGAGoodForm,
  RGAGoodFormSubmitHandler,
} from './RGAGoodForm'

export const CreateRGAGoodWidget: React.FC<{
  rgaId: string
  onDismiss?: () => void
  onSubmit?: () => void
  shippingSpeed?: string
  good?: RgaGood
}> = ({
  onDismiss: handleDismiss,
  rgaId,
  shippingSpeed,
  good,
  onSubmit: handleExternalSubmission,
}) => {
  const [currentSection, setCurrentSection] = useState(0 as FormSection)
  const [renderForm, setRenderForm] = useState(true)
  const [createRGAGood] = useCreateRgaGoodMutation()
  const [updateRGAGood] = useUpdateRgaGoodMutation()

  const handleSubmit: RGAGoodFormSubmitHandler = async (values, actions) => {
    const rgaGoodInput = {
      customerEmail: values.customerEmail ?? '',
      customerName: values.customerName ?? '',
      customerPhone: values.customerPhone ?? '',
      customerCity: values.customerCity ?? '',
      customerStreet: values.customerStreet ?? '',
      customerStreet2: values.customerStreet2 ?? '',
      customerState: values.customerState ?? '',
      customerZip: values.customerZip ?? '',
      customerCountry: values.customerCountry ?? '',
      modelNumber: values.modelNumber ?? '',
      notes: values.notes ?? '',
      po: values.po ?? '',
      productId: values.productId ?? 'n/a',
      productName: values.productName ?? 'n/a',
      productType: values.productType ?? ProductType.Headlight,
      rma: values.rma ?? '',
      serial: values.serial ?? '',
      symptomId: values.symptomId ?? '',
      warrantied: values.warrantied ?? false,
      shippingSpeed: values.shippingSpeed,
      customerSpecialty: values.customerSpecialty,
    }
    const result = good?.id
      ? updateRGAGood({
          variables: {
            rgaId,
            id: good?.id as string,
            rgaGoodInput,
          },
        })
      : createRGAGood({
          variables: {
            rgaId,
            rgaGoodInput: { ...rgaGoodInput },
          },
        })
    actions.setSubmitting(false)
    const errors = (get(result, 'data.response.errors') ||
      []) as ValidationError[]
    if (errors.length > 0) {
      errors.forEach(({ path, message }) => {
        actions.setFieldError(path, message)
      })
      return
    }
    actions.resetForm()
    // Forces the form to reset to the default section. 'onReset' from
    // formik apparently won't fire as expected...
    setRenderForm(false)
    setTimeout(
      () =>
        handleExternalSubmission
          ? handleExternalSubmission()
          : handleDismiss
          ? handleDismiss()
          : null,
      2000
    )
  }

  const stages = [
    'Model Info',
    'Symptom Info',
    'Warranty Info',
    'Order Info',
    'Customer Info',
    'Shipping Info',
  ]

  return (
    <Modal
      onClose={handleDismiss}
      title={`${stages[currentSection]} (${currentSection + 1}/6)`}
      open
    >
      <Flex flexDirection="column">
        {renderForm ? (
          <RGAGoodForm
            initialValues={{
              customerEmail: good?.customerEmail ?? '',
              customerPhone: good?.customerPhone ?? '',
              customerStreet: good?.customerStreet ?? '',
              customerStreet2: good?.customerStreet2 ?? '',
              customerCity: good?.customerCity ?? '',
              customerState: good?.customerState ?? '',
              customerZip: good?.customerZip ?? '',
              customerCountry: good?.customerCountry ?? '',
              customerName: good?.customerName ?? '',
              modelNumber: good?.modelNumber ?? '',
              notes: good?.notes ?? '',
              po: good?.po ?? '',
              productId: good?.productId ?? undefined,
              productName: good?.productName ?? undefined,
              productType: good?.productType ?? undefined,
              rgaId,
              id: good?.id,
              rma: good?.rma ?? '',
              serial: good?.serial ?? '',
              symptomId: good?.symptomId ?? '',
              warrantied: good?.warrantied ?? false,
              shippingSpeed: good?.shippingSpeed ?? shippingSpeed ?? '',
              customerSpecialty: good?.customerSpecialty ?? '',
            }}
            initialSection={currentSection}
            onSubmit={handleSubmit}
            onSectionChange={setCurrentSection}
          />
        ) : (
          <Heading.Section>
            <Indicators.Spinner size="3x" />
          </Heading.Section>
        )}
      </Flex>
    </Modal>
  )
}
