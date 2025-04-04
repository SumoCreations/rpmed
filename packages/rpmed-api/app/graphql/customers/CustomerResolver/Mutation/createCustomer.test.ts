import { Customer, ICustomer } from '../../../../models'
import { TST_ORIGIN_CTX } from '../../../auth'
import { createCustomer } from './createCustomer'

const email = 'create-customer-test@rpmed.com'
const name = 'Jim Jeffers'

const sampleParams = {
  email,
  name,
  specialty: 'General',
}

describe('createCustomer', () => {
  let customer: ICustomer
  beforeEach(
    async () =>
      (customer = await Customer.create({
        email: 'create-customer-test-2@rpmed.com',
        name,
        specialty: 'General',
      }))
  )

  afterEach(async () => await Customer.destroy(customer.partitionKey))

  test('should generate a new customer model if the customer is valid', async () => {
    expect.assertions(1)
    const output = await createCustomer(
      null,
      {
        customerInput: { ...sampleParams },
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(true)
  })

  test('should fail if the email is invalid', async () => {
    expect.assertions(2)
    const output = await createCustomer(
      null,
      {
        customerInput: { ...sampleParams, email: 'invalid@notemail' },
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('email')
  })

  test('should fail and report multiple invalid values', async () => {
    expect.assertions(2)
    const output = await createCustomer(
      null,
      {
        customerInput: {
          email: 'jimsumocreations.com',
          name: null,
          specialty: 'General',
        },
      },
      TST_ORIGIN_CTX
    )
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain('email')
  })

  // We now just silently return the existing customer if the email already exists.

  // test('should fail if the email is already in use', async () => {
  //   expect.assertions(2)
  //   const output = await createCustomer(
  //     null,
  //     {
  //       customerInput: { ...sampleParams, email },
  //     },
  //     TST_ORIGIN_CTX
  //   )
  //   expect(output.success).toBe(false)
  //   expect(output.errors.map(e => e.path)).toContain('email')
  // })
})
