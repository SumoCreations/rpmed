import { DateTime } from 'luxon'
import { IRGA, IUser, RGA, User } from '../../../../models'
import { generate } from '../../../../oauth'
import { RgaStatus } from 'rpmed-schema'
import { updateRGAStatus } from './updateRGAStatus'

describe('updateRGAStatus', () => {
  let existingRGA: IRGA
  let existingUser: IUser
  beforeAll(async done => {
    existingRGA = await RGA.create({
      distributorId: 'something-made-up',
      shippingSpeed: 'Ground',
      status: RgaStatus.Issued,
      submittedBy: 'someone-ex1@partner.com',
      submittedOn: DateTime.utc(2019, 5, 7, 1, 12, 11, 10).toISO(),
    })
    existingUser = await User.create({
      email: 'developer-test-012932@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'password',
    })
    done()
  })

  afterAll(async done => {
    await RGA.destroy(existingRGA.partitionKey)
    await User.destroy(existingUser.partitionKey)
    done()
  })

  test('should update the status of the RGA', async () => {
    expect.assertions(1)
    const output = await updateRGAStatus(
      null,
      {
        id: existingRGA.partitionKey,
        status: RgaStatus.AwaitingArrival,
      },
      {
        authorization: generate({ userId: existingUser.partitionKey }).token,
      }
    )
    expect(output.success).toBe(true)
  })
})
