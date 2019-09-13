import { v4 as uuid } from 'uuid'
import { isEmpty } from 'validator'
import { Customer, ICustomer } from './customer'
import { IModelNumber, ModelNumber, ProductType } from './modelNumber'
import { IProduct, Product } from './product'
import {
  IProductRegistration,
  ProductRegistration,
} from './productRegistration'

describe('product registration', () => {
  let customer: ICustomer
  let modelNumber: IModelNumber
  let product: IProduct
  let productRegistration: IProductRegistration
  let unrelatedProduct: IProduct
  let unrelatedModel: IModelNumber
  let unrelatedReg1: IProductRegistration
  let unrelatedReg2: IProductRegistration
  let unrelatedReg3: IProductRegistration

  beforeAll(async done => {
    product = await Product.create({
      description: 'MedLED Chrome MC7 PRO',
      name: 'Chrome Registration Tester 1',
    })
    modelNumber = await ModelNumber.create({
      description: 'MedLED Chrome MC7 PRO Hard Top; Standard Kit',
      feeWithWarranty: { distributor: '0', endUser: '10' },
      feeWithoutWarranty: { distributor: '250', endUser: '300' },
      id: 'MC7-HT-SK-REGISTER-TESTS',
      lotted: true,
      pricing: { cost: '1000', retail: '1200' },
      productIds: [product.partitionKey],
      productType: ProductType.HEADLIGHT,
      resolutionWithWarranty: 'Do something...',
      resolutionWithoutWarranty: 'Do something else..',
      warrantyDescription: 'All headlamps covered for 1 year',
      warrantyTerm: 12,
    })
    customer = await Customer.create({
      email: 'doug@klsmartin.com',
      name: 'KLS Martin',
    })
    productRegistration = await ProductRegistration.create({
      customerId: customer.partitionKey,
      id: uuid(),
      lotted: modelNumber.lotted,
      modelNumber: modelNumber.partitionKey,
      productId: product.partitionKey,
      registeredOn: new Date().toISOString(),
    })
    unrelatedProduct = await Product.create({
      description: 'MedLED Chrome MC7 PRO ',
      name: 'Chrome Registration Tester 2',
    })
    unrelatedModel = await ModelNumber.create({
      description: 'MedLED Chrome MC7 PRO Hard Top; Standard Kit',
      feeWithWarranty: { distributor: '0', endUser: '10' },
      feeWithoutWarranty: { distributor: '250', endUser: '300' },
      id: uuid(),
      lotted: true,
      pricing: { cost: '0', retail: '100' },
      productIds: [product.partitionKey],
      productType: ProductType.HEADLIGHT,
      resolutionWithWarranty: 'Do something...',
      resolutionWithoutWarranty: 'Do something else..',
      warrantyDescription: 'All headlamps covered for 1 year',
      warrantyTerm: 12,
    })
    unrelatedReg1 = await ProductRegistration.create({
      customerId: customer.partitionKey,
      id: uuid(),
      lotted: modelNumber.lotted,
      modelNumber: modelNumber.partitionKey,
      productId: product.partitionKey,
      registeredOn: new Date().toISOString(),
    })
    unrelatedReg2 = await ProductRegistration.create({
      customerId: customer.partitionKey,
      id: uuid(),
      lotted: unrelatedModel.lotted,
      modelNumber: unrelatedModel.partitionKey,
      productId: product.partitionKey,
      registeredOn: new Date().toISOString(),
    })
    unrelatedReg3 = await ProductRegistration.create({
      customerId: customer.partitionKey,
      id: uuid(),
      lotted: unrelatedModel.lotted,
      modelNumber: unrelatedModel.partitionKey,
      productId: unrelatedProduct.partitionKey,
      registeredOn: new Date().toISOString(),
    })
    done()
  })

  afterAll(async done => {
    await Customer.destroy(customer.partitionKey)
    await ModelNumber.destroy(modelNumber.partitionKey)
    await ModelNumber.destroy(unrelatedModel.partitionKey)
    await Product.destroy(product.partitionKey)
    await Product.destroy(unrelatedProduct.partitionKey)
    await ProductRegistration.destroy(productRegistration.partitionKey)
    await ProductRegistration.destroy(unrelatedReg1.partitionKey)
    await ProductRegistration.destroy(unrelatedReg2.partitionKey)
    await ProductRegistration.destroy(unrelatedReg3.partitionKey)
    done()
  })

  describe('create', () => {
    test('should generate a new product registration with a constant sort key', () => {
      expect(isEmpty(productRegistration.partitionKey)).toBe(false)
      expect(productRegistration.sortKey).toBe(
        ProductRegistration.SECONDARY_KEY
      )
    })
  })

  describe('find', () => {
    test('should return a product registration if one exists', async () => {
      expect.assertions(1)
      const existingProduct = await ProductRegistration.find(
        productRegistration.partitionKey
      )
      expect(existingProduct).not.toBeNull()
    })

    test('should return null if a product registration does not exist', async () => {
      expect.assertions(1)
      const existingProduct = await ProductRegistration.find('Some-Made-Up-Id')
      expect(existingProduct).toBeNull()
    })
  })

  describe('forProduct', () => {
    test('should return a 3 product registration if two exists', async () => {
      expect.assertions(2)
      const existingRegistrations = await ProductRegistration.forProduct(
        product.partitionKey
      )
      expect(existingRegistrations).not.toBeNull()
      expect(existingRegistrations.length).toEqual(3)
    })

    test('should return 1 product registration for the unrelated product if it exists', async () => {
      expect.assertions(2)
      const existingRegistrations = await ProductRegistration.forProduct(
        unrelatedProduct.partitionKey
      )
      expect(existingRegistrations).not.toBeNull()
      expect(existingRegistrations.length).toEqual(1)
    })

    test('should return an empty array if a product registration does not exist', async () => {
      expect.assertions(2)
      const existingRegistrations = await ProductRegistration.forProduct(
        'DOES-NOT-EXIST'
      )
      expect(existingRegistrations).not.toBeNull()
      expect(existingRegistrations.length).toEqual(0)
    })
  })

  describe('forModel', () => {
    test('should return a 1 product registration if one exists', async () => {
      expect.assertions(2)
      const existingRegistrations = await ProductRegistration.forModel({
        modelNumber: unrelatedModel.partitionKey,
        productId: unrelatedProduct.partitionKey,
      })
      expect(existingRegistrations).not.toBeNull()
      expect(existingRegistrations.length).toEqual(1)
    })

    test('should return 2 product registrations if they exist', async () => {
      expect.assertions(2)
      const existingRegistrations = await ProductRegistration.forModel({
        modelNumber: modelNumber.partitionKey,
        productId: product.partitionKey,
      })
      expect(existingRegistrations).not.toBeNull()
      expect(existingRegistrations.length).toEqual(2)
    })

    test('should return an empty array if a product registration does not exist', async () => {
      expect.assertions(2)
      const existingRegistrations = await ProductRegistration.forProduct(
        'DOES-NOT-EXIST'
      )
      expect(existingRegistrations).not.toBeNull()
      expect(existingRegistrations.length).toEqual(0)
    })
  })

  describe('destroy', () => {
    test('should delete a product registration and return true if one exists', async () => {
      expect.assertions(2)
      expect(
        await ProductRegistration.destroy(productRegistration.partitionKey)
      ).toBeTruthy()
      const existingProduct = await ProductRegistration.find(
        productRegistration.partitionKey
      )
      expect(existingProduct).toBeNull()
    })

    test('should return false if a product registration does not exist', async () => {
      expect.assertions(1)
      expect(await ProductRegistration.destroy('Some-Made-Up-Id')).toBeFalsy()
    })
  })
})
