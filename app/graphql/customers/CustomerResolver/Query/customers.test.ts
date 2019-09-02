import { Customer } from "../../../../models"
import { customers } from "./customers"

describe("Query", () => {
  describe("customers", () => {
    test("should return all existing customers", async () => {
      expect.assertions(4)
      const existingCustomers = await Customer.all()
      await Promise.all(
        existingCustomers.map(async p => await Customer.destroy(p.partitionKey))
      )
      await Customer.create({
        email: "customers-query-test-3@rpmed.com",
        name: "Test User 1",
      })
      await Customer.create({
        email: "customers-query-test-4@rpmed.com",
        name: "Test User 2",
      })
      const output = await customers({}, {})
      expect(output.success).toEqual(true)
      expect(output.customer).toBeUndefined()
      expect(output.customers).toBeDefined()
      expect(output.customers.length > 1).toEqual(true)
    })
  })
})
