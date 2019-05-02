import { v4 as uuid } from "uuid"
import { getClient } from "../util"

/**
 * Dynamo DB Model:
 * PRODUCT SYMPTOM
 * ==========================================================
 * 
 * This model represents a product troubleshooting symptom applicable
 * to a product or set of products.
 * 
 * The table structure in dynamo DB is as follows:
 * 
 * ----------------------------------------------------------------------
 * |                    | (GS1 Partition Key) | (GS1 Sort Key)
 * ----------------------------------------------------------------------
 * | Partition Key      | Sort Key            | HSK
 * ----------------------------------------------------------------------
 * | UUID               | "PRODUCT_SYMPTOM"   | faultCode
 * ----------------------------------------------------------------------
 * 
 * This allows for the following access patterns:
 * 
 * 1. Fetch a symptom via serial number (PK matches UUID Number)
 * 2. Fetch all product symptoms (Sort Key matches 'PRODUCT_SYMPTOM')
 * 3. Fetch all product symptoms for a given product (HSK matchs faultCode)
 */

const client = getClient()

const SECONDARY_KEY = "PRODUCT_SYMPTOM"

export interface IProductSymptomInput {
  careTip?: string
  faultCode: string
  fee: number
  id?: string
  name: string
  synopsis: string
  solution: string
}

export interface IProductSymptom {
  careTip?: string
  faultCode: string
  fee: number
  name: string
  synopsis: string
  solution: string
  partitionKey: string
  sortKey: string
}

export interface IProductSymptomOutput {
  careTip?: string
  faultCode: string
  fee: number
  id: string
  name: string
  synopsis: string
  solution: string
}

/**
 * Generates a new symptom model in the database provided the supplied credentials are valid.
 * @param symptomInput The identifying symptomInput to assign to the account.
 */
const create = async ({
  id, ...symptomInput
}: IProductSymptomInput): Promise<IProductSymptom> => {
  const item: IProductSymptom = {
    ...symptomInput,
    partitionKey: uuid(),
    sortKey: SECONDARY_KEY,
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: "attribute_not_exists(partitionKey)",
          Item: {
            ...item,
            indexSortKey: symptomInput.faultCode,
          },
          TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
        },
      },
    ],
  }
  await client.transactWrite(params).promise()
  return item
}

/**
 * Generates a new symptom model in the database provided the supplied credentials are valid.
 * @param symptomInput An object representing the symptomInput to replace the supplied object.
 */
const update = async ({ id, ...symptomInput }: IProductSymptomInput): Promise<IProductSymptom> => {
  const existingItem = await find(id)
  const item: IProductSymptom = {
    ...existingItem,
    ...symptomInput
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: "attribute_exists(partitionKey)",
          Item: {
            ...item,
            indexSortKey: symptomInput.faultCode,
          },
          TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
        },
      },
    ],
  }
  await client.transactWrite(params).promise()
  return item
}

/**
 * Retreive a symptom by serial / uuid.
 * @param uuid The uuid of the product to find.
 */
const find = async (id: string): Promise<IProductSymptom | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":pk": id,
      ":rkey": SECONDARY_KEY,
    },
    KeyConditionExpression: "partitionKey = :pk and sortKey = :rkey",
    Limit: 1,
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items[0] ? (result.Items[0] as IProductSymptom) : null
}

/**
 * Retreive a symptom by faultCode.
 * @param faultCode The faultCode of the product to find.
 */
const findByFaultCode = async (faultCode: string): Promise<IProductSymptom | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":indexSortKey": faultCode,
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "sortKey = :rkey and indexSortKey = :indexSortKey",
    Limit: 1,
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items[0] ? (result.Items[0] as IProductSymptom) : null
}

/**
 * Retreives a list of all product symptoms.
 */
const all = async (): Promise<IProductSymptom[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "sortKey = :rkey",
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IProductSymptom[]) : []
}

/**
 * Deletes a symptom and associated child objects from the 
 * database via UUID.
 * @param id The UUID of the product to delete.
 */
const destroy = async (id: string): Promise<boolean> => {
  const symptom = await find(id)
  try {
    if (!(symptom)) {
      return false
    }
    const params = {
      TransactItems: [
        {
          Delete: {
            Key: { partitionKey: id, sortKey: symptom.sortKey },
            TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
          },
        },
      ],
    }
    await client.transactWrite(params).promise()
    return true
  } catch {
    return false
  }
}

/**
 * Converts a productSymptom record to public output that can be consumed
 * by the API.
 */
const output = ({
  partitionKey,
  sortKey,
  ...productSymptom
}: IProductSymptom): IProductSymptomOutput => {
  const result = {
    ...productSymptom,
    id: partitionKey,
  }
  return result
}

export const ProductSymptom = {
  SECONDARY_KEY,
  all,
  create,
  destroy,
  find,
  findByFaultCode,
  output,
  update
}
