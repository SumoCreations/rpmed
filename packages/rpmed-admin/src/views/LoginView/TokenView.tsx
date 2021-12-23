import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Flex } from 'rebass'
import { ICredentials, updateSession } from '../../session'
import { Form, Heading, Indicators, Para } from 'rpmed-ui/lib/V1'

interface IParams {
  token?: string
}

interface IProps {
  updateCredentials: (creds: ICredentials) => void
}

const TokenViewComponent: React.FC<IProps> = ({ updateCredentials }) => {
  const history = useHistory()
  const params = useParams<IParams>()
  const [error, setError] = useState('')
  useEffect(() => {
    if (params.token) {
      try {
        const { redirectPath } = jwtDecode(params.token) as {
          [key: string]: string
        }
        updateCredentials({
          accessToken: params.token,
          refreshToken: 'invalid',
        })
        history.replace(redirectPath)
        return
      } catch (e) {
        // tslint:disable-next-line
        console.log(e)
      }
      setError('This access token link is invalid or may have expired.')
    }
  }, [params.token, history, updateCredentials])
  const returnHome = () => history.replace('/')
  return (
    <Flex flexDirection="column" margin="auto" style={{ maxWidth: '468px' }}>
      {error.length > 0 ? (
        <Flex as="article" flexDirection="column">
          <Box mx="auto" as="header">
            <Heading.Title>Sorry We Had a Problem</Heading.Title>
          </Box>
          <Box mx="auto" as="section">
            <Para.Book>{error}</Para.Book>
          </Box>
          <Box mx="auto" as="footer">
            <Form.Button onClick={returnHome}>
              Click Here to Continue
            </Form.Button>
          </Box>
        </Flex>
      ) : (
        <Flex flexDirection="row" alignItems="center">
          <Box marginRight="1rem">
            <Indicators.Spinner size="2x" />
          </Box>
          <Heading.Title>Processing Your Request</Heading.Title>
        </Flex>
      )}
    </Flex>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateCredentials: (creds: ICredentials) => {
      dispatch(updateSession(creds))
    },
  }
}

export const TokenView = connect(null, mapDispatchToProps)(TokenViewComponent)
