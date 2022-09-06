import { IProductRegistration, ProductRegistration } from '../../../../models'
import { TST_ORIGIN_CTX, TST_USER_CTX } from '../../../auth'
import {
  generateSampleParams,
  IRegistrationSampleParamOutput,
} from '../testHelpers'
import { destroyProductRegistration } from './destroyProductRegistration'

describe('destroyProductRegistration', () => {
  let productRegistration: IProductRegistration
  let unlottedSample: IRegistrationSampleParamOutput

  beforeEach(async done => {
    unlottedSample = await generateSampleParams({
      key: 'DSTRY-TST-1',
      lotted: false,
      serial: null,
    })
    productRegistration = await ProductRegistration.create({
      ...unlottedSample.sampleParams,
    })
    done()
  })

  afterEach(async done => {
    await ProductRegistration.destroy(productRegistration.partitionKey)
    done()
  })

  test('should destroy the productRegistration', async () => {
    expect.assertions(1)
    const output = await destroyProductRegistration(
      null,
      {
        id: productRegistration.partitionKey,
      },
      TST_USER_CTX
    )
    expect(output.success).toBe(true)
  })

  test('should fail if not an authorized user', async () => {
    expect.assertions(1)
    const output = await destroyProductRegistration(
      null,
      {
        id: productRegistration.partitionKey,
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(false)
  })

  test('should fail the productRegistration does not exist', async () => {
    expect.assertions(1)
    const output = await destroyProductRegistration(
      null,
      {
        id: 'some-made-up-id-or-key',
      },
      TST_USER_CTX
    )
    expect(output.success).toBe(false)
  })
})
