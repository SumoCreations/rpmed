import { Customer, ICustomer } from '../../../../models'
import { updateCustomer } from './updateCustomer'

const sampleParams = {
  email: 'update-customer-test@example.com',
  name: 'Jim Jeffers',
}

describe('updateCustomer', () => {
  let customer: ICustomer
  beforeEach(async done => {
    customer = await Customer.create({ ...sampleParams })
    done()
  })

  afterEach(async done => {
    await Customer.destroy(customer.partitionKey)
    done()
  })

  test('should update the customer', async () => {
    expect.assertions(1)
    const customerInput = {
      id: customer.partitionKey,
      ...sampleParams,
      email: 'update-customer-2@example.com',
    }
    const output = await updateCustomer(null, { customerInput })
    expect(output.success).toBe(true)
  })

  test('should fail the email is invalid', async () => {
    expect.assertions(2)
    const customerInput = {
      id: customer.partitionKey,
      ...sampleParams,
      email: 'update-customer-2@not-valid',
    }
    const output = await updateCustomer(null, { customerInput })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('email')
  })

  test('should fail if the email is already in use', async () => {
    expect.assertions(2)
    const existingEmail = 'another@customer.com'
    await Customer.create({ ...sampleParams, email: existingEmail })
    const output = await updateCustomer(null, {
      customerInput: {
        id: customer.partitionKey,
        ...sampleParams,
        email: existingEmail,
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('email')
  })

  test('should fail if the customer does not exist', async () => {
    expect.assertions(1)
    const output = await updateCustomer(null, {
      customerInput: { id: 'some-made-up-key', ...sampleParams },
    })
    expect(output.success).toBe(false)
  })
})
