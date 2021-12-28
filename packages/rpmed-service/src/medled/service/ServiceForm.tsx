import { Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { Card, Form, Input } from 'rpmed-ui'

export interface IServiceFormValues {
  name: string
  email: string
  hospital: string
  phoneNumber: string
  zipcode: string
  website: string
  comments: string
}

const initialValues: IServiceFormValues = {
  comments: '',
  email: '',
  hospital: '',
  name: '',
  phoneNumber: '',
  website: '',
  zipcode: '',
}

export const ServiceForm: React.FC = () => {
  const [userToken, setUserToken] = useState('')
  const handleCaptcha = (token: string | null): void =>
    setUserToken(token || '')

  const handleSubmit = (
    values: IServiceFormValues,
    actions: FormikHelpers<IServiceFormValues>
  ) => {
    return
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
          <Input.Field
            name="notes"
            label="Service Notes"
            required={false}
            type="textarea"
          />
          <Form.Captcha onChange={handleCaptcha} test={true} />
          <Form.Button type="submit" disabled={userToken.length === 0}>
            <span>Submit Your Service Request</span>
          </Form.Button>
        </Form.Form>
      </Card.View>
    </Formik>
  )
}
