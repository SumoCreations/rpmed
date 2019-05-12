import { DateTime } from "luxon"
import { Distributor, IRGA, RGA } from "../../../../models"
import { createRGA } from "./createRGA"

const sampleParams = {
  submittedBy: "someone-ex1@someOtherPartner.com",
  submittedOn: DateTime.utc(2019, 5, 7, 1, 12, 11, 10).toISO(),
}

describe("createRGA", () => {
  let existingRGA: IRGA
  beforeAll(async (done) => {
    existingRGA = await RGA.create({
      distributorId: "something-made-up",
      submittedBy: "someone-ex1@partner.com",
      submittedOn: DateTime.utc(2019, 5, 7, 1, 12, 11, 10).toISO(),
    })
    done()
  })

  afterAll(async (done) => {
    await RGA.destroy(existingRGA.partitionKey)
    done()
  })

  test("should generate a new rga if it is valid", async () => {
    expect.assertions(1)
    const output = await createRGA(null, {
      rgaInput: {
        ...sampleParams,
      }
    })
    expect(output.success).toBe(true)
  })

  test("should generate a distributor that matches the submitted by domain", async () => {
    expect.assertions(2)
    const output = await createRGA(null, {
      rgaInput: {
        ...sampleParams,
      }
    })
    const distributor = await Distributor.find(output.rga.distributorId)
    expect(output.success).toEqual(true)
    expect(distributor.domain).toEqual("someOtherPartner.com")
  })

  test("should fail if the RGA does not pass validations", async () => {
    expect.assertions(3)
    const invalidInput: any = {
      rgaInput: {
        ...sampleParams,
        submittedBy: "john@notvalid",
        submittedOn: null
      }
    }
    const output = await createRGA(null, invalidInput)
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("submittedBy")
    expect(output.errors.map(e => e.path)).toContain("submittedOn")
  })
})
