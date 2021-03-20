import { IUser, TemporaryAccessToken, User } from '../../../../models'
import { verifyUser } from '../../../../oauth'
import { resetPassword } from './resetPassword'

const sampleParams = {
  email: 'update-user-test@example.com',
  firstName: 'John',
  lastName: 'Appleseed',
  password: 'password',
}

describe('updateUser', () => {
  let user: IUser
  beforeEach(async done => {
    user = await User.create({ ...sampleParams })
    done()
  })

  afterEach(async done => {
    await User.destroyByEmail(sampleParams.email)
    done()
  })

  test('should verify the sample user', async () => {
    expect.assertions(1)
    const verified = await verifyUser(sampleParams.email, sampleParams.password)
    expect(verified).toBeTruthy()
  })

  test('should update the password', async () => {
    expect.assertions(1)
    const password = 'newPassword'
    const token = await TemporaryAccessToken.create({
      expiresIn: '10m',
      payload: {
        redirectPath: `/login/reset`,
        userId: user.partitionKey,
      },
    })
    await resetPassword(
      null,
      { password },
      { authorization: token.partitionKey }
    )
    const verified = await verifyUser(sampleParams.email, password)
    expect(verified).toBeTruthy()
  })

  test('should update the password', async () => {
    expect.assertions(2)
    const password = 'pwd'
    const token = await TemporaryAccessToken.create({
      expiresIn: '10m',
      payload: {
        redirectPath: `/login/reset`,
        userId: user.partitionKey,
      },
    })
    const output = await resetPassword(
      null,
      { password },
      { authorization: token.partitionKey }
    )
    const verified = await verifyUser(sampleParams.email, password)
    expect(verified).toBeFalsy()
    expect(output.success).toBeFalsy()
  })
})
