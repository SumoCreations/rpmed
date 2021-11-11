import get from 'lodash.get'
import React, { useState } from 'react'
import { Flex } from 'rebass'
import { ErrorList } from 'rpmed-validation-schema'
import { ProductType } from '../../../schema'
import { Card, Divider, Heading, Indicators } from 'rpmed-ui/lib/V1'
import { useCreateRGAGood } from '../graphql'
import { RGAGoodForm, RGAGoodFormSubmitHandler } from './RGAGoodForm'

export const CreateRGAGoodWidget: React.FunctionComponent<{
  rgaId: string
  shippingSpeed?: string
  onCreate?: () => void
}> = ({ onCreate, rgaId, shippingSpeed }) => {
  const [renderForm, setRenderForm] = useState(true)
  const createRGAGood = useCreateRGAGood()
  const handleSubmit: RGAGoodFormSubmitHandler = async (values, actions) => {
    const result = await createRGAGood({
      variables: {
        rgaId,
        rgaGoodInput: {
          customerEmail: values.customerEmail ?? '',
          customerName: values.customerName ?? '',
          customerSpecialty: values.customerSpecialty ?? '',
          customerPhone: values.customerPhone ?? '',
          customerStreet: values.customerStreet ?? '',
          customerStreet2: values.customerStreet2 ?? '',
          customerCity: values.customerCity ?? '',
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
          shippingSpeed: (values.shippingSpeed ?? 'Ground') as string,
          serial: values.serial ?? '',
          symptomId: values.symptomId ?? '',
          warrantied: values.warrantied ?? false,
        },
      },
    })
    actions.setSubmitting(false)
    const errors = (get(result, 'data.response.errors') || []) as ErrorList
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
    if (onCreate) {
      onCreate()
    }
    setTimeout(() => setRenderForm(true), 1000)
  }

  return (
    <Card.Flat>
      <Flex flexDirection="column">
        <Heading.Section>Add Good</Heading.Section>
        <Divider.Light />
        {renderForm ? (
          <RGAGoodForm
            initialValues={{
              warrantied: false,
              shippingSpeed: shippingSpeed ?? 'Ground',
            }}
            onSubmit={handleSubmit}
          />
        ) : (
          <Heading.Section>
            <Indicators.Spinner size="3x" />
          </Heading.Section>
        )}
      </Flex>
    </Card.Flat>
  )
}
