import { DateTime } from 'luxon'
import { IRGA, RGA } from '../../../../models'
import { RgaStatus } from 'rpmed-schema'
import { updateRGA } from './updateRGA'
import { TST_USER_CTX } from '../../../auth'

describe('updateRGA', () => {
  let existingRGA: IRGA
  beforeAll(async done => {
    existingRGA = await RGA.create({
      distributorId: 'something-made-up',
      shippingSpeed: 'Ground',
      status: RgaStatus.Issued,
      submittedBy: 'someone-ex1@partner.com',
      submittedOn: DateTime.utc(2019, 5, 7, 1, 12, 11, 10).toISO(),
    })
    done()
  })

  afterAll(async done => {
    await RGA.destroy(existingRGA.partitionKey)
    done()
  })

  test('should fail if not authorized', async () => {
    expect.assertions(1)
    const output = await updateRGA(
      null,
      {
        rgaInput: {
          id: existingRGA.partitionKey,
          shippingSpeed: 'Next-Day',
        },
      },
      null
    )
    expect(output.success).toBe(false)
  })

  test('should update a the rga if it is valid', async () => {
    expect.assertions(1)
    const output = await updateRGA(
      null,
      {
        rgaInput: {
          id: existingRGA.partitionKey,
          shippingSpeed: 'Next-Day',
        },
      },
      TST_USER_CTX
    )
    expect(output.success).toBe(true)
  })

  test('should fail if the RGA does not exist', async () => {
    expect.assertions(1)
    const invalidInput: any = {
      rgaInput: {
        id: 'does-not-exist',
        shippingSpeed: 'Next-Day',
      },
    }
    const output = await updateRGA(null, invalidInput, TST_USER_CTX)
    expect(output.success).toBe(false)
  })

  test('should fail if the RGA does not pass validations', async () => {
    expect.assertions(3)
    const invalidInput: any = {
      rgaInput: {
        id: null,
        shippingSpeed: null,
      },
    }
    const output = await updateRGA(null, invalidInput, TST_USER_CTX)
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('id')
    expect(output.errors.map(e => e.path)).toContain('shippingSpeed')
  })
})
