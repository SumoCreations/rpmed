import { Distributor, IDistributor } from "../../../../models"
import { distributor } from "./distributor"

describe("Query", () => {

  let existingDistributor: IDistributor
  let existingDistributor2: IDistributor
  beforeAll(async (done) => {
    existingDistributor = await Distributor.create({
      domain: "distributors-query-test-1@rpmed.com",
      name: "Test Distributor 1",
    })
    existingDistributor2 = await Distributor.create({
      domain: "distributors-query-test-2@rpmed.com",
      name: "Test Distributor 2",
    })
    done()
  })

  afterAll(async (done) => {
    await Distributor.destroy(existingDistributor.partitionKey)
    await Distributor.destroy(existingDistributor2.partitionKey)
    done()
  })

  describe("distributor", () => {
    test("should return a distributor if it exists", async () => {
      expect.assertions(5)
      const output = await distributor({}, { id: existingDistributor.partitionKey })
      expect(output.success).toEqual(true)
      expect(output.distributor).toBeDefined()
      expect(output.distributors).toBeUndefined()
      expect(output.distributor.name).toEqual(existingDistributor.name)
      expect(output.distributor.domain).toEqual(existingDistributor.domain)
    })

    test("should return an error if it does not exist", async () => {
      expect.assertions(4)
      const output = await distributor({}, { id: "DOES-NOT-EXIST" })
      expect(output.success).toEqual(false)
      expect(output.distributor).toBeUndefined()
      expect(output.distributors).toBeUndefined()
      expect(output.errors).toBeDefined()
    })
  })

})