import { IProduct, Product } from "../../../../models"
import { destroyProduct } from "./destroyProduct"

const sampleParams = {
  description: "It had a good life...",
  name: "A Product To Destroy",
}

describe("destroyProduct", () => {
  let existingProduct: IProduct
  beforeEach(async (done) => {
    existingProduct = await Product.create({ ...sampleParams })
    done()
  })

  afterEach(async (done) => {
    await Product.destroy(existingProduct.partitionKey)
    done()
  })

  test("should destroy the Product", async () => {
    expect.assertions(1)
    const output = await destroyProduct(null, { id: existingProduct.partitionKey })
    expect(output.success).toBe(true)
  })

  test("should fail the Product does not exist", async () => {
    expect.assertions(1)
    const output = await destroyProduct(null, { id: "some-made-up-id-or-key" })
    expect(output.success).toBe(false)
  })

})
