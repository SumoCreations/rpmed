import { Customer, ICustomer } from "../../../../models"
import { customer } from "./customer"

describe("Query", () => {
  let existingCustomer: ICustomer
  let existingCustomer2: ICustomer
  beforeAll(async done => {
    existingCustomer = await Customer.create({
      email: "customers-query-test-1@rpmed.com",
      name: "Test User 1",
    })
    existingCustomer2 = await Customer.create({
      email: "customers-query-test-2@rpmed.com",
      name: "Test User 2",
    })
    done()
  })

  afterAll(async done => {
    await Customer.destroy(existingCustomer.partitionKey)
    await Customer.destroy(existingCustomer2.partitionKey)
    done()
  })

  describe("customer", () => {
    test("should return a customer if it exists", async () => {
      expect.assertions(5)
      const output = await customer({}, { id: existingCustomer.partitionKey })
      expect(output.success).toEqual(true)
      expect(output.customer).toBeDefined()
      expect(output.customers).toBeUndefined()
      expect(output.customer.name).toEqual(existingCustomer.name)
      expect(output.customer.email).toEqual(existingCustomer.email)
    })

    test("should return an error if it does not exist", async () => {
      expect.assertions(4)
      const output = await customer({}, { id: "DOES-NOT-EXIST" })
      expect(output.success).toEqual(false)
      expect(output.customer).toBeUndefined()
      expect(output.customers).toBeUndefined()
      expect(output.errors).toBeDefined()
    })
  })
})
