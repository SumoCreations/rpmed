import { APIGatewayProxyHandler } from 'aws-lambda'
import { response, Status } from './net'
import {
  generateTokenFromPassword,
  generateTokenFromRefreshToken,
  ITokenOutput,
} from './oauth'
import { ICredentials, parseCredentials } from './parsers'

export const createToken: APIGatewayProxyHandler = async event => {
  // tslint:disable no-console
  console.log(event)
  const { grantType } = JSON.parse(event.body)
  if (!['password', 'refresh'].includes(grantType)) {
    return response(
      Status.BadRequest,
      {},
      { grantType: "must be either 'password' or 'refresh'" }
    )
  }
  let output: ITokenOutput | null
  switch (grantType) {
    case 'password':
      let credentials: ICredentials | null
      try {
        credentials = parseCredentials(event.body)
      } catch (e) {
        return response(Status.BadRequest, {}, { user: e.message })
      }
      output = await generateTokenFromPassword(
        credentials.email,
        credentials.password
      )
      break
    case 'refresh':
      const { refreshToken } = JSON.parse(event.body)
      if (!refreshToken) {
        return response(
          Status.BadRequest,
          {},
          { refreshToken: 'Cannot be blank' }
        )
      }
      output = await generateTokenFromRefreshToken(refreshToken)
      break
    default:
      return response(
        Status.BadRequest,
        {},
        {
          grantType: `must be specified`,
        }
      )
  }
  if (!output) {
    return response(
      Status.NotAuthorized,
      {},
      {
        credentials: `The supplied credentials for '${grantType}' were not valid.`,
      }
    )
  }

  return response(Status.OK, {
    accessToken: output.token,
    expiresIn: output.expiresIn,
    refreshToken: output.refresh,
    tokenType: 'bearer',
  })
}
