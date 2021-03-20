import { APIGatewayProxyHandler } from 'aws-lambda'
import * as email from './email'
import { TemporaryAccessToken, User } from './models'
import { response, Status } from './net'
import { parseEmail } from './parsers'
import { CLIENT_URL } from './util'

/**
 * Generates a temporary token and sends a forgot password email
 * but will return an error if the incomming email is not attributed
 * to a user in the system.
 * @param event An incoming request from the AWS API Gateway
 */
export const sendResetPasswordEmail: APIGatewayProxyHandler = async event => {
  try {
    const emailAddress = parseEmail(event.body)
    const user = await User.findByEmail(emailAddress)
    const token = await TemporaryAccessToken.create({
      expiresIn: '10m',
      payload: {
        redirectPath: `/login/reset`,
        userId: user.partitionKey,
      },
    })
    await email.send({
      subject: '[RPMed Admin] Reset Your Password',
      template: email.Template.ResetPassword,
      to: [`${user.firstName} ${user.lastName} <${user.email}>`],
      variables: {
        firstName: user.firstName,
        resetLink: `${CLIENT_URL}/token/${token.partitionKey}`,
      },
    })
    return response(Status.OK, { success: true })
  } catch (e) {
    return response(Status.BadRequest, {}, { user: e.message })
  }
}
