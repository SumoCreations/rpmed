import { isEmpty } from 'validator'
import { ProductType } from '../schema'
import { IModelNumber, ModelNumber } from './modelNumber'
import { IProduct, Product } from './product'

const existingModelParams = {
  description: 'MedLED Chrome MC7 PRO Hard Top; Standard Kit',
  feeWithWarranty: { distributor: '100', endUser: '150' },
  feeWithoutWarranty: { distributor: '150', endUser: '250' },
  id: 'MC7-HT-SK',
  lotted: true,
  pricing: {
    cost: '150',
    retail: '300',
  },
  productType: ProductType.Headlight,
  resolutionWithWarranty: 'Do something...',
  resolutionWithoutWarranty: 'Do something else..',
  warrantyDescription: 'All headlamps covered for 1 year',
  warrantyTerm: 12,
}

describe('modelNumber', () => {
  let modelNumber: IModelNumber
  let product: IProduct
  beforeAll(async done => {
    product = await Product.create({
      description: 'The chrome MedLED Pro Headlamp',
      name: 'Chrome MC7 Pro',
    })
    modelNumber = await ModelNumber.create({
      ...existingModelParams,
      productIds: [product.partitionKey],
    })
    done()
  })

  afterAll(async done => {
    await ModelNumber.destroy(modelNumber.partitionKey)
    done()
  })

  describe('create', () => {
    test('should generate a new product configuration (model number)', () => {
      expect(isEmpty(modelNumber.partitionKey)).toBe(false)
      expect(modelNumber.sortKey).toBe(ModelNumber.SECONDARY_KEY)
    })

    test('should not generate a new model if the id was already used', async () => {
      expect.assertions(1)
      try {
        await ModelNumber.create({
          ...existingModelParams,
          productIds: [product.partitionKey],
        })
      } catch (e) {
        expect(isEmpty(e.message)).toBe(false)
      }
    })
  })

  describe('find', () => {
    test('should return a modelNumber if one exists', async () => {
      expect.assertions(1)
      const existingModelNumber = await ModelNumber.find(
        modelNumber.partitionKey
      )
      expect(existingModelNumber).not.toBeNull()
    })

    test('should return null if a modelNumber does not exist', async () => {
      expect.assertions(1)
      const existingModelNumber = await ModelNumber.find('Some-Made-Up-Id')
      expect(existingModelNumber).toBeNull()
    })
  })

  describe('forProduct', () => {
    test('should return a modelNumber if one exists', async () => {
      expect.assertions(2)
      const matchingModels = await ModelNumber.forProduct(product.partitionKey)
      expect(matchingModels).not.toBeNull()
      expect(matchingModels.length).toEqual(1)
    })

    test('should return a modelNumber if one exists', async () => {
      expect.assertions(2)
      const newProduct = await Product.create({
        description: 'The chrome...',
        name: 'Chrome MC7 Pro NEW EXAMPLE',
      })
      const matchingModels = await ModelNumber.forProduct(
        newProduct.partitionKey
      )
      expect(matchingModels).not.toBeNull()
      expect(matchingModels.length).toEqual(0)
    })

    test('should return null if a modelNumber does not exist', async () => {
      expect.assertions(2)
      const matchingModels = await ModelNumber.forProduct('DOES-NOT-EXIST!')
      expect(matchingModels).not.toBeNull()
      expect(matchingModels.length).toEqual(0)
    })
  })

  describe('findByType', () => {
    test('should return a product if one exists', async () => {
      expect.assertions(1)
      const headlights = await ModelNumber.findByType(ProductType.Headlight)
      expect(headlights.length).toEqual(1)
    })

    test('should return null if a product does not exist', async () => {
      expect.assertions(1)
      const accessories = await ModelNumber.findByType(ProductType.Accessory)
      expect(accessories.length).toEqual(0)
    })
  })

  describe('destroy', () => {
    test('should delete a modelNumber and return true if one exists', async () => {
      expect.assertions(2)
      expect(await ModelNumber.destroy(modelNumber.partitionKey)).toBeTruthy()
      const existingModelNumber = await ModelNumber.find(
        modelNumber.partitionKey
      )
      expect(existingModelNumber).toBeNull()
    })

    test('should return false if a modelNumber does not exist', async () => {
      expect.assertions(1)
      expect(await ModelNumber.destroy('Some-Made-Up-Id')).toBeFalsy()
    })
  })
})
