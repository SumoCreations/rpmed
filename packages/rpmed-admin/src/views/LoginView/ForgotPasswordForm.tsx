import { faEnvelope } from '@fortawesome/pro-regular-svg-icons'
import { Formik, FormikHelpers } from 'formik'
import * as React from 'react'
import { Card, Form, Indicators, Input } from 'rpmed-ui/lib/V1'
import {
  RequiredEmail,
  OptionalString,
  RequiredString,
  validation,
} from '../../validations'

const validationSchema = validation({
  email: RequiredEmail(),
  userToken: process.env.REACT_APP_DISABLE_CAPTCHA
    ? OptionalString()
    : RequiredString(),
})

interface IFormValues {
  [key: string]: string | undefined
  email?: string | undefined
  userToken?: string | undefined
}

const FormField = Input.Renderer<IFormValues>()
const ErrorSummary = Form.ErrorSummaryRenderer<IFormValues>()

export type ForgotPasswordFormSubmitHandler = (
  values: IFormValues,
  actions: FormikHelpers<any>
) => void

export const ForgotPasswordForm: React.FC<{
  onSubmit: ForgotPasswordFormSubmitHandler
}> = ({ onSubmit }) => (
  <Formik
    initialValues={{ email: '', userToken: '' }}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit, setFieldValue, values, isSubmitting, errors }) => {
      const handleCaptcha = (userToken: string | null): void =>
        setFieldValue('userToken', userToken)
      const hasToken = (values.userToken || '').length > 0
      const useCaptcha = !process.env.REACT_APP_DISABLE_CAPTCHA
      const cannotSubmit = isSubmitting || (useCaptcha && !hasToken)

      console.log(`Can we submit? ${!cannotSubmit}`)
      return (
        <Form.Form onSubmit={handleSubmit}>
          <FormField
            name="email"
            label="Email Address"
            placeholder="name@rpmed.com"
            type="email"
            required={true}
            icon={faEnvelope}
          />
          {useCaptcha ? (
            <Card.CenteredSection as="section">
              <Form.Captcha onChange={handleCaptcha} test={true} />
            </Card.CenteredSection>
          ) : null}
          <ErrorSummary />
          <Form.GeneralError name="_" />
          <Form.Button type="submit" disabled={cannotSubmit}>
            <span>
              {isSubmitting ? (
                <Indicators.Spinner size={'lg'} />
              ) : (
                'Send Reset Email'
              )}
            </span>
          </Form.Button>
        </Form.Form>
      )
    }}
  </Formik>
)
