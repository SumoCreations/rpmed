import { isEmpty } from 'validator'
import { Customer, ICustomer } from './customer'

const existingCustomerParams = {
  email: 'doug@klsmartin.com',
  name: 'KLS Martin',
  specialty: 'Surgeon',
}

describe('customer', () => {
  let customer: ICustomer
  beforeAll(async done => {
    customer = await Customer.create({ ...existingCustomerParams })
    done()
  })

  afterAll(async done => {
    await Customer.destroy(customer.partitionKey)
    done()
  })

  describe('create', () => {
    test('should generate a new customer', () => {
      expect(isEmpty(customer.partitionKey)).toBe(false)
      expect(customer.sortKey).toBe(Customer.SECONDARY_KEY)
    })
  })

  describe('find', () => {
    test('should return a customer if one exists', async () => {
      expect.assertions(1)
      const existingCustomer = await Customer.find(customer.partitionKey)
      expect(existingCustomer).not.toBeNull()
    })

    test('should return null if a customer does not exist', async () => {
      expect.assertions(1)
      const existingCustomer = await Customer.find('Some-Made-Up-Id')
      expect(existingCustomer).toBeNull()
    })
  })

  describe('destroy', () => {
    test('should delete a customer and return true if one exists', async () => {
      expect.assertions(2)
      expect(await Customer.destroy(customer.partitionKey)).toBeTruthy()
      const existingCustomer = await Customer.find(customer.partitionKey)
      expect(existingCustomer).toBeNull()
    })

    test('should return false if a customer does not exist', async () => {
      expect.assertions(1)
      expect(await Customer.destroy('Some-Made-Up-Id')).toBeFalsy()
    })
  })
})
