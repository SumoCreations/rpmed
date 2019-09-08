import { isEmpty } from 'validator'
import { IProduct, Product } from './product'

const existingProductParams = {
  description: 'MedLED Chrome MC7 PRO Hard Top; Standard Kit',
  name: 'Chrome MC7 Test'
}

describe('product', () => {
  let product: IProduct
  beforeEach(async done => {
    product = await Product.create({ ...existingProductParams })
    done()
  })

  afterEach(async done => {
    await Product.destroy(product.partitionKey)
    done()
  })

  describe('create', () => {
    test('should generate a new product', () => {
      expect(isEmpty(product.partitionKey)).toBe(false)
      expect(product.sortKey).toBe(Product.SECONDARY_KEY)
    })
  })

  describe('find', () => {
    test('should return a product if one exists', async () => {
      expect.assertions(1)
      const existingProduct = await Product.find(product.partitionKey)
      expect(existingProduct).not.toBeNull()
    })

    test('should return null if a product does not exist', async () => {
      expect.assertions(1)
      const existingProduct = await Product.find('Some-Made-Up-Id')
      expect(existingProduct).toBeNull()
    })
  })

  describe('destroy', () => {
    test('should delete a product and return true if one exists', async () => {
      expect.assertions(2)
      expect(await Product.destroy(product.partitionKey)).toBeTruthy()
      const existingProduct = await Product.find(product.partitionKey)
      expect(existingProduct).toBeNull()
    })

    test('should return false if a product does not exist', async () => {
      expect.assertions(1)
      expect(await Product.destroy('Some-Made-Up-Id')).toBeFalsy()
    })
  })
})
