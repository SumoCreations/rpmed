import { v4 as uuid } from "uuid"
import {
  generateSampleParams,
  IRegistrationSampleParamOutput,
} from "../testHelpers"
import { createProductRegistration } from "./createProductRegistration"

describe("createProductRegistration", () => {
  let lottedSample: IRegistrationSampleParamOutput
  let unlottedSample: IRegistrationSampleParamOutput

  beforeAll(async done => {
    try {
      lottedSample = await generateSampleParams({
        key: "CREATE-TST-1",
        lotted: true,
        serial: "SERIAL-1",
      })
      unlottedSample = await generateSampleParams({
        key: "CREATE-TST-UN-2",
        lotted: false,
        serial: null,
      })
    } catch (e) {
      // tslint:disable
      console.log("Error generating samples...")
      console.log(e)
      // tslint:enable
    }
    done()
  })

  test("should generate a new productRegistration model if the productRegistration is valid", async () => {
    expect.assertions(1)
    const output = await createProductRegistration(null, {
      productRegistrationInput: {
        ...lottedSample.sampleParams,
        serial: `CREATE-TEST-${uuid()}`,
      },
    })
    expect(output.success).toBe(true)
  })

  test("should fail if the product does not exist", async () => {
    expect.assertions(2)
    const output = await createProductRegistration(null, {
      productRegistrationInput: {
        ...lottedSample.sampleParams,
        modelNumber: "model-does-not-exist",
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("modelNumber")
  })

  test("should fail if the customer does not exist", async () => {
    expect.assertions(2)
    const output = await createProductRegistration(null, {
      productRegistrationInput: {
        ...lottedSample.sampleParams,
        customerId: "customer-does-not-exist",
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("customerId")
  })

  test("should fail if the serial number is blank on a lotted product", async () => {
    expect.assertions(2)
    const output = await createProductRegistration(null, {
      productRegistrationInput: { ...lottedSample.sampleParams, serial: "" },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("serial")
  })

  test("should not fail if the serial number is blank on a non-lotted product", async () => {
    expect.assertions(1)
    const output = await createProductRegistration(null, {
      productRegistrationInput: { ...unlottedSample.sampleParams, serial: "" },
    })
    expect(output.success).toBe(true)
  })

  test("should fail and report multiple invalid values", async () => {
    expect.assertions(3)
    const output = await createProductRegistration(null, {
      productRegistrationInput: {
        ...unlottedSample.sampleParams,
        customerId: null,
        modelNumber: null,
        productId: null,
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("customerId")
    expect(output.errors.map(e => e.path)).toContain("modelNumber")
  })

  test("should fail if the serial number is already in use", async () => {
    expect.assertions(2)
    await createProductRegistration(null, {
      productRegistrationInput: {
        ...lottedSample.sampleParams,
        serial: "DUPLICATE-ME",
      },
    })
    const output = await createProductRegistration(null, {
      productRegistrationInput: {
        ...lottedSample.sampleParams,
        serial: "DUPLICATE-ME",
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("serial")
  })
})
