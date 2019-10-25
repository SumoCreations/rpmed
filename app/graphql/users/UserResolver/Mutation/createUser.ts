import { v4 as uuid } from 'uuid'
import * as emailService from '../../../../email'
import { IUserInput, TemporaryAccessToken, User } from '../../../../models'
import { CLIENT_URL } from '../../../../util'
import * as Validation from '../../../../validations'
import {
  ErrorUserCredentialsInvalid,
  ErrorUserWithEmailAlreadyExists,
} from './userErrors'
import { IMutationOutput } from './userMutationTypes'

export const createUser = async (
  _: any,
  { userInput: rawInput }: { userInput: IUserInput }
): Promise<IMutationOutput> => {
  const userInput = {
    ...rawInput,
    password: rawInput.password || uuid(),
  }
  try {
    await Validation.User.New.validate(userInput, { abortEarly: false })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }

  const { email, password, firstName, lastName } = userInput
  const existingUser = await User.findByEmail(email)
  if (existingUser) {
    return {
      errors: [ErrorUserWithEmailAlreadyExists],
      success: false,
    }
  }

  try {
    const user = await User.create({ email, password, firstName, lastName })
    const token = await TemporaryAccessToken.create({
      expiresIn: '60m',
      payload: {
        redirectPath: `/login/reset`,
        userId: user.partitionKey,
      },
    })
    await emailService.send({
      subject: '[RPMed Admin] Complete Your Account',
      template: emailService.Template.CreateAccountConfirmation,
      to: [`${firstName} ${lastName} <${email}>`],
      variables: {
        confirmationLink: `${CLIENT_URL}/token/${token.partitionKey}`,
        expiresIn: '1 hour',
        firstName: `${firstName}`,
        resetLink: `${CLIENT_URL}/login/forgot`,
      },
    })
    return { user: User.output(user), success: true }
  } catch (e) {
    return { success: false, errors: [ErrorUserCredentialsInvalid] }
  }
}
