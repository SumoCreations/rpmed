import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { Box } from 'rebass'
import { useDispatch } from 'react-redux'
import { Card, Link } from 'rpmed-ui/lib/V1'
import { useResetPasswordMutation } from 'rpmed-schema'
import { ICredentials, login, updateSession } from '../../session'
import { ResetForm } from 'rpmed-ui'
import { useState } from 'react'

export const ResetPasswordView: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [resetPassword] = useResetPasswordMutation()
  const [loading, setLoading] = useState(false)

  return (
    <React.Fragment>
      <Helmet title="Forgot Your Password? - RPMed Admin" />
      <ResetForm
        onSubmit={async ({ password }) => {
          setLoading(true)
          const result = await resetPassword({
            variables: {
              password,
            },
          })
          if (!result.data?.response.success) {
            const errors = result.data?.response.errors ?? {}
            return { errors, error: Object.values(errors)[0] as string }
          } else {
            const auth = {
              email: (result.data?.response.user?.email as string) ?? '',
              password,
            }
            try {
              const response = await login(auth.email, auth.password)
              setLoading(false)
              const credentials = response.data as ICredentials
              const error = Object.keys(response.errors ?? {})[0]
              if (error) {
                return { errors: response.errors, error }
              }
              dispatch(updateSession({ ...credentials }))
            } catch (e) {
              return {
                errors: { _: (e as any).message as string },
                error: (e as any).message as string,
              }
            }
            navigate('/admin')
          }
          setLoading(false)
          return undefined
        }}
        loading={loading}
      />
      <Card.CenteredSection as="section">
        <Box paddingTop={3}>
          <Link to="/forgot">Need to request another email?</Link>
        </Box>
      </Card.CenteredSection>
    </React.Fragment>
  )
}
