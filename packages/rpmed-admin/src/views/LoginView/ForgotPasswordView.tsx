import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Box, Flex } from 'rebass'
import { Dispatch } from 'redux'
import { ICredentials, SessionActionTypes, updateSession } from '../../session'
import { Card, Heading, Link } from 'rpmed-ui/lib/V1'
import { ForgotForm } from 'rpmed-ui'

interface IProps {
  handleUpdatedCredentials: (creds: ICredentials) => SessionActionTypes
}

const View: React.FC<IProps> = () => {
  const [complete, setComplete] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <React.Fragment>
      <Helmet title="Forgot Your Password? - RPMed Admin" />
      {complete ? (
        <Flex alignItems="center" height="100%" flexDirection="row">
          <Box my="auto" mx="auto">
            <Heading.Title>Please check your email</Heading.Title>
          </Box>
        </Flex>
      ) : (
        <React.Fragment>
          <ForgotForm
            onSubmit={async data => {
              setLoading(true)
              const response = await fetch(
                `${process.env.REACT_APP_API_URL}/auth/forgot`,
                {
                  body: JSON.stringify({ email: data.email }),
                  method: 'POST',
                }
              )
              const { errors } = await response.json()
              const error = Object.values(errors)[0]
              if (error) {
                return { error: Object.values(errors)[0] as string, errors }
              }
              setComplete(true)
              setLoading(false)
              return undefined
            }}
            loading={loading}
          />
          <Card.CenteredSection as="section">
            <Box paddingTop={3}>
              <Link to="/login">Return to login.</Link>
            </Box>
          </Card.CenteredSection>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<SessionActionTypes>) => ({
  handleUpdatedCredentials: (credentials: ICredentials) =>
    dispatch(updateSession(credentials)),
})

export const ForgotPasswordView = connect(null, mapDispatchToProps)(View)
