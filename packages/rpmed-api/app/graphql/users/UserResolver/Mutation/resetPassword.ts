import { isEmpty } from 'validator'
import * as Yup from 'yup'
import { TemporaryAccessToken, User } from '../../../../models'
import * as Validation from '../../../../validations'
import { IMutationOutput } from './userMutationTypes'

const validation = Yup.object().shape({
  password: Yup.string().min(7),
})

/**
 * Resets a users password provided their authorization token is valid.
 * @param _ Ignored parent object.
 * @param param1 The incomming arguments for the mutation.
 * @param ctx The current context from the apollo server.
 */
export const resetPassword = async (
  _: any,
  { password }: { password: string },
  ctx: any
): Promise<IMutationOutput> => {
  let tokenUserId: string
  if (isEmpty(ctx.authorization || '')) {
    return {
      errors: [
        { message: 'An authorization token was not present.', path: '_' },
      ],
      success: false,
    }
  }
  try {
    const token = await TemporaryAccessToken.find(ctx.authorization)
    const decoded: any = TemporaryAccessToken.decode(token)
    tokenUserId = decoded.userId
  } catch (e) {
    // tslint:disable-next-line
    return {
      errors: [
        {
          message: 'The supplied authorization token is noo longer valid.',
          path: '_',
        },
      ],
      success: false,
    }
  }
  try {
    await validation.validate({ password }, { abortEarly: false })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }
  let user = await User.find(tokenUserId)
  if (!user) {
    return {
      errors: [
        { message: 'The requested user could not be found.', path: '_' },
      ],
      success: false,
    }
  }
  try {
    user = await User.update({
      email: user.email,
      firstName: user.firstName,
      id: user.partitionKey,
      lastName: user.lastName,
      password,
    })
  } catch (e) {
    // tslint:disable-next-line
    console.log(e)
    return {
      errors: [{ message: 'We could not update your password.', path: '_' }],
      success: false,
    }
  }
  return { user: User.output(user), success: true }
}
