import { IModelNumber, ModelNumber, ProductType } from './modelNumber'
import { IProduct, Product } from './product'
import { IProductSymptom, ProductSymptom } from './productSymptom'
import {
  addSymptomToModelNumber,
  modelNumbersForSymptom,
  productSymptomsForModel,
  removeSymptomFromModelNumber,
} from './productSymptomToModelAssociation'

describe('modelNumber', () => {
  describe('applySymptomToModelTransactions', () => {
    let productSymptom: IProductSymptom
    let modelNumber: IModelNumber
    let product: IProduct

    beforeAll(async done => {
      productSymptom = await ProductSymptom.create({
        careTip: 'Improper cleaning can result in damage (see Cleaning Guide)',
        faultCode: 'EHIJ-SYMPTOM-TEST',
        fee: true,
        name: 'Light randomly turns off (stobes/blinks)',
        preApproved: true,
        solution:
          'Replace light housing module because it needs a new wire harness and/or circuit boards.',
        synopsis:
          'LED signal interrupted due to a break in the wire or the circuit board(s) are corroded or damaged.',
      })
      product = await Product.create({
        description: 'The chrome MedLED Pro Headlamp',
        name: 'Chrome MC7 Pro',
      })
      modelNumber = await ModelNumber.create({
        description: 'MedLED Chrome MC7 PRO Hard Top; Standard Kit',
        feeWithWarranty: { endUser: "0", distributor: "0" },
        feeWithoutWarranty: { endUser: "0", distributor: "0" },
        id: 'MC7-HT-SK-APPLY-SYMPTOM-TEST',
        lotted: true,
        pricing: { cost: "0", retail: "0" },
        productIds: [product.partitionKey],
        productType: ProductType.HEADLIGHT,
        resolutionWithWarranty: 'Do something...',
        resolutionWithoutWarranty: 'Do something else..',
        warrantyDescription: 'All headlamps covered for 1 year',
        warrantyTerm: 12,
      })
      done()
    })

    it("should add the model number to the symptom's model list", async () => {
      expect.assertions(4)
      expect(modelNumber.symptoms).not.toContain(productSymptom.partitionKey)
      expect(productSymptom.modelNumbers).not.toContain(
        modelNumber.partitionKey
      )
      await addSymptomToModelNumber(
        productSymptom.partitionKey,
        modelNumber.partitionKey
      )
      expect(
        (await ModelNumber.find(modelNumber.partitionKey)).symptoms
      ).toContain(productSymptom.partitionKey)
      expect(
        (await ProductSymptom.find(productSymptom.partitionKey)).modelNumbers
      ).toContain(modelNumber.partitionKey)
    })

    it('should return all associated model numbers for a symptom', async () => {
      expect.assertions(1)
      const models = await modelNumbersForSymptom(productSymptom.partitionKey)
      expect(models.map(m => m.partitionKey)).toContain(
        modelNumber.partitionKey
      )
    })

    it('should return all associated symptoms for a model number', async () => {
      expect.assertions(1)
      const symptoms = await productSymptomsForModel(modelNumber.partitionKey)
      expect(symptoms.map(s => s.partitionKey)).toContain(
        productSymptom.partitionKey
      )
    })

    it("should remove the model number from the symptom's model list", async () => {
      expect.assertions(4)
      expect(
        (await ModelNumber.find(modelNumber.partitionKey)).symptoms
      ).toContain(productSymptom.partitionKey)
      expect(
        (await ProductSymptom.find(productSymptom.partitionKey)).modelNumbers
      ).toContain(modelNumber.partitionKey)
      await removeSymptomFromModelNumber(
        productSymptom.partitionKey,
        modelNumber.partitionKey
      )
      expect(
        (await ModelNumber.find(modelNumber.partitionKey)).symptoms
      ).not.toContain(productSymptom.partitionKey)
      expect(
        (await ProductSymptom.find(productSymptom.partitionKey)).modelNumbers
      ).not.toContain(modelNumber.partitionKey)
    })
  })
})
