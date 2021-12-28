import { Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { Card, Form, Input } from 'rpmed-ui'

export interface IBatteryFormValues {
  address: string
  address2: string
  city: string
  comments: string
  country: string
  name: string
  email: string
  hospital: string
  phoneNumber: string
  state: string
  zipcode: string
  website: string
}

const initialValues: IBatteryFormValues = {
  address: '',
  address2: '',
  city: '',
  comments: '',
  country: '',
  email: '',
  hospital: '',
  name: '',
  phoneNumber: '',
  state: '',
  website: '',
  zipcode: '',
}

export const BatteryForm: React.FC = () => {
  const [userToken, setUserToken] = useState('')
  const handleCaptcha = (token: string | null): void =>
    setUserToken(token || '')
  const handleSubmit = (
    values: IBatteryFormValues,
    actions: FormikHelpers<IBatteryFormValues>
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
          <Input.Field name="email" label="Email" required={true} type="text" />
          <Input.Field
            name="hospital"
            label="Hospital"
            required={true}
            type="text"
          />
          <Input.Field
            name="address"
            label="Street Address"
            required={true}
            type="text"
          />
          <Input.Field
            name="address2"
            label="Address Line 2"
            required={true}
            type="text"
          />
          <Form.Row>
            <Form.RowItem size={Form.ItemSize.Medium}>
              <Input.Field
                name="city"
                label="City"
                required={true}
                type="text"
              />
            </Form.RowItem>
            <Form.RowItem size={Form.ItemSize.Medium}>
              <Input.Field
                name="state"
                label="State"
                required={true}
                type="text"
              />
            </Form.RowItem>
          </Form.Row>
          <Form.Row>
            <Form.RowItem size={Form.ItemSize.Medium}>
              <Input.Field
                name="country"
                label="Country"
                required={true}
                type="text"
              />
            </Form.RowItem>
            <Form.RowItem size={Form.ItemSize.Medium}>
              <Input.Field
                name="zipcode"
                label="Zip / Postal"
                required={true}
                type="text"
              />
            </Form.RowItem>
          </Form.Row>
          <Input.Field
            name="phoneNumber"
            label="Phone Number"
            required={true}
            type="text"
          />
          <Input.Field name="website" label="Website" type="text" />
          <Input.Field
            name="comments"
            label="Comments / Notes"
            required={false}
            type="textarea"
          />
          <Form.Captcha onChange={handleCaptcha} test={true} />
          <Form.Button type="submit" disabled={userToken.length === 0}>
            <span>Request a Quote</span>
          </Form.Button>
        </Form.Form>
      </Card.View>
    </Formik>
  )
}
