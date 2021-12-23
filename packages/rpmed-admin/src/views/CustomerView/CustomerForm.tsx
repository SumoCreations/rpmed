import { faEnvelope, faTag } from '@fortawesome/pro-regular-svg-icons'
import { Formik, FormikHelpers, FormikProps } from 'formik'

import * as React from 'react'
import * as Validation from 'rpmed-validation-schema'
import { Form, Indicators, Input } from 'rpmed-ui/lib/V1'

export interface ICustomerFormValues {
  [key: string]: string | undefined
  id?: string | undefined
  name?: string | undefined
  email?: string | undefined
}

export type CustomerFormSubmitHandler = (
  values: ICustomerFormValues,
  actions: FormikHelpers<ICustomerFormValues>
) => void

interface ICustomerFormProps {
  initialValues: ICustomerFormValues
  onSubmit: CustomerFormSubmitHandler
}

const FormField = Input.Renderer<ICustomerFormValues>()

const renderForm = ({
  handleSubmit,
  isSubmitting,
  values,
}: FormikProps<ICustomerFormValues>) => {
  const cannotSubmit = isSubmitting
  return (
    <Form.Form disabled={isSubmitting} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.RowItem size={Form.ItemSize.Long}>
          <FormField
            name="name"
            label="Name"
            placeholder="i.e. 'Jane Appleseed'"
            type="text"
            required={true}
            icon={faTag}
          />
        </Form.RowItem>
      </Form.Row>
      <Form.Row>
        <Form.RowItem size={Form.ItemSize.Long}>
          <FormField
            name="email"
            label={'Email'}
            type="email"
            required={true}
            icon={faEnvelope}
            placeholder="i.e. 'jane@rpmed.com'"
          />
        </Form.RowItem>
      </Form.Row>
      <Form.GeneralError name="_" />
      <Form.Button type="submit" disabled={cannotSubmit}>
        <span>
          {isSubmitting ? (
            <Indicators.Spinner size={'lg'} />
          ) : values.id ? (
            'Update Customer'
          ) : (
            'Create Customer'
          )}
        </span>
      </Form.Button>
    </Form.Form>
  )
}

export const CustomerForm: React.FunctionComponent<ICustomerFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      render={renderForm}
      validationSchema={Validation.Customer.Default}
    />
  )
}
