import { v4 as uuid } from "uuid"
import { getClient } from "../util"
import { IModelNumberOutput, ModelNumber } from "./modelNumber"

const client = getClient()

const SECONDARY_KEY = "PRODUCT"

export interface IProductInput {
  name: string
  description: string
  id?: string
}

export interface IProduct {
  name: string
  description: string
  partitionKey: string
  sortKey: string
}

export interface IProductOutput {
  name: string
  description: string
  modelNumbers: () => Promise<IModelNumberOutput[]>
  id: string
}

/**
 * Generates a new user model in the database provided the supplied credentials are valid.
 * @param credentials The identifying credentials to assign to the account.
 */
const create = async ({
  id,
  ...productInput
}: IProductInput): Promise<IProduct> => {
  const item: IProduct = {
    ...productInput,
    partitionKey: uuid(),
    sortKey: SECONDARY_KEY,
  }
  const hsk = [productInput.name, productInput.description].join("#")
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: "attribute_not_exists(modelNumber)",
          Item: {
            ...item,
            indexSortKey: hsk,
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
 * Retreives a user by their unique ID.
 * @param id The UUID of the user to find.
 */
const find = async (id: string): Promise<IProduct | null> => {
  const searchParams = {
    Key: {
      partitionKey: id,
      sortKey: SECONDARY_KEY,
    },
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.get(searchParams).promise()
  return result.Item ? (result.Item as IProduct) : null
}

/**
 * Retreives a list of all products.
 */
const all = async (): Promise<IProduct[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "sortKey = :rkey",
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IProduct[]) : []
}

/**
 * Deletes a user from the database via UUID.
 * @param id The UUID of the user to delete.
 */
const destroy = async (id: string): Promise<boolean> => {
  try {
    if (!(await find(id))) {
      return false
    }
    const params = {
      TransactItems: [
        {
          Delete: {
            Key: { partitionKey: id, sortKey: SECONDARY_KEY },
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
 * Converts a user record to public output that can be consumed
 * by the API.
 */
const output = ({
  partitionKey,
  sortKey,
  ...product
}: IProduct): IProductOutput => {
  const result = {
    ...product,
    id: partitionKey,
    modelNumbers: async () =>
      (await ModelNumber.forProduct(partitionKey)).map(ModelNumber.output),
  }
  return result
}

export const Product = {
  SECONDARY_KEY,
  all,
  create,
  destroy,
  find,
  output,
}
