import { Formik, FormikHelpers } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'
import { Card, Form, Input } from 'rpmed-ui'

const { useState } = React

export interface IContactFormValues {
  name: string
  email: string
  zipcode: string
  phoneNumber: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('cannot be blank'),
  name: Yup.string().required('cannot be blank'),
  phoneNumber: Yup.string().required('cannot be blank'),
  zipCode: Yup.string().required('cannot be blank'),
})

export const ContactForm: React.FC = props => {
  const [userToken, setUserToken] = useState('')
  const handleCaptcha = (token: string | null): void =>
    setUserToken(token || '')

  const onSubmit = (
    values: IContactFormValues,
    actions: FormikHelpers<IContactFormValues>
  ) => {
    actions.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{ email: '' } as IContactFormValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => {
        return (
          <Card.View>
            <Form.Form>
              <Input.Field
                name="name"
                label="Full Name"
                required={true}
                type="text"
              />
              <Input.Field
                name="email"
                label="Email"
                required={true}
                type="text"
              />
              <Form.Row>
                <Form.RowItem size={Form.ItemSize.Short}>
                  <Input.Field
                    name="zipcode"
                    label="Zip / Postal"
                    required={true}
                    type="text"
                  />
                </Form.RowItem>
                <Form.RowItem size={Form.ItemSize.Medium}>
                  <Input.Field
                    name="phoneNumber"
                    label="Phone Number"
                    required={false}
                    type="text"
                  />
                </Form.RowItem>
              </Form.Row>
              <Input.Field name="website" label="Website" type="text" />
              <Input.Field
                name="comments"
                label="Comments"
                required={true}
                type="textarea"
              />
              <Form.Captcha onChange={handleCaptcha} test={true} />
              <Form.Button type="submit" disabled={userToken.length === 0}>
                <span>Contact Riverpoint</span>
              </Form.Button>
            </Form.Form>
          </Card.View>
        )
      }}
    </Formik>
  )
}
