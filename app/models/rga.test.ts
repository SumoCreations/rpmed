import { isEmpty } from "validator"
import { Distributor, IDistributor } from "./distributor"
import { IRGA, RGA } from "./rga"

const existingRGAParams = {
  submittedBy: "example-user@klsmartin.com",
  submittedOn: new Date().toISOString(),
}


describe("rga", () => {
  let rga: IRGA
  let distributor: IDistributor
  beforeEach(async (done) => {
    distributor = await Distributor.create({
      domain: "klsmartin.com",
      name: "klsMartin",
    })
    rga = await RGA.create({
      ...existingRGAParams,
      distributorId: distributor.partitionKey
    })
    done()
  })

  afterEach(async (done) => {
    await RGA.destroy(rga.partitionKey)
    done()
  })

  describe("create", () => {
    test("should generate a new rga", () => {
      expect(isEmpty(rga.partitionKey)).toBe(false)
      expect(rga.sortKey).toBe(RGA.SECONDARY_KEY)
    })
  })

  describe("find", () => {
    test("should return a rga if one exists", async () => {
      expect.assertions(1)
      const existingRGA = await RGA.find(rga.partitionKey)
      expect(existingRGA).not.toBeNull()
    })

    test("should return null if a rga does not exist", async () => {
      expect.assertions(1)
      const existingRGA = await RGA.find("Some-Made-Up-Id")
      expect(existingRGA).toBeNull()
    })
  })

  describe("destroy", () => {
    test("should delete a rga and return true if one exists", async () => {
      expect.assertions(2)
      expect(await RGA.destroy(rga.partitionKey)).toBeTruthy()
      const existingRGA = await RGA.find(rga.partitionKey)
      expect(existingRGA).toBeNull()
    })

    test("should return false if a rga does not exist", async () => {
      expect.assertions(1)
      expect(await RGA.destroy("Some-Made-Up-Id")).toBeFalsy()
    })
  })
})
