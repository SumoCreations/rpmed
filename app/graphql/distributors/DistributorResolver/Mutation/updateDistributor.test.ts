import { Distributor, IDistributor } from "../../../../models"
import { updateDistributor } from "./updateDistributor"

const sampleParams = { domain: "example.com", name: "Jim Jeffers" }

describe("updateDistributor", () => {
  let distributor: IDistributor
  beforeEach(async done => {
    distributor = await Distributor.create({ ...sampleParams })
    done()
  })

  afterEach(async done => {
    await Distributor.destroy(distributor.partitionKey)
    done()
  })

  test("should update the distributor", async () => {
    expect.assertions(1)
    const distributorInput = {
      id: distributor.partitionKey,
      ...sampleParams,
      domain: "example2.com",
    }
    const output = await updateDistributor(null, { distributorInput })
    expect(output.success).toBe(true)
  })

  test("should fail if the domain is already in use", async () => {
    expect.assertions(2)
    const existingDomain = "distributor.com"
    await Distributor.create({ ...sampleParams, domain: existingDomain })
    const output = await updateDistributor(null, {
      distributorInput: {
        id: distributor.partitionKey,
        ...sampleParams,
        domain: existingDomain,
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("domain")
  })

  test("should fail if the distributor does not exist", async () => {
    expect.assertions(1)
    const output = await updateDistributor(null, {
      distributorInput: { id: "some-made-up-key", ...sampleParams },
    })
    expect(output.success).toBe(false)
  })
})
