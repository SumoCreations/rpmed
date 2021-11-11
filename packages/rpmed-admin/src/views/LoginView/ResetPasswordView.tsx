import React from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { Box } from 'rebass'
import { connect } from 'react-redux'
import { Card, Link } from 'rpmed-ui/lib/V1'
import { faLock, faLockAlt } from '@fortawesome/pro-regular-svg-icons'
import { Formik, FormikHelpers } from 'formik'
import { RequiredString } from 'rpmed-validation-schema'
import * as Yup from 'yup'
import { useResetPasswordMutation } from '../../schema'
import { ICredentials, login, updateSession } from '../../session'
import { Form, Indicators, Input } from 'rpmed-ui/lib/V1'

interface IProps {
  dispatch: (action: any) => any
}

/* BEGIN - Form Values */
/**
 * This interface represents potential form values and
 * is passed into our custom form field factories to get
 * type safety on our form.
 */
export interface IResetPasswordValues {
  [key: string]: string | undefined
  password?: string | undefined
  passwordConfirmation?: string | undefined
}

/**
 * This schema is used by formik to provide client side
 * form validation.
 */
const ResetSchema = Yup.object().shape({
  password: RequiredString().min(7),
  passwordConfirm: RequiredString()
    .oneOf([Yup.ref('password')], 'must match password')
    .required('Password confirm is required'),
})
/* END - Form Values */

/* BEGIN - Custom Form Renderers */
const FormField = Input.Renderer<IResetPasswordValues>()
/* END - Custom Form Renderers */

const View: React.FC<IProps> = ({ dispatch }) => {
  const history = useHistory()
  const [resetPassword] = useResetPasswordMutation()

  const onSubmitHandler = async (
    values: IResetPasswordValues,
    actions: FormikHelpers<IResetPasswordValues>
  ) => {
    actions.setSubmitting(true)
    const result = await resetPassword({
      variables: {
        password: values.password as string,
      },
    })
    if (
      result.data &&
      !result.data.response.success &&
      result.data.response.errors
    ) {
      result.data.response.errors.forEach(
        fieldError =>
          fieldError &&
          actions.setFieldError(`${fieldError.path}`, fieldError.message)
      )
    } else {
      const auth = {
        email:
          result.data && result.data.response.user
            ? (result.data.response.user.email as string)
            : '',
        password: values.password as string,
      }
      try {
        const response = await login(auth.email, auth.password)
        const credentials = response.data as ICredentials
        if (response.errors && Object.keys(response.errors).length > 0) {
          actions.setFieldError(
            '_',
            (Object.values(response.errors)[0] as string) || ''
          )
          return
        }
        dispatch(updateSession({ ...credentials }))
      } catch (e) {
        actions.setFieldError('_', e.message)
        return
      }
      history.push('/admin')
    }
    actions.setSubmitting(false)
  }

  return (
    <React.Fragment>
      <Helmet title="Forgot Your Password? - RPMed Admin" />
      <Formik
        initialValues={{
          password: '',
          passwordConfirm: '',
        }}
        onSubmit={onSubmitHandler}
        validationSchema={ResetSchema}
      >
        {({ isSubmitting, isValid, handleSubmit, submitForm }) => {
          return (
            <Form.Form onSubmit={handleSubmit}>
              <Form.Row>
                <FormField
                  disabled={isSubmitting}
                  icon={faLock}
                  name="password"
                  label="Password"
                  type="password"
                  required={true}
                />
              </Form.Row>
              <Form.Row>
                <FormField
                  disabled={isSubmitting}
                  icon={faLockAlt}
                  name="passwordConfirm"
                  label="Confirm Password"
                  type="password"
                  required={true}
                />
              </Form.Row>
              <Form.GeneralError name="_" />
              <Form.Row>
                <Form.Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  onClick={submitForm}
                >
                  <span>
                    {isSubmitting ? (
                      <Indicators.Spinner size={'lg'} />
                    ) : (
                      'Reset Password'
                    )}
                  </span>
                </Form.Button>
              </Form.Row>
            </Form.Form>
          )
        }}
      </Formik>
      <Card.CenteredSection as="section">
        <Box paddingTop={3}>
          <Link to="/forgot">Need to request another email?</Link>
        </Box>
      </Card.CenteredSection>
    </React.Fragment>
  )
}

export const ResetPasswordView = connect()(View)
