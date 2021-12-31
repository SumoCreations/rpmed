import { DateTime } from 'luxon'
import { IRGA, RGA } from '../../../../models'
import { RgaStatus } from 'rpmed-schema'
import { createRGA } from './createRGA'
import { TST_ORIGIN_CTX } from '../../../auth'

const sampleParams = {
  submittedBy: 'someone-ex1@someOtherPartner.com',
  submittedOn: DateTime.utc(2019, 5, 7, 1, 12, 11, 10).toISO(),
  shippingSpeed: 'Ground',
}

describe('createRGA', () => {
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
    const output = await createRGA(
      null,
      {
        rgaInput: {
          ...sampleParams,
        },
      },
      null
    )
    expect(output.success).toBe(false)
  })

  test('should generate a new rga if it is valid', async () => {
    expect.assertions(1)
    const output = await createRGA(
      null,
      {
        rgaInput: {
          ...sampleParams,
        },
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(true)
  })

  test('should generate a distributor that matches the submitted by domain', async () => {
    expect.assertions(2)
    const output = await createRGA(
      null,
      {
        rgaInput: {
          ...sampleParams,
        },
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toEqual(true)
    expect((await output.rga.distributor).domain).toEqual(
      'someOtherPartner.com'
    )
  })

  test('should fail if the RGA does not pass validations', async () => {
    expect.assertions(3)
    const invalidInput: any = {
      rgaInput: {
        ...sampleParams,
        submittedBy: 'john@notvalid',
        submittedOn: null,
      },
    }
    const output = await createRGA(null, invalidInput, TST_ORIGIN_CTX)
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('submittedBy')
    expect(output.errors.map(e => e.path)).toContain('submittedOn')
  })
})
