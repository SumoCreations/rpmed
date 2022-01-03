import { faStickyNote, faTag } from '@fortawesome/pro-regular-svg-icons'
import { Formik, FormikHelpers, FormikProps } from 'formik'

import * as React from 'react'
import * as Validation from 'rpmed-validation-schema'
import { Form, Indicators, Input } from 'rpmed-ui/lib/V1'
import { ProductInput } from 'rpmed-schema'

interface IProductFormValues extends ProductInput {}

export type ProductFormSubmitHandler = (
  values: IProductFormValues,
  actions: FormikHelpers<IProductFormValues>
) => void

interface IProductFormProps {
  initialValues: IProductFormValues
  onSubmit: ProductFormSubmitHandler
}

const FormField = Input.Renderer<IProductFormValues>()

const renderForm = ({
  handleSubmit,
  isSubmitting,
  values,
}: FormikProps<IProductFormValues>) => {
  const cannotSubmit = isSubmitting
  return (
    <Form.Form disabled={isSubmitting} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.RowItem size={Form.ItemSize.Long}>
          <FormField
            name="name"
            label="Name"
            placeholder="MC7 PRO"
            type="text"
            required={true}
            icon={faTag}
          />
        </Form.RowItem>
      </Form.Row>
      <Form.Row>
        <Form.RowItem size={Form.ItemSize.Long}>
          <FormField
            name="description"
            label={'Description'}
            type="text"
            required={true}
            icon={faStickyNote}
            placeholder="MedLED Chrome® MC7 PRO Surgical Headlight"
          />
        </Form.RowItem>
      </Form.Row>
      <Form.GeneralError name="_" />
      <Form.Button type="submit" disabled={cannotSubmit}>
        <span>
          {isSubmitting ? (
            <Indicators.Spinner size={'lg'} />
          ) : values.id ? (
            'Update Product'
          ) : (
            'Create Product'
          )}
        </span>
      </Form.Button>
    </Form.Form>
  )
}

export const ProductForm: React.FC<IProductFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      render={renderForm}
      validationSchema={Validation.Product.Default}
    />
  )
}
