import { Formik, FormikHelpers } from 'formik'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Form, Input, TextFormContent } from 'rpmed-ui/lib/V1'
import { RequiredEmail, validation } from '../../validations'
import { useCreateRgaMutation } from 'rpmed-schema'
import { ShippingSpeedSelect } from './ShippingSpeedSelect'

const validationSchema = validation({
  email: RequiredEmail(),
})

interface IFormValues {
  [key: string]: string | undefined
  email?: string | undefined
  shippingSpeed: string
}

export type RGAEntryFormSubmitHandler = (
  values: IFormValues,
  actions: FormikHelpers<IFormValues>
) => void

const FormField = Input.Renderer<IFormValues>()

export const CreateRgaView: React.FC = () => {
  const [createRga] = useCreateRgaMutation()
  const navigate = useNavigate()

  const handleFormSubmit = async (
    values: IFormValues,
    actions: FormikHelpers<IFormValues>
  ) => {
    const result = await createRga({
      variables: {
        rgaInput: {
          shippingSpeed: values.shippingSpeed,
          submittedBy: values.email as string,
          submittedOn: new Date().toISOString(),
        },
      },
    })
    actions.setSubmitting(false)
    const rga =
      (result.data && result.data.response && result.data.response.rga) || null
    if (rga) {
      navigate(`/medled/rga/${rga.id}`)
    }
    return
  }
  return (
    <TextFormContent>
      <p className="mb-4">
        This form is for commercial partners and resellers only. If you are a
        customer or end user please use our{' '}
        <Link to="/medled/service-request">service request</Link> form. If you
        do not have a distributor identifier please{' '}
        <Link to="/contact">contact us directly</Link>.
      </p>
      <Card.View>
        <Formik
          initialValues={{ email: '', shippingSpeed: 'Ground' } as IFormValues}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, handleSubmit, isSubmitting, setFieldValue, values }) => {
            const handleShippingSpeed = (shippingSpeed: string) => {
              setFieldValue('shippingSpeed', shippingSpeed)
            }
            return (
              <Form.Form onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.RowItem size={Form.ItemSize.Long}>
                    <FormField
                      name="email"
                      label="Email Address"
                      required={true}
                      type="text"
                    />
                  </Form.RowItem>
                  <Form.RowItem size={Form.ItemSize.Short}>
                    <ShippingSpeedSelect
                      value={values.shippingSpeed || 'Ground'}
                      onSelect={handleShippingSpeed}
                    />
                  </Form.RowItem>
                </Form.Row>
                <Form.Button
                  type="submit"
                  disabled={
                    isSubmitting || (errors && Object.keys(errors).length > 0)
                  }
                >
                  <span>Create RGA Request</span>
                </Form.Button>
              </Form.Form>
            )
          }}
        </Formik>
      </Card.View>
    </TextFormContent>
  )
}
