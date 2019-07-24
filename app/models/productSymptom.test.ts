import { isEmpty } from "validator"
import { IProductSymptom, ProductSymptom } from "./productSymptom"

const existingSymptomParams = {
  careTip: "Improper cleaning can result in damage (see Cleaning Guide)",
  faultCode: "EHIJ-EXAMPLE-TEST-3",
  fee: false,
  name: "Light randomly turns off (stobes/blinks)",
  preApproved: false,
  solution: "Replace light housing module because it needs a new wire harness and/or circuit boards.",
  synopsis: "LED signal interrupted due to a break in the wire or the circuit board(s) are corroded or damaged.",
}

describe("productSymptom", () => {
  let productSymptom: IProductSymptom
  beforeAll(async (done) => {
    productSymptom = await ProductSymptom.create({ ...existingSymptomParams })
    done()
  })

  afterAll(async (done) => {
    await ProductSymptom.destroy(productSymptom.partitionKey)
    done()
  })

  describe("create", () => {
    test("should generate a new productSymptom", () => {
      expect(isEmpty(productSymptom.partitionKey)).toBe(false)
      expect(productSymptom.sortKey).toBe(ProductSymptom.SECONDARY_KEY)
    })
  })

  describe("find", () => {
    test("should return a productSymptom if one exists", async () => {
      expect.assertions(1)
      const existingSymptom = await ProductSymptom.find(productSymptom.partitionKey)
      expect(existingSymptom).not.toBeNull()
    })

    test("should return null if a productSymptom does not exist", async () => {
      expect.assertions(1)
      const existingSymptom = await ProductSymptom.find("Some-Made-Up-Id")
      expect(existingSymptom).toBeNull()
    })
  })

  describe("findAll", () => {
    test("should return all productSymptoms for the supplied IDs", async () => {
      expect.assertions(3)
      const anotherProductSymptom = await ProductSymptom.create({ ...existingSymptomParams, faultCode: "ANOTHER-EHIJ-TEST" })
      const symptoms = await ProductSymptom.findAll([productSymptom.partitionKey, anotherProductSymptom.partitionKey])
      expect(symptoms).not.toBeNull()
      expect(symptoms.map(s => s.partitionKey)).toContain(productSymptom.partitionKey)
      expect(symptoms.map(s => s.partitionKey)).toContain(anotherProductSymptom.partitionKey)
    })
  })

  describe("destroy", () => {
    test("should delete a productSymptom and return true if one exists", async () => {
      expect.assertions(2)
      expect(await ProductSymptom.destroy(productSymptom.partitionKey)).toBeTruthy()
      const existingSymptom = await ProductSymptom.find(productSymptom.partitionKey)
      expect(existingSymptom).toBeNull()
    })

    test("should return false if a productSymptom does not exist", async () => {
      expect.assertions(1)
      expect(await ProductSymptom.destroy("Some-Made-Up-Id")).toBeFalsy()
    })
  })
})
