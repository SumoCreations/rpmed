import { IModelNumber, IProductSymptom, ModelNumber, modelNumbersForSymptom, ProductSymptom, productSymptomsForModel } from "../../../../models";

export const extendModelOutput = (modelNumber: IModelNumber) => ({
  ...ModelNumber.output(modelNumber),
  symptoms: async () => (await productSymptomsForModel(modelNumber.partitionKey)).map(ProductSymptom.output)
})

export const extendSymptomOutput = (symptom: IProductSymptom) => ({
  ...ProductSymptom.output(symptom),
  modelNumbers: async () => (await modelNumbersForSymptom(symptom.partitionKey)).map(extendModelOutput)
})