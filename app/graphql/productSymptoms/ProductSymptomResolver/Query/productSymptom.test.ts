import { IProductSymptom, ProductSymptom } from "../../../../models"
import { productSymptom } from "./productSymptom"

const sampleParams = {
  careTip: "Improper cleaning can result in damage (see Cleaning Guide)",
  faultCode: "EHIJ",
  fee: false,
  name: "Light randomly turns off (stobes/blinks)",
  preApproved: true,
  solution:
    "Replace light housing module because it needs a new wire harness and/or circuit boards.",
  synopsis:
    "LED signal interrupted due to a break in the wire or the circuit board(s) are corroded or damaged.",
}

describe("Query", () => {
  let existingProductSymptom: IProductSymptom
  let existingProductSymptom2: IProductSymptom
  beforeAll(async done => {
    existingProductSymptom = await ProductSymptom.create({
      ...sampleParams,
      faultCode: "SYMPQUERYTST1",
    })
    existingProductSymptom2 = await ProductSymptom.create({
      ...sampleParams,
      faultCode: "SYMPQUERYTST1",
    })
    done()
  })

  afterAll(async done => {
    await ProductSymptom.destroy(existingProductSymptom.partitionKey)
    await ProductSymptom.destroy(existingProductSymptom2.partitionKey)
    done()
  })

  describe("productSymptom", () => {
    test("should return a productSymptom if it exists", async () => {
      expect.assertions(5)
      const output = await productSymptom(
        {},
        { id: existingProductSymptom.partitionKey }
      )
      expect(output.success).toEqual(true)
      expect(output.productSymptom).toBeDefined()
      expect(output.productSymptoms).toBeUndefined()
      expect(output.productSymptom.name).toEqual(existingProductSymptom.name)
      expect(output.productSymptom.faultCode).toEqual(
        existingProductSymptom.faultCode
      )
    })

    test("should return an error if it does not exist", async () => {
      expect.assertions(4)
      const output = await productSymptom({}, { id: "DOES-NOT-EXIST" })
      expect(output.success).toEqual(false)
      expect(output.productSymptom).toBeUndefined()
      expect(output.productSymptoms).toBeUndefined()
      expect(output.errors).toBeDefined()
    })
  })
})
