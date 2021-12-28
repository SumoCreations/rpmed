import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons'
import { faTimes } from '@fortawesome/pro-solid-svg-icons'
import get from 'lodash.get'
import React, { useState } from 'react'
import { Flex } from 'rebass'
import { ProductType, ValidationError, RgaGood } from 'rpmed-schema'
import { Divider, Heading, IconButton, Indicators, Modal } from 'rpmed-ui'
import { useCreateRgaGoodMutation, useUpdateRgaGoodMutation } from './graphql'
import {
  FormSection,
  RGAGoodForm,
  RGAGoodFormSubmitHandler,
} from './RGAGoodForm'

export const CreateRGAGoodWidget: React.FunctionComponent<{
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
  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  return (
    <Modal.Dialog
      size={Modal.Size.default}
      onDismiss={handleDismiss || undefined}
    >
      <Flex flexDirection="column" paddingTop={3}>
        <Flex style={{ marginBottom: '1rem' }}>
          {currentSection > 0 ? (
            <IconButton icon={faArrowLeft} onClick={handleBack} />
          ) : null}
          <span style={{ display: 'flex', flexGrow: 1 }} />
          <IconButton icon={faTimes} onClick={handleDismiss} />
        </Flex>
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
    </Modal.Dialog>
  )
}
