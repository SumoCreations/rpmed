import {
  IModelNumber,
  IProduct,
  ModelNumber,
  Product,
} from '../../../../models'
import { ProductType } from '../../../../schema'
import { createModelNumber } from './createModelNumber'

const sampleParams = {
  description: 'MedLED Onyx® Headlight Hospital Kit',
  feeWithWarranty: { distributor: '0', endUser: '10' },
  feeWithoutWarranty: { distributor: '250', endUser: '300' },
  id: 'MLOX01-HK',
  lotted: false,
  pricing: { cost: '1000', retail: '1200' },
  productType: ProductType.Headlight,
  resolutionWithWarranty: 'Send in for servicing',
  resolutionWithoutWarranty: 'Send in for servicing',
  warrantyDescription: 'Service after 2 months',
  warrantyTerm: 12,
}

describe('createModelNumber', () => {
  let existingProduct: IProduct
  let existingModelNumber: IModelNumber
  beforeEach(async done => {
    existingProduct = await Product.create({
      description: 'MedLED Onyx Mid-Tier',
      name: 'MedLED Onyx (MLOX01)',
    })
    existingModelNumber = await ModelNumber.create({
      description: 'MedLED Onyx® Headlight Standard Kit',
      feeWithWarranty: { distributor: '0', endUser: '10' },
      feeWithoutWarranty: { distributor: '250', endUser: '300' },
      id: 'MLOX01-SK',
      lotted: false,
      pricing: { cost: '1000', retail: '1200' },
      productIds: [existingProduct.partitionKey],
      productType: ProductType.Headlight,
      resolutionWithWarranty: 'Send in for servicing',
      resolutionWithoutWarranty: 'Send in for servicing',
      warrantyDescription: 'Service after 6 mo.',
      warrantyTerm: 12,
    })
    done()
  })

  afterEach(async done => {
    await Product.destroy(existingProduct.partitionKey)
    await ModelNumber.destroy(existingModelNumber.partitionKey)
    done()
  })

  test('should generate a new model number if it is valid', async () => {
    expect.assertions(1)
    const output = await createModelNumber(null, {
      modelNumberInput: {
        ...sampleParams,
        productIds: [existingProduct.partitionKey],
      },
    })
    expect(output.success).toBe(true)
  })

  test("should fail if the product doesn't exists", async () => {
    expect.assertions(2)
    const output = await createModelNumber(null, {
      modelNumberInput: {
        ...sampleParams,
        id: 'MLOX01-PK',
        productIds: ['SOME-FAKE-KEY'],
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('productIds')
  })

  test('should fail if the model number already exists', async () => {
    expect.assertions(2)
    const output = await createModelNumber(null, {
      modelNumberInput: {
        ...sampleParams,
        id: existingModelNumber.partitionKey,
        productIds: [existingProduct.partitionKey],
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('id')
  })

  test('should fail if the model number does not pass validations', async () => {
    expect.assertions(3)
    const invalidInput: any = {
      modelNumberInput: {
        ...sampleParams,
        lotted: null,
        productIds: [existingProduct.partitionKey],
        warrantyTerm: '',
      },
    }
    const output = await createModelNumber(null, invalidInput)
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('warrantyTerm')
    expect(output.errors.map(e => e.path)).toContain('lotted')
  })
})
