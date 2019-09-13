import { IProductRegistration, ProductRegistration } from '../../../../models'
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
    const output = await destroyProductRegistration(null, {
      id: productRegistration.partitionKey,
    })
    expect(output.success).toBe(true)
  })

  test('should fail the productRegistration does not exist', async () => {
    expect.assertions(1)
    const output = await destroyProductRegistration(null, {
      id: 'some-made-up-id-or-key',
    })
    expect(output.success).toBe(false)
  })
})
