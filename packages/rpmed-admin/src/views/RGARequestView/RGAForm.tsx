import { faCalendarDay, faEnvelope } from '@fortawesome/pro-regular-svg-icons'
import { Formik, FormikHelpers } from 'formik'

import * as React from 'react'
import * as Validation from 'rpmed-validation-schema'
import { Form, Indicators, Input } from 'rpmed-ui/lib/V1'
import { ShippingSpeedSelect } from './RgaShippingSpeedSelect'

interface IRGAFormValues {
  [key: string]: string | undefined
  id?: string | undefined
  name?: string | undefined
  email?: string | undefined
  shippingSpeed?: string | undefined
}

export type RGAFormSubmitHandler = (
  values: IRGAFormValues,
  formikHelpers: FormikHelpers<IRGAFormValues>
) => void

interface IRGAFormProps {
  initialValues: IRGAFormValues
  onSubmit: RGAFormSubmitHandler
}

const FormField = Input.Renderer<IRGAFormValues>()

export const RGAForm: React.FunctionComponent<IRGAFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={Validation.RGA.Default}
    >
      {({ handleSubmit, isSubmitting, values, setFieldValue }) => {
        const cannotSubmit = isSubmitting
        const handleShippingSpeed = (value: string) => {
          setFieldValue('shippingSpeed', value)
        }
        return (
          <React.Fragment>
            <Form.Form onSubmit={handleSubmit}>
              <Form.Row>
                <Form.RowItem size={Form.ItemSize.Short}>
                  <FormField
                    name="submittedOn"
                    label={'Submitted On'}
                    type="text"
                    required={true}
                    disabled={true}
                    icon={faCalendarDay}
                  />
                </Form.RowItem>
                <Form.RowItem size={Form.ItemSize.Long}>
                  <FormField
                    name="submittedBy"
                    label="Submitted / Received by"
                    placeholder="i.e. 'jane@klsmartin.com'"
                    type="email"
                    required={true}
                    icon={faEnvelope}
                  />
                </Form.RowItem>
                <Form.RowItem size={Form.ItemSize.Long}>
                  <ShippingSpeedSelect
                    value={values.shippingSpeed || 'Ground'}
                    onSelect={handleShippingSpeed}
                  />
                </Form.RowItem>
              </Form.Row>
              <Form.Row>
                <Form.GeneralError name="_" />
              </Form.Row>
              <Form.Row>
                <Form.Button type="submit" disabled={cannotSubmit}>
                  <span>
                    {isSubmitting ? (
                      <Indicators.Spinner size={'lg'} />
                    ) : values.id ? (
                      'Update RGA'
                    ) : (
                      'Create RGA'
                    )}
                  </span>
                </Form.Button>
              </Form.Row>
            </Form.Form>
          </React.Fragment>
        )
      }}
    </Formik>
  )
}
