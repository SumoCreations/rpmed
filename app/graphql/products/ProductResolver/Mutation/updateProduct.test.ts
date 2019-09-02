import { IProduct, Product } from "../../../../models"
import { updateProduct } from "./updateProduct"

describe("updateProduct", () => {
  let existingProduct: IProduct
  let conflictingProduct: IProduct
  beforeEach(async done => {
    existingProduct = await Product.create({
      description: "MedLED Onyx 2nd Gen Mid-Tier",
      name: "Updated MedLED Onyx (MLOX100)",
    })
    conflictingProduct = await Product.create({
      description: "An extremely bright magnified LED headlamp",
      name: "HyperBeam XS",
    })
    done()
  })

  afterEach(async done => {
    await Product.destroy(existingProduct.partitionKey)
    done()
  })

  test("should update the product if it exists", async () => {
    expect.assertions(1)
    const output = await updateProduct(null, {
      productInput: {
        description: "This is an updated description.",
        id: existingProduct.partitionKey,
        name: "Something New",
      },
    })
    expect(output.success).toBe(true)
  })

  test("should update the product if the name remains the same", async () => {
    expect.assertions(1)
    const output = await updateProduct(null, {
      productInput: {
        description: "The name is the same but not the description.",
        id: existingProduct.partitionKey,
        name: existingProduct.name,
      },
    })
    expect(output.success).toBe(true)
  })

  test("should fail if the updated product name conflicts with another existing product", async () => {
    expect.assertions(2)
    const output = await updateProduct(null, {
      productInput: {
        description: existingProduct.description,
        id: existingProduct.partitionKey,
        name: conflictingProduct.name,
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("name")
  })

  test("should fail if the product does not exists", async () => {
    expect.assertions(2)
    const output = await updateProduct(null, {
      productInput: {
        description: existingProduct.description,
        id: "SOME-MADE-UP-KEY",
        name: existingProduct.name,
      },
    })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("id")
  })

  test("should fail if the model number does not pass validations", async () => {
    expect.assertions(3)
    const invalidInput: any = {
      productInput: {
        description: null,
        id: existingProduct.partitionKey,
        name: null,
      },
    }
    const output = await updateProduct(null, invalidInput)
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("name")
    expect(output.errors.map(e => e.path)).toContain("description")
  })
})
