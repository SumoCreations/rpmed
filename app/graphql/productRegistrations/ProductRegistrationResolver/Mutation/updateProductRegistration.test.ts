import { IProductRegistration, ProductRegistration } from "../../../../models"
import { generateSampleParams, IRegistrationSampleParamOutput } from "../testHelpers"
import { updateProductRegistration } from "./updateProductRegistration"

describe("updateProductRegistration", () => {

  let sample1: IRegistrationSampleParamOutput
  let registration: IProductRegistration
  beforeEach(async (done) => {
    sample1 = await generateSampleParams({ key: "UPDATE-TST-1", lotted: false, serial: null })
    registration = await ProductRegistration.create({ ...sample1.sampleParams })
    done()
  })

  afterEach(async (done) => {
    await ProductRegistration.destroy(registration.partitionKey)
    done()
  })

  test("should update the productRegistration", async () => {
    expect.assertions(1)
    const productRegistrationInput = { ...sample1.sampleParams, id: registration.partitionKey, serial: "UPDATETEST2000" }
    const output = await updateProductRegistration(null, { productRegistrationInput })
    expect(output.success).toBe(true)
  })

  test("should fail if the serial is already in use", async () => {
    expect.assertions(2)
    const existingSerial = "ALREADYEXISTS"
    await ProductRegistration.create({ ...sample1.sampleParams, serial: existingSerial })
    const productRegistrationInput = { ...sample1.sampleParams, id: registration.partitionKey, serial: existingSerial }
    const output = await updateProductRegistration(null, { productRegistrationInput })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("serial")
  })

  test("should fail if the productRegistration does not exist", async () => {
    expect.assertions(1)
    const output = await updateProductRegistration(null, { productRegistrationInput: { ...sample1.sampleParams, id: "some-made-up-key" } })
    expect(output.success).toBe(false)
  })

})
