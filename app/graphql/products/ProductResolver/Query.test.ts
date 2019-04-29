import { IProduct, Product } from "../../../models"
import * as Query from "./Query"

describe("Query", () => {
  let existingProduct: IProduct

  beforeEach(async (done) => {
    existingProduct = await Product.create({
      description: "MedLED Onyx 2nd Bezel",
      name: "MLOX100-BZL",
    })
    await Product.create({
      description: "MedLED Onyx 3rd Bezel",
      name: "MLOX101-BZL",
    })
    done()
  })

  afterEach(async (done) => {
    await Product.destroy(existingProduct.partitionKey)
    done()
  })

  describe("Query.product", () => {
    test("should return a product if it exists", async () => {
      expect.assertions(1)
      const output = await Query.product({}, { id: existingProduct.partitionKey })
      expect(output.name).toEqual(existingProduct.name)
    })

    test("should return an error if it does not exist", async () => {
      expect.assertions(1)
      const output = await Query.product({}, { id: "DOES-NOT-EXIST" })
      expect(output).toBeNull()
    })
  })

  describe("Query.products", () => {
    test("should return all existing products", async () => {
      expect.assertions(1)
      const products = await Product.all()
      await Promise.all(products.map(async (p) => await Product.destroy(p.partitionKey)))
      await Product.create({
        description: "MedLED Onyx 3rd Bezel 001",
        name: "MLOX101-BZL",
      })
      await Product.create({
        description: "MedLED Onyx 3rd Bezel 002",
        name: "MLOX101-BZL",
      })
      await Product.create({
        description: "MedLED Onyx 3rd Bezel 003",
        name: "MLOX101-BZL",
      })
      const output = await Query.products({}, {})
      expect(output.length > 1).toEqual(true)
    })
  })
})
