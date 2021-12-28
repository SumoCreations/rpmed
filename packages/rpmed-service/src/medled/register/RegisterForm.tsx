import { Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Card, Form, Input } from 'rpmed-ui'

const validationSchema = Yup.object({
  email: Yup.string()
    .email()
    .required(),
  name: Yup.string().required(),
  modelNumber: Yup.string().required(),
  serial: Yup.string().required(),
  hospital: Yup.string().required(),
  phoneNumber: Yup.string().required(),
  zipCode: Yup.string().required(),
  website: Yup.string(),
})

export interface IRegisterFormValues {
  name: string
  email: string
  hospital: string
  phoneNumber: string
  zipcode: string
  modelNumber: string
  serial: string
  website: string
}

const initialValues: IRegisterFormValues = {
  email: '',
  hospital: '',
  name: '',
  phoneNumber: '',
  modelNumber: '',
  zipcode: '',
  serial: '',
  website: '',
}

export const RegisterForm: React.FC = () => {
  const [userToken, setUserToken] = useState('')
  const handleCaptcha = (token: string | null): void =>
    setUserToken(token || '')

  const handleSubmit = (
    values: IRegisterFormValues,
    actions: FormikHelpers<IRegisterFormValues>
  ) => {
    return
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Card.View>
        <Form.Form>
          <Input.Field
            name="name"
            label="Full Name"
            required={true}
            type="text"
          />
          <Input.Field
            name="hospital"
            label="Hospital"
            required={true}
            type="text"
          />
          <Input.Field name="email" label="Email" required={true} type="text" />
          <Form.Row>
            <Form.RowItem size={Form.ItemSize.Medium}>
              <Input.Field
                name="phoneNumber"
                label="Phone Number"
                required={true}
                type="text"
              />
            </Form.RowItem>
            <Form.RowItem size={Form.ItemSize.Short}>
              <Input.Field
                name="zipcode"
                label="Zip / Postal"
                required={true}
                type="text"
              />
            </Form.RowItem>
          </Form.Row>
          <Input.Field name="website" label="Website" type="text" />
          <Input.Field name="model" label="Model" required={true} type="text" />
          <Input.Field
            name="serialNumber"
            label="Serial Number"
            required={true}
            type="text"
          />
          <Form.Captcha onChange={handleCaptcha} test={true} />
          <Form.Button type="submit" disabled={userToken.length === 0}>
            <span>Submit Your Registration</span>
          </Form.Button>
        </Form.Form>
      </Card.View>
    </Formik>
  )
}
