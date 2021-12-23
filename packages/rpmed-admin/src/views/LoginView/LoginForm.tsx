import { faEnvelope, faLock } from '@fortawesome/pro-regular-svg-icons'
import { Formik, FormikHelpers } from 'formik'
import * as React from 'react'
import { OptionalString } from 'rpmed-validation-schema'
import { Card, Form, Indicators, Input } from 'rpmed-ui/lib/V1'
import {
  RequiredEmail,
  RequiredPassword,
  RequiredString,
  validation,
} from '../../validations'

const validationSchema = validation({
  email: RequiredEmail(),
  password: RequiredPassword(),
  userToken: process.env.REACT_APP_DISABLE_CAPTCHA
    ? OptionalString()
    : RequiredString(),
})

interface IFormValues {
  [key: string]: string | undefined
  email?: string | undefined
  password?: string | undefined
  userToken?: string | undefined
}

const FormField = Input.Renderer<IFormValues>()

export type LoginFormSubmitHandler = (
  values: IFormValues,
  actions: FormikHelpers<any>
) => void

export const LoginForm: React.FC<{ onSubmit: LoginFormSubmitHandler }> = ({
  onSubmit,
}) => (
  <Formik
    initialValues={{ email: '', password: '', userToken: '' }}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ setFieldValue, values, isSubmitting, handleSubmit, errors }) => {
      const handleCaptcha = (userToken: string | null): void =>
        setFieldValue('userToken', userToken)
      const hasToken = (values.userToken || '').length > 0
      const cannotSubmit =
        isSubmitting && !process.env.REACT_APP_DISABLE_CAPTCHA && !hasToken
      console.log(errors)
      console.log(process.env, process.env.REACT_APP_DISABLE_CAPTCHA)
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
          <FormField
            name="password"
            label="Password"
            placeholder="password"
            type="password"
            required={true}
            icon={faLock}
          />
          {process.env.REACT_APP_DISABLE_CAPTCHA ? null : (
            <Card.CenteredSection as="section">
              <Form.Captcha onChange={handleCaptcha} test={true} />
            </Card.CenteredSection>
          )}
          <Form.GeneralError name="credentials" />
          <Form.Button type="submit" disabled={cannotSubmit}>
            <span>
              {isSubmitting ? <Indicators.Spinner size={'lg'} /> : 'Login'}
            </span>
          </Form.Button>
        </Form.Form>
      )
    }}
  </Formik>
)
