import { IProduct, Product } from "../../../../models";
import { createProduct } from "./createProduct"

const sampleParams = {
  description: "An extremely bright magnified LED headlamp",
  name: "HyperBeam XS",
}

describe("createProduct", () => {
  let existingProduct: IProduct
  beforeEach(async () => {
    existingProduct = await Product.create({
      description: "MedLED Onyx 2nd Gen Mid-Tier",
      name: "MedLED Onyx (MLOX100)",
    })
  })

  afterEach(async (done) => {
    await Product.destroy(existingProduct.partitionKey)
    done()
  })

  test("should generate a new product if it is valid", async () => {
    expect.assertions(1)
    const output = await createProduct(null, {
      productInput: {
        ...sampleParams
      }
    })
    expect(output.success).toBe(true)
  })

  test("should fail if the product already exists", async () => {
    expect.assertions(2)
    const output = await createProduct(null, {
      productInput: {
        ...sampleParams,
        name: existingProduct.name,
      }
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("id")
  })

  test("should fail if the model number does not pass validations", async () => {
    expect.assertions(3)
    const invalidInput: any = {
      productInput: {
        ...sampleParams,
        description: null,
        name: null
      }
    }
    const output = await createProduct(null, invalidInput)
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("name")
    expect(output.errors.map(e => e.path)).toContain("description")
  })
})
