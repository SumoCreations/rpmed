import { Distributor } from "../../../../models"
import { distributors } from "./distributors"

describe("Query", () => {
  describe("distributors", () => {
    test("should return all existing distributors", async () => {
      expect.assertions(4)
      const existingDistributors = await Distributor.all()
      await Promise.all(
        existingDistributors.map(
          async p => await Distributor.destroy(p.partitionKey)
        )
      )
      await Distributor.create({
        domain: "distributors-query-test-3@rpmed.com",
        name: "Test User 1",
      })
      await Distributor.create({
        domain: "distributors-query-test-4@rpmed.com",
        name: "Test User 2",
      })
      const output = await distributors()
      expect(output.success).toEqual(true)
      expect(output.distributor).toBeUndefined()
      expect(output.distributors).toBeDefined()
      expect(output.distributors.length > 1).toEqual(true)
    })
  })
})
