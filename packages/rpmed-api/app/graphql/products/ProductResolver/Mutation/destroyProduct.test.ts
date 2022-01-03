import { IProduct, ModelNumber, Product } from '../../../../models'
import { ProductType } from 'rpmed-schema'
import { destroyProduct } from './destroyProduct'

const sampleParams = {
  description: 'It had a good life...',
  name: 'A Product To Destroy',
}

const modelNameParams = {
  description: 'MedLED Onyx® Headlight Hospital Kit',
  feeWithWarranty: { distributor: '0', endUser: '10' },
  feeWithoutWarranty: { distributor: '250', endUser: '300' },
  id: 'MLOD01-HK',
  lotted: false,
  pricing: { cost: '1000', retail: '1200' },
  productType: ProductType.Headlight,
  resolutionWithWarranty: 'Send in for servicing',
  resolutionWithoutWarranty: 'Send in for servicing',
  warrantyDescription: 'Service after 2 months',
  warrantyTerm: 12,
}

describe('destroyProduct', () => {
  let existingProduct: IProduct
  beforeEach(async done => {
    existingProduct = await Product.create({ ...sampleParams })
    await ModelNumber.create({
      ...modelNameParams,
      id: 'MLOX03-HK-DELETE-ME-1',
      productIds: [existingProduct.partitionKey],
    })
    await ModelNumber.create({
      ...modelNameParams,
      id: 'MLOX03-HK-DELETE-ME-2',
      productIds: [existingProduct.partitionKey],
    })
    done()
  })

  afterEach(async done => {
    await Product.destroy(existingProduct.partitionKey)
    done()
  })

  test('should destroy the Product', async () => {
    expect.assertions(1)
    const output = await destroyProduct(null, {
      id: existingProduct.partitionKey,
    })
    expect(output.success).toBe(true)
  })

  test('should destroy any associated model numbers', async () => {
    expect.assertions(5)
    expect(await ModelNumber.find('MLOX03-HK-DELETE-ME-1')).toBeDefined()
    expect(await ModelNumber.find('MLOX03-HK-DELETE-ME-2')).toBeDefined()
    const output = await destroyProduct(null, {
      id: existingProduct.partitionKey,
    })
    expect(output.success).toBe(true)
    expect(await ModelNumber.find('MLOX03-HK-DELETE-ME-1')).toBeNull()
    expect(await ModelNumber.find('MLOX03-HK-DELETE-ME-2')).toBeNull()
  })

  test('should fail the Product does not exist', async () => {
    expect.assertions(1)
    const output = await destroyProduct(null, { id: 'some-made-up-id-or-key' })
    expect(output.success).toBe(false)
  })
})
