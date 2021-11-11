import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Box } from 'rebass'
import { Dispatch } from 'redux'
import { ConditionalRoute } from '../../routes'
import {
  ICredentials,
  isAuthenticated,
  login,
  SessionActionTypes,
  updateSession,
} from '../../session'
import { IStoreState } from '../../store'
import { Brand, Card, Heading, Modal } from 'rpmed-ui/lib/V1'
import { Link } from 'react-router-dom'
import { ForgotPasswordView } from './ForgotPasswordView'
import { LoginForm, LoginFormSubmitHandler } from './LoginForm'
import { ResetPasswordView } from './ResetPasswordView'
import { TokenView } from './TokenView'

interface IProps {
  handleUpdatedCredentials: (creds: ICredentials) => SessionActionTypes
}

const View: React.FC<IProps> = ({ handleUpdatedCredentials }) => {
  const handleSubmit: LoginFormSubmitHandler = async (values: any, formik) => {
    const result = await login(values.email || '', values.password || '')
    if (!result.errors && !result.data) {
      formik.setErrors({
        credentials: 'There was a problem connecting to the server.',
      })
    } else if (Object.keys(result.errors).length > 0) {
      formik.setErrors({
        credentials:
          result.errors && result.errors.credentials
            ? 'The username or password was incorrect.'
            : Object.values(result.errors)[0] || '',
      } as any)
      formik.setSubmitting(false)
    } else {
      const credentials = result.data as ICredentials
      handleUpdatedCredentials(credentials)
    }
  }
  return (
    <React.Fragment>
      <Helmet title="Login to Your Account - RPMed Admin" />
      <LoginForm onSubmit={handleSubmit} />
      <Card.CenteredSection as="section">
        <Box paddingTop={3}>
          <Link to="/forgot">Forgot Your Password?</Link>
        </Box>
      </Card.CenteredSection>
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<SessionActionTypes>) => ({
  handleUpdatedCredentials: (credentials: ICredentials) =>
    dispatch(updateSession(credentials)),
})

const DefaultLoginView = connect(null, mapDispatchToProps)(View)

const RootLoginView: React.FC<{ authenticated: boolean }> = ({
  authenticated,
}) => {
  const loggedIn = () => authenticated
  return (
    <Modal.Container>
      <Helmet title="Login to Your Account - RPMed Admin" />
      <Modal.ContentRegion size={Modal.Size.small}>
        <Modal.Heading>
          <Brand.LogoMark />
          <Heading.One>Service Admin</Heading.One>
        </Modal.Heading>
        <Card.View>
          <Switch>
            <Route path="/token/:token">
              <TokenView />
            </Route>
            <Route path="/login/reset">
              <ResetPasswordView />
            </Route>
            <ConditionalRoute
              path="/forgot"
              component={ForgotPasswordView}
              redirectIf={loggedIn}
              exact={true}
              redirectPath={'/admin'}
            />
            <ConditionalRoute
              path="/login"
              component={DefaultLoginView}
              redirectIf={loggedIn}
              exact={true}
              redirectPath={'/admin'}
            />
            <Redirect to="/login" />
          </Switch>
        </Card.View>
      </Modal.ContentRegion>
    </Modal.Container>
  )
}

export const LoginView = connect((state: IStoreState) => ({
  authenticated: isAuthenticated(state.session),
}))(RootLoginView)
