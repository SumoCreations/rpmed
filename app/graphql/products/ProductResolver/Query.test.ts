import { IModelNumber, IProduct, ModelNumber, Product } from "../../../models"
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
      expect(output.product.name).toEqual(existingProduct.name)
    })

    test("should return an error if it does not exist", async () => {
      expect.assertions(1)
      const output = await Query.product({}, { id: "DOES-NOT-EXIST" })
      expect(output.success).toEqual(false)
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
      expect(output.products.length > 1).toEqual(true)
    })
  })

  describe("Query.modelNumber", () => {
    let existingModelNumber: IModelNumber

    beforeEach(async (done) => {
      existingModelNumber = await ModelNumber.create({
        description: "MedLED Chrome MC7 PRO Hard Top; Standard Kit",
        feeWithWarranty: 0,
        feeWithoutWarranty: 250,
        id: "MC7-HT-SK-TEST-1",
        lotted: true,
        productId: existingProduct.partitionKey,
        resolutionWithWarranty: "Do something...",
        resolutionWithoutWarranty: "Do something else..",
        warrantyDescription: "All headlamps covered for 1 year",
        warrantyTerm: 12,
      })
      await ModelNumber.create({
        description: "MedLED Chrome MC7 PRO Hard Top; Standard Kit",
        feeWithWarranty: 0,
        feeWithoutWarranty: 250,
        id: "MC7-HT-SK-TEST-2",
        lotted: true,
        productId: existingProduct.partitionKey,
        resolutionWithWarranty: "Do something...",
        resolutionWithoutWarranty: "Do something else..",
        warrantyDescription: "All headlamps covered for 1 year",
        warrantyTerm: 12,
      })
      done()
    })

    test("should return a modelNumber if it exists", async () => {
      expect.assertions(1)
      const output = await Query.modelNumber({}, { id: existingModelNumber.partitionKey })
      expect(output.modelNumber.id).toEqual(existingModelNumber.partitionKey)
    })

    test("should return an error if it does not exist", async () => {
      expect.assertions(1)
      const output = await Query.modelNumber({}, { id: "DOES-NOT-EXIST" })
      expect(output.success).toEqual(false)
    })
  })

  describe("Query.modelNumbers", () => {
    test("should return all existing modelNumbers", async () => {
      expect.assertions(1)
      const modelNumbers = await ModelNumber.all()
      await Promise.all(modelNumbers.map(async (p) => await ModelNumber.destroy(p.partitionKey)))

      await ModelNumber.create({
        description: "MedLED Chrome MC7 PRO Hard Top; Standard Kit",
        feeWithWarranty: 0,
        feeWithoutWarranty: 250,
        id: "MC7-HT-SK-TEST-3",
        lotted: true,
        productId: existingProduct.partitionKey,
        resolutionWithWarranty: "Do something...",
        resolutionWithoutWarranty: "Do something else..",
        warrantyDescription: "All headlamps covered for 1 year",
        warrantyTerm: 12,
      })
      await ModelNumber.create({
        description: "MedLED Chrome MC7 PRO Hard Top; Standard Kit",
        feeWithWarranty: 0,
        feeWithoutWarranty: 250,
        id: "MC7-HT-SK-TEST-4",
        lotted: true,
        productId: existingProduct.partitionKey,
        resolutionWithWarranty: "Do something...",
        resolutionWithoutWarranty: "Do something else..",
        warrantyDescription: "All headlamps covered for 1 year",
        warrantyTerm: 12,
      })
      const output = await Query.modelNumbers({}, {})
      expect(output.modelNumbers.length > 1).toEqual(true)
    })
  })
})
