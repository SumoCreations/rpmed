import { Distributor, IDistributor } from "../../../../models"
import { createDistributor } from "./createDistributor"

const domain = "example10.com"
const name = "KLS Martin"

const sampleParams = {
  domain,
  name
}

describe("createDistributor", () => {
  let distributor: IDistributor
  beforeEach(async () =>
    distributor = await Distributor.create({
      domain: "example11.com",
      name,
    })
  )

  afterEach(async () => await Distributor.destroy(distributor.partitionKey))

  test("should generate a new distributor model if the distributor is valid", async () => {
    expect.assertions(1)
    const output = await createDistributor(null, { distributorInput: { ...sampleParams } })
    expect(output.success).toBe(true)
  })

  test("should fail if the domain is blank", async () => {
    expect.assertions(2)
    const output = await createDistributor(null, { distributorInput: { ...sampleParams, domain: "" } })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("domain")
  })

  test("should fail and report multiple invalid values", async () => {
    expect.assertions(3)
    const output = await createDistributor(null, { distributorInput: { domain: null, name: null } })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("domain")
    expect(output.errors.map(e => e.path)).toContain("name")
  })

  test("should fail if the domain is already in use", async () => {
    expect.assertions(2)
    const output = await createDistributor(null, { distributorInput: { ...sampleParams, domain } })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("domain")
  })

})
