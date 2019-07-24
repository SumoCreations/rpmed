import { isEmpty } from "validator"
import { IModelNumber, ModelNumber } from "./modelNumber"
import { IProduct, Product } from "./product"

const existingModelParams = {
  description: "MedLED Chrome MC7 PRO Hard Top; Standard Kit",
  feeWithWarranty: 0,
  feeWithoutWarranty: 250,
  id: "MC7-HT-SK",
  lotted: true,
  resolutionWithWarranty: "Do something...",
  resolutionWithoutWarranty: "Do something else..",
  warrantyDescription: "All headlamps covered for 1 year",
  warrantyTerm: 12,
}

describe("modelNumber", () => {
  let modelNumber: IModelNumber
  let product: IProduct
  beforeAll(async (done) => {
    product = await Product.create({ name: "Chrome MC7 Pro", description: "The chrome MedLED Pro Headlamp" })
    modelNumber = await ModelNumber.create({ ...existingModelParams, productId: product.partitionKey })
    done()
  })

  afterAll(async (done) => {
    await ModelNumber.destroy(modelNumber.partitionKey)
    done()
  })

  describe("create", () => {
    test("should generate a new product configuration (model number)", () => {
      expect(isEmpty(modelNumber.partitionKey)).toBe(false)
      expect(modelNumber.sortKey).toBe(ModelNumber.SECONDARY_KEY)
    })

    test("should not generate a new model if the id was already used", async () => {
      expect.assertions(1)
      try {
        await ModelNumber.create({
          ...existingModelParams,
          productId: product.partitionKey
        })
      } catch (e) {
        expect(isEmpty(e.message)).toBe(false)
      }
    })
  })

  describe("find", () => {
    test("should return a modelNumber if one exists", async () => {
      expect.assertions(1)
      const existingModelNumber = await ModelNumber.find(modelNumber.partitionKey)
      expect(existingModelNumber).not.toBeNull()
    })

    test("should return null if a modelNumber does not exist", async () => {
      expect.assertions(1)
      const existingModelNumber = await ModelNumber.find("Some-Made-Up-Id")
      expect(existingModelNumber).toBeNull()
    })
  })

  describe("forProduct", () => {
    test("should return a modelNumber if one exists", async () => {
      expect.assertions(2)
      const matchingModels = await ModelNumber.forProduct(product.partitionKey)
      expect(matchingModels).not.toBeNull()
      expect(matchingModels.length).toEqual(1)
    })

    test("should return a modelNumber if one exists", async () => {
      expect.assertions(2)
      const newProduct = await Product.create({ name: "Chrome MC7 Pro NEW EXAMPLE", description: "The chrome..." })
      const matchingModels = await ModelNumber.forProduct(newProduct.partitionKey)
      expect(matchingModels).not.toBeNull()
      expect(matchingModels.length).toEqual(0)
    })

    test("should return null if a modelNumber does not exist", async () => {
      expect.assertions(2)
      const matchingModels = await ModelNumber.forProduct("DOES-NOT-EXIST!")
      expect(matchingModels).not.toBeNull()
      expect(matchingModels.length).toEqual(0)
    })
  })

  describe("destroy", () => {
    test("should delete a modelNumber and return true if one exists", async () => {
      expect.assertions(2)
      expect(await ModelNumber.destroy(modelNumber.partitionKey)).toBeTruthy()
      const existingModelNumber = await ModelNumber.find(modelNumber.partitionKey)
      expect(existingModelNumber).toBeNull()
    })

    test("should return false if a modelNumber does not exist", async () => {
      expect.assertions(1)
      expect(await ModelNumber.destroy("Some-Made-Up-Id")).toBeFalsy()
    })
  })
})
