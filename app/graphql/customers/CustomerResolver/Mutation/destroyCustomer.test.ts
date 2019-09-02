import { Customer, ICustomer } from "../../../../models"
import { destroyCustomer } from "./destroyCustomer"

const sampleParams = {
  email: "destroy-customer-test@example.com",
  name: "Jim Jeffers",
}

describe("destroyCustomer", () => {
  let customer: ICustomer
  beforeEach(async done => {
    customer = await Customer.create({ ...sampleParams })
    done()
  })

  afterEach(async done => {
    await Customer.destroy(customer.partitionKey)
    done()
  })

  test("should destroy the customer", async () => {
    expect.assertions(1)
    const output = await destroyCustomer(null, { id: customer.partitionKey })
    expect(output.success).toBe(true)
  })

  test("should fail the customer does not exist", async () => {
    expect.assertions(1)
    const output = await destroyCustomer(null, { id: "some-made-up-id-or-key" })
    expect(output.success).toBe(false)
  })
})
