import { ProductRegistration } from "../../../../models"
import { generateSampleParams } from "../testHelpers"
import { productRegistrations } from "./productRegistrations"

describe("Query", () => {
  describe("productRegistrations", () => {
    test("should return all existing productRegistrations", async () => {
      expect.assertions(4)

      const existingProductRegistrations = await ProductRegistration.all()
      await Promise.all(
        existingProductRegistrations.map(
          async p => await ProductRegistration.destroy(p.partitionKey)
        )
      )

      const example1 = await generateSampleParams({
        key: "QRYEX1",
        lotted: false,
        serial: null,
      })
      const example2 = await generateSampleParams({
        key: "QRYEX2",
        lotted: false,
        serial: null,
      })
      await ProductRegistration.create({ ...example1.sampleParams })
      await ProductRegistration.create({ ...example2.sampleParams })

      const output = await productRegistrations()
      expect(output.success).toEqual(true)
      expect(output.productRegistration).toBeUndefined()
      expect(output.productRegistrations).toBeDefined()
      expect(output.productRegistrations.length > 1).toEqual(true)
    })
  })
})
