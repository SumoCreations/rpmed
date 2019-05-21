import { ProductSymptom } from "../../../../models"
import { productSymptoms } from "./productSymptoms"

const sampleParams = {
  careTip: "Improper cleaning can result in damage (see Cleaning Guide)",
  faultCode: "EHIJ-QUERY-TESTER",
  fee: 0,
  name: "Light randomly turns off (stobes/blinks)",
  solution: "Replace light housing module because it needs a new wire harness and/or circuit boards.",
  synopsis: "LED signal interrupted due to a break in the wire or the circuit board(s) are corroded or damaged.",
}


describe("Query", () => {
  describe("productSymptoms", () => {
    test("should return all existing productSymptoms", async () => {
      expect.assertions(4)
      const existingProductSymptoms = await ProductSymptom.all()
      await Promise.all(existingProductSymptoms.map(async (p) => await ProductSymptom.destroy(p.partitionKey)))
      await ProductSymptom.create({
        ...sampleParams,
        faultCode: "MULTISYMPTST1"
      })
      await ProductSymptom.create({
        ...sampleParams,
        faultCode: "MULTISYMPTST2"
      })
      const output = await productSymptoms({}, {})
      expect(output.success).toEqual(true)
      expect(output.productSymptom).toBeUndefined()
      expect(output.productSymptoms).toBeDefined()
      expect(output.productSymptoms.length > 1).toEqual(true)
    })
  })

})
