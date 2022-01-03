import { faEnvelope } from '@fortawesome/pro-regular-svg-icons'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'
import { Form, Indicators, Input } from 'rpmed-ui/lib/V1'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
})

export interface IUserFormValues {
  [key: string]: string | null | undefined
  id?: string | null | undefined
  email?: string | null | undefined
  firstName?: string | null | undefined
  lastName?: string | null | undefined
}

export type UserFormSubmitHandler = (
  values: IUserFormValues,
  actions: FormikHelpers<IUserFormValues>
) => void

interface IUserFormProps {
  initialValues: IUserFormValues
  onSubmit: UserFormSubmitHandler
}

const FormField = Input.Renderer<IUserFormValues>()

const renderForm = ({
  handleSubmit,
  isSubmitting,
  values,
}: FormikProps<IUserFormValues>) => {
  const cannotSubmit = isSubmitting
  return (
    <Form.Form disabled={isSubmitting} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.RowItem size={Form.ItemSize.Medium}>
          <FormField
            name="firstName"
            label="First Name"
            placeholder="Jane"
            type="text"
            required={true}
          />
        </Form.RowItem>
        <Form.RowItem size={Form.ItemSize.Medium}>
          <FormField
            name="lastName"
            label="Last Name"
            placeholder="Appleseed"
            type="text"
            required={true}
          />
        </Form.RowItem>
      </Form.Row>
      <Form.Row>
        <Form.RowItem size={Form.ItemSize.Long}>
          <FormField
            name="email"
            label="Email Address"
            placeholder="name@rpmed.com"
            type="email"
            required={true}
            icon={faEnvelope}
          />
        </Form.RowItem>
      </Form.Row>
      <Form.GeneralError name="credentials" />
      <Form.Button type="submit" disabled={cannotSubmit}>
        <span>
          {isSubmitting ? (
            <Indicators.Spinner size={'lg'} />
          ) : values.id ? (
            'Update User'
          ) : (
            'Create User'
          )}
        </span>
      </Form.Button>
    </Form.Form>
  )
}

export const UserForm: React.FC<IUserFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      render={renderForm}
      validationSchema={validationSchema}
    />
  )
}
