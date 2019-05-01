import { isEmpty } from "validator"
import { Distributor, IDistributor } from "./distributor"

const existingDistributorParams = {
  domain: "klsmartin.com",
  name: "KLS Martin"
}

describe("distributor", () => {
  let distributor: IDistributor
  beforeEach(async (done) => {
    distributor = await Distributor.create({ ...existingDistributorParams })
    done()
  })

  afterEach(async (done) => {
    await Distributor.destroy(distributor.partitionKey)
    done()
  })

  describe("create", () => {
    test("should generate a new distributor", () => {
      expect(isEmpty(distributor.partitionKey)).toBe(false)
      expect(distributor.sortKey).toBe(Distributor.SECONDARY_KEY)
    })
  })

  describe("find", () => {
    test("should return a distributor if one exists", async () => {
      expect.assertions(1)
      const existingDistributor = await Distributor.find(distributor.partitionKey)
      expect(existingDistributor).not.toBeNull()
    })

    test("should return null if a distributor does not exist", async () => {
      expect.assertions(1)
      const existingDistributor = await Distributor.find("Some-Made-Up-Id")
      expect(existingDistributor).toBeNull()
    })
  })

  describe("destroy", () => {
    test("should delete a distributor and return true if one exists", async () => {
      expect.assertions(2)
      expect(await Distributor.destroy(distributor.partitionKey)).toBeTruthy()
      const existingDistributor = await Distributor.find(distributor.partitionKey)
      expect(existingDistributor).toBeNull()
    })

    test("should return false if a distributor does not exist", async () => {
      expect.assertions(1)
      expect(await Distributor.destroy("Some-Made-Up-Id")).toBeFalsy()
    })
  })
})
