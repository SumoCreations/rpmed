import { IProductSymptom, ModelNumber, modelNumbersForSymptom, ProductSymptom, productSymptomsForModel } from "../../../../models";

export const extendSymptomOutput = (symptom: IProductSymptom) => ({
  ...ProductSymptom.output(symptom),
  modelNumbers: async () => (await modelNumbersForSymptom(symptom.partitionKey)).map(ModelNumber.output).map(m => ({
    ...m,
    symptoms: async () => (await productSymptomsForModel(m.id)).map(ProductSymptom.output)
  }))
})