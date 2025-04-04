import { IProductRegistration, ProductRegistration } from '../../../../models'
import { TST_ORIGIN_CTX, TST_USER_CTX } from '../../../auth'
import {
  generateSampleParams,
  IRegistrationSampleParamOutput,
} from '../testHelpers'
import { productRegistration } from './productRegistration'

describe('Query', () => {
  let sample1: IRegistrationSampleParamOutput
  let existingProductRegistration: IProductRegistration
  beforeAll(async done => {
    sample1 = await generateSampleParams({
      key: 'QUERY-TST-1',
      lotted: false,
      serial: null,
    })
    existingProductRegistration = await ProductRegistration.create({
      ...sample1.sampleParams,
    })
    done()
  })

  describe('productRegistration', () => {
    test('should return a productRegistration if it exists', async () => {
      expect.assertions(6)
      const output = await productRegistration(
        null,
        {
          id: existingProductRegistration.partitionKey,
        },
        TST_USER_CTX
      )
      expect(output.success).toEqual(true)
      expect(output.productRegistration).toBeDefined()
      expect(output.productRegistrations).toBeUndefined()
      expect(output.productRegistration.customerId).toEqual(
        existingProductRegistration.customerId
      )
      expect(output.productRegistration.productId).toEqual(
        existingProductRegistration.productId
      )
      expect(output.productRegistration.modelNumber).toEqual(
        existingProductRegistration.modelNumber
      )
    })

    test('should fail if not authorized', async () => {
      expect.assertions(4)
      const output = await productRegistration(
        null,
        {
          id: existingProductRegistration.partitionKey,
        },
        TST_ORIGIN_CTX
      )
      expect(output.success).toEqual(false)
      expect(output.productRegistration).toBeUndefined()
      expect(output.productRegistrations).toBeUndefined()
      expect(output.errors).toBeDefined()
    })

    test('should return an error if it does not exist', async () => {
      expect.assertions(4)
      const output = await productRegistration(
        null,
        {
          id: 'DOES-NOT-EXIST',
        },
        TST_USER_CTX
      )
      expect(output.success).toEqual(false)
      expect(output.productRegistration).toBeUndefined()
      expect(output.productRegistrations).toBeUndefined()
      expect(output.errors).toBeDefined()
    })
  })
})
