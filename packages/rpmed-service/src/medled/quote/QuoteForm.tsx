import { Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { Card, Form, Input } from 'rpmed-ui'

export interface IQuoteFormValues {
  name: string
  email: string
  hospital: string
  phoneNumber: string
  zipcode: string
  website: string
  comments: string
}

const initialValues: IQuoteFormValues = {
  comments: '',
  email: '',
  hospital: '',
  name: '',
  phoneNumber: '',
  website: '',
  zipcode: '',
}

export const QuoteForm: React.FC = () => {
  const [userToken, setUserToken] = useState('')
  const handleCaptcha = (token: string | null): void =>
    setUserToken(token || '')

  const handleSubmitForm = (
    values: IQuoteFormValues,
    actions: FormikHelpers<IQuoteFormValues>
  ) => {
    return
  }

  return (
    <Formik
      onSubmit={handleSubmitForm}
      initialValues={initialValues as IQuoteFormValues}
    >
      {({ handleSubmit, submitForm }) => {
        return (
          <Card.View>
            <Form.Form onSubmit={handleSubmit}>
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
              <Input.Field
                name="hospital"
                label="Hospital"
                required={true}
                type="text"
              />
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
              <Input.Field
                name="comments"
                label="Anything else you'd like to let us to know?"
                required={false}
                type="textarea"
              />
              <Form.Captcha onChange={handleCaptcha} test={true} />
              <Form.Button
                type="submit"
                onClick={submitForm}
                disabled={userToken.length === 0}
              >
                <span>Request a Quote</span>
              </Form.Button>
            </Form.Form>
          </Card.View>
        )
      }}
    </Formik>
  )
}
