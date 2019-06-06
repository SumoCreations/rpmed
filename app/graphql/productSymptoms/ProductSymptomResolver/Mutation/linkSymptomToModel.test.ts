import { IModelNumber, IProduct, IProductSymptom, ModelNumber, Product, ProductSymptom, } from "../../../../models"
import { ErrorModelNumberIDDoesNotExist, ErrorProductSymptomWithIDDoesNotExist } from "../productSymptomErrors"
import { linkSymptomToModel } from "./linkSymptomToModel"

describe("linkSymptomToModel", () => {

  let productSymptom: IProductSymptom
  let modelNumber: IModelNumber
  let product: IProduct

  beforeAll(async (done) => {
    productSymptom = await ProductSymptom.create({
      careTip: "Improper cleaning can result in damage (see Cleaning Guide)",
      faultCode: "EHIJ-SYMPTOM-MUTATION-TEST",
      fee: false,
      name: "Light randomly turns off (stobes/blinks)",
      preApproved: false,
      solution: "Replace light housing module because it needs a new wire harness and/or circuit boards.",
      synopsis: "LED signal interrupted due to a break in the wire or the circuit board(s) are corroded or damaged.",
    })
    product = await Product.create({ name: "Chrome MC7 Pro", description: "The chrome MedLED Pro Headlamp" })
    modelNumber = await ModelNumber.create({
      description: "MedLED Chrome MC7 PRO Hard Top; Standard Kit",
      feeWithWarranty: 0,
      feeWithoutWarranty: 250,
      id: "MC7-HT-SK-APPLY-SYMPTOM-MUTATION-TEST",
      lotted: true,
      productId: product.partitionKey,
      resolutionWithWarranty: "Do something...",
      resolutionWithoutWarranty: "Do something else..",
      warrantyDescription: "All headlamps covered for 1 year",
      warrantyTerm: 12
    })
    done()
  })

  test("should fail if the arguments are invalid", async () => {
    expect.assertions(7)
    expect(modelNumber.symptoms).not.toContain(productSymptom.partitionKey)
    expect(productSymptom.modelNumbers).not.toContain(modelNumber.partitionKey)
    const output = await linkSymptomToModel({}, { modelNumber: "", symptomId: "", linked: true })
    expect(output.success).toBe(false)
    expect(output.errors.map(e => e.path)).toContain("modelNumber")
    expect(output.errors.map(e => e.path)).toContain("symptomId")
    expect(modelNumber.symptoms).not.toContain(productSymptom.partitionKey)
    expect(productSymptom.modelNumbers).not.toContain(modelNumber.partitionKey)
  })

  test("should fail if the modelNumber does not exist", async () => {
    expect.assertions(2)
    const output = await linkSymptomToModel({}, { modelNumber: "does-not-exist", symptomId: productSymptom.partitionKey, linked: true })
    expect(output.success).toBe(false)
    expect(output.errors).toContain(ErrorModelNumberIDDoesNotExist)
  })

  test("should fail if the symptom does not exist", async () => {
    expect.assertions(2)
    const output = await linkSymptomToModel({}, { modelNumber: modelNumber.partitionKey, symptomId: "does-not-exist", linked: true })
    expect(output.success).toBe(false)
    expect(output.errors).toContain(ErrorProductSymptomWithIDDoesNotExist)
  })

  describe("creating a link", () => {
    it("should add the model number to the symptom's model list", async () => {
      expect.assertions(5)
      expect((await ModelNumber.find(modelNumber.partitionKey)).symptoms).not.toContain(productSymptom.partitionKey)
      expect((await ProductSymptom.find(productSymptom.partitionKey)).modelNumbers).not.toContain(modelNumber.partitionKey)
      const output = await linkSymptomToModel({}, { modelNumber: modelNumber.partitionKey, symptomId: productSymptom.partitionKey, linked: true })
      expect(output.success).toBe(true)
      expect((await ModelNumber.find(modelNumber.partitionKey)).symptoms).toContain(productSymptom.partitionKey)
      expect((await ProductSymptom.find(productSymptom.partitionKey)).modelNumbers).toContain(modelNumber.partitionKey)
    })
  })

  describe("removing a link", () => {
    it("should remove the model number from the symptom's model list", async () => {
      expect.assertions(5)
      expect((await ModelNumber.find(modelNumber.partitionKey)).symptoms).toContain(productSymptom.partitionKey)
      expect((await ProductSymptom.find(productSymptom.partitionKey)).modelNumbers).toContain(modelNumber.partitionKey)
      const output = await linkSymptomToModel({}, { modelNumber: modelNumber.partitionKey, symptomId: productSymptom.partitionKey, linked: false })
      expect(output.success).toBe(true)
      expect((await ModelNumber.find(modelNumber.partitionKey)).symptoms).not.toContain(productSymptom.partitionKey)
      expect((await ProductSymptom.find(productSymptom.partitionKey)).modelNumbers).not.toContain(modelNumber.partitionKey)
    })
  })
})
