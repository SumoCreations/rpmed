import {
  IModelNumber,
  IProduct,
  ModelNumber,
  Product,
  ProductType,
} from '../../../../models'
import { destroyModelNumber } from './destroyModelNumber'

const sampleParams = {
  description: 'MedLED Onyx® Headlight Hospital Kit',
  feeWithWarranty: { distributor: '0', endUser: '10' },
  feeWithoutWarranty: { distributor: '250', endUser: '300' },
  id: 'MLOX03-HK',
  lotted: false,
  pricing: { cost: '1000', retail: '1200' },
  productType: ProductType.HEADLIGHT,
  resolutionWithWarranty: 'Send in for servicing',
  resolutionWithoutWarranty: 'Send in for servicing',
  warrantyDescription: 'Service after 2 months',
  warrantyTerm: 12,
}

describe('destroyModelNumber', () => {
  let modelNumber: IModelNumber
  let existingProduct: IProduct
  beforeEach(async done => {
    existingProduct = await Product.create({
      description: 'MedLED Sapphire Top-Tier',
      name: 'MedLED Sapphire (MLOD01)',
    })
    modelNumber = await ModelNumber.create({
      ...sampleParams,
      productIds: [existingProduct.partitionKey],
    })
    done()
  })

  afterEach(async done => {
    await Product.destroy(existingProduct.partitionKey)
    await ModelNumber.destroy(modelNumber.partitionKey)
    done()
  })

  test('should destroy the ModelNumber', async () => {
    expect.assertions(1)
    const output = await destroyModelNumber(null, {
      id: modelNumber.partitionKey,
    })
    expect(output.success).toBe(true)
  })

  test('should fail the ModelNumber does not exist', async () => {
    expect.assertions(1)
    const output = await destroyModelNumber(null, {
      id: 'some-made-up-id-or-key',
    })
    expect(output.success).toBe(false)
  })
})
