import * as React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Box } from 'rebass'
import { Dispatch } from 'redux'
import { RequireAnon } from '../../routes'
import {
  ICredentials,
  login,
  SessionActionTypes,
  updateSession,
} from '../../session'
import { LoginForm } from 'rpmed-ui'
import { Brand, Card, Heading, Modal } from 'rpmed-ui/lib/V1'
import { Link } from 'react-router-dom'
import { ForgotPasswordView } from './ForgotPasswordView'
import { ResetPasswordView } from './ResetPasswordView'
import { useState } from 'react'

interface IProps {
  handleUpdatedCredentials: (creds: ICredentials) => SessionActionTypes
}

const View: React.FC<IProps> = ({ handleUpdatedCredentials }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <Helmet title="Login to Your Account - RPMed Admin" />
      <LoginForm
        onSubmit={async data => {
          setLoading(true)
          const result = await login(data.email || '', data.password || '')
          setLoading(false)
          const error = Object.values(result.errors ?? {})[0]
          if (!result.errors && !result.data) {
            return {
              error: 'There was a problem connecting to the server.',
            }
          } else if (Object.keys(result.errors).length > 0) {
            return {
              error,
              errors: result.errors,
            } as any
          } else {
            const credentials = result.data as ICredentials
            handleUpdatedCredentials(credentials)
            navigate('/admin')
          }
          return undefined
        }}
        loading={loading}
      />
      <Card.CenteredSection as="section">
        <Box paddingTop={3}>
          <Link to="forgot">Forgot Your Password?</Link>
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

export const LoginView: React.FC = () => {
  return (
    <Modal.Container>
      <Helmet title="Login to Your Account - RPMed Admin" />
      <Modal.ContentRegion size={Modal.Size.small}>
        <Modal.Heading>
          <Brand.LogoMark />
          <Heading.One>Service Admin</Heading.One>
        </Modal.Heading>
        <Card.View>
          <Routes>
            <Route path="reset" element={<ResetPasswordView />} />
            <Route
              path="forgot"
              element={
                <RequireAnon>
                  <ForgotPasswordView />
                </RequireAnon>
              }
            />
            <Route
              index
              element={
                <RequireAnon>
                  <DefaultLoginView />
                </RequireAnon>
              }
            />
            <Route element={() => <Navigate to="/login" replace />} />
          </Routes>
        </Card.View>
      </Modal.ContentRegion>
    </Modal.Container>
  )
}
