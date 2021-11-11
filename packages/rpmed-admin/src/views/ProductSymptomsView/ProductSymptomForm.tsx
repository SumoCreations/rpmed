import { faBarcodeRead, faTag } from '@fortawesome/pro-regular-svg-icons'
import { Formik, FormikHelpers, FormikProps } from 'formik'

import * as React from 'react'
import * as Validation from 'rpmed-validation-schema'
import { Form, Indicators, Input, Switch } from 'rpmed-ui/lib/V1'
import { ProductSymptomFieldValue } from './graphql'

interface IProductSymptomFormValues {
  [key: string]: ProductSymptomFieldValue
  id?: string | undefined
  name?: string | undefined
  preApproved?: boolean | undefined
  faultCode?: string | undefined
  fee?: boolean | undefined
  synopsis?: string | undefined
  solution?: string | undefined
  careTip?: string | null | undefined
}

export type ProductSymptomFormSubmitHandler = (
  values: IProductSymptomFormValues,
  actions: FormikHelpers<IProductSymptomFormValues>
) => void

interface IProductSymptomFormProps {
  initialValues: IProductSymptomFormValues
  onSubmit: ProductSymptomFormSubmitHandler
}

const FormField = Input.Renderer<IProductSymptomFormValues>()

const renderForm = ({
  handleSubmit,
  isSubmitting,
  values,
  setFieldValue,
}: FormikProps<IProductSymptomFormValues>) => {
  const cannotSubmit = isSubmitting
  const toggleFee = () => setFieldValue('fee', !values.fee)
  const togglePreapproved = () =>
    setFieldValue('preApproved', !values.preApproved)

  return (
    <Form.Form disabled={isSubmitting} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.RowItem size={Form.ItemSize.Long}>
          <FormField
            name="name"
            label="Name"
            placeholder="i.e. 'Light randomly turns off (stobes/blinks)'"
            type="text"
            required={true}
            icon={faTag}
          />
        </Form.RowItem>
      </Form.Row>
      <Form.Row>
        <Form.RowItem size={Form.ItemSize.Medium}>
          <FormField
            name="faultCode"
            label={'Fault Code'}
            type="faultCode"
            required={true}
            icon={faBarcodeRead}
            placeholder="i.e. 'EHIJ'"
          />
        </Form.RowItem>
        <Form.RowItem size={Form.ItemSize.Short}>
          <Input.FieldContainer>
            <Form.Label>Fee?</Form.Label>
            <Switch.View on={values.fee} onClick={toggleFee} />
          </Input.FieldContainer>
        </Form.RowItem>
        <Form.RowItem size={Form.ItemSize.Short}>
          <Input.FieldContainer>
            <Form.Label>Pre-approved Repair</Form.Label>
            <Switch.View on={values.preApproved} onClick={togglePreapproved} />
          </Input.FieldContainer>
        </Form.RowItem>
      </Form.Row>
      <Form.Row>
        <Form.RowItem size={Form.ItemSize.Long}>
          <FormField
            name="synopsis"
            label="Synopsis"
            placeholder="i.e. 'LED signal interrupted due to a break in the wire or the circuit board(s) are corroded or damaged.'"
            type="text"
            required={true}
            icon={faTag}
          />
        </Form.RowItem>
      </Form.Row>
      <Form.Row>
        <Form.RowItem size={Form.ItemSize.Long}>
          <FormField
            name="solution"
            label="Solution"
            placeholder="i.e. 'Replace light housing module because it needs a new wire harness and/or circuit boards.'"
            type="text"
            required={true}
            icon={faTag}
          />
        </Form.RowItem>
      </Form.Row>
      <Form.Row>
        <Form.RowItem size={Form.ItemSize.Long}>
          <FormField
            name="careTip"
            label="Care Tip"
            placeholder="i.e. 'Improper cleaning can result in damage (see Cleaning Guide)'"
            type="text"
            required={false}
            icon={faTag}
          />
        </Form.RowItem>
      </Form.Row>
      <Form.GeneralError name="_" />
      <Form.Button type="submit" disabled={cannotSubmit}>
        <span>
          {isSubmitting ? (
            <Indicators.Spinner size={'lg'} />
          ) : values.id ? (
            'Update Symptom'
          ) : (
            'Create Symptom'
          )}
        </span>
      </Form.Button>
    </Form.Form>
  )
}

export const ProductSymptomForm: React.FunctionComponent<IProductSymptomFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      render={renderForm}
      validationSchema={Validation.ProductSymptom.Default}
    />
  )
}
