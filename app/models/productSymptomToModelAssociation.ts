import { getClient } from "../util"
import { IModelNumber, ModelNumber } from "./modelNumber"
import { IProductSymptom, ProductSymptom } from "./productSymptom"

const client = getClient()

/**
 * Adds a symptom / model number to their respective embedded
 * association lists.
 */
export const addSymptomToModelNumber = async (
  symptomId: string,
  modelNumberString: string
) => {
  const modelNumber = await ModelNumber.find(modelNumberString)
  const symptom = await ProductSymptom.find(symptomId)
  const modelNumbers = [
    ...new Set([...(symptom.modelNumbers || []), modelNumber.partitionKey]),
  ]
  const symptoms = [
    ...new Set([...(modelNumber.symptoms || []), symptom.partitionKey]),
  ]
  const params = {
    TransactItems: [
      {
        Update: {
          ExpressionAttributeNames: { "#modelNumbers": "modelNumbers" },
          ExpressionAttributeValues: {
            ":modelNumbers": modelNumbers,
          },
          Key: { partitionKey: symptomId, sortKey: symptom.sortKey },
          TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
          UpdateExpression: "set #modelNumbers = :modelNumbers",
        },
      },
      {
        Update: {
          ExpressionAttributeNames: { "#symptoms": "symptoms" },
          ExpressionAttributeValues: {
            ":symptoms": symptoms,
          },
          Key: {
            partitionKey: modelNumberString,
            sortKey: modelNumber.sortKey,
          },
          TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
          UpdateExpression: "set #symptoms = :symptoms",
        },
      },
    ],
  }
  await client.transactWrite(params).promise()
}

/**
 * Removes a symptom / model number from their respective embedded
 * association lists.
 */
export const removeSymptomFromModelNumber = async (
  symptomId: string,
  modelNumberString: string
) => {
  const modelNumber = await ModelNumber.find(modelNumberString)
  const symptom = await ProductSymptom.find(symptomId)
  const modelNumbers = [...new Set([...(symptom.modelNumbers || [])])].filter(
    i => i !== modelNumber.partitionKey
  )
  const symptoms = [...new Set([...(modelNumber.symptoms || [])])].filter(
    i => i !== symptom.partitionKey
  )
  const params = {
    TransactItems: [
      {
        Update: {
          ExpressionAttributeNames: { "#modelNumbers": "modelNumbers" },
          ExpressionAttributeValues: {
            ":modelNumbers": modelNumbers,
          },
          Key: { partitionKey: symptomId, sortKey: symptom.sortKey },
          TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
          UpdateExpression: "set #modelNumbers = :modelNumbers",
        },
      },
      {
        Update: {
          ExpressionAttributeNames: { "#symptoms": "symptoms" },
          ExpressionAttributeValues: {
            ":symptoms": symptoms,
          },
          Key: {
            partitionKey: modelNumberString,
            sortKey: modelNumber.sortKey,
          },
          TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
          UpdateExpression: "set #symptoms = :symptoms",
        },
      },
    ],
  }
  await client.transactWrite(params).promise()
}

/**
 * Returns a list of product symptoms for a specific model.
 */
export const productSymptomsForModel = async (modelNumberString: string) => {
  const modelNumber = await ModelNumber.find(modelNumberString)
  const symptoms = [...new Set([...(modelNumber.symptoms || [])])]
  if (symptoms.length < 1) {
    return [] as IProductSymptom[]
  }
  return await ProductSymptom.findAll(symptoms)
}

/**
 * Returns a list of model numbers for a specific symptom.
 */
export const modelNumbersForSymptom = async (productSymptomId: string) => {
  const symptom = await ProductSymptom.find(productSymptomId)
  const modelNumbers = [...new Set([...(symptom.modelNumbers || [])])]
  if (modelNumbers.length < 1) {
    return [] as IModelNumber[]
  }
  return await ModelNumber.findAll(modelNumbers)
}
