import { v4 as uuid } from 'uuid'
import { filterBlankAttributes, getDynamoClient } from '../util'
import { IModelNumberOutput, ModelNumber } from './modelNumber'

/**
 * Dynamo DB Model:
 * PRODUCT
 * ==========================================================
 *
 * This model represents a product of RiverPoint medical. Products
 * are key to nearly all of the interactions in the system whether
 * it be for managing a troubleshooting request, an item in a specific
 * RGA, or a registered product / warranty tracking for an individual
 * user. A product is more or less a high level object representing
 * a family of configurations. The configuration is refferred to as
 * the ModelNumber. Review that model for more detailed associations
 * to other entities in the system.
 *
 * The table structure in dynamo DB is as follows:
 *
 * ----------------------------------------------------------------------------
 * |                    | (GS1 Partition Key)   | (GS1 SK)      | (GS2 SK)
 * ----------------------------------------------------------------------------
 * | Partition Key      | Sort Key              | HSK           | SHSK
 * ----------------------------------------------------------------------------
 * | UUID               | CONST                 | ProductName   |
 * ----------------------------------------------------------------------------
 *
 * This allows for the following access patterns:
 *
 * 1. Fetch product by unique id. (PK is generated uuid)
 * 2. Fetch all products (SK matches 'CONST')
 * 3. Look up a product via name (HSK matches Product)
 * 4. Find all products beginning with string (HSK begins with search string)
 */

const client = getDynamoClient()

const SECONDARY_KEY = 'PRODUCT'

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
 * Generates a new product model in the database provided the supplied credentials are valid.
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
  const hsk = productInput.name
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: 'attribute_not_exists(partitionKey)',
          Item: {
            ...filterBlankAttributes(item),
            indexSortKey: hsk,
          },
          TableName: process.env.DYNAMODB_RESOURCES_TABLE,
        },
      },
    ],
  }
  await client.transactWrite(params).promise()
  return item
}

/**
 * Generates a new product model in the database provided the supplied credentials are valid.
 * @param input An object representing the input to replace the supplied object.
 */
const update = async ({
  id,
  ...productInput
}: IProductInput): Promise<IProduct> => {
  const existingItem = await find(id)
  const item: IProduct = {
    ...existingItem,
    ...productInput,
  }
  const hsk = productInput.name
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: 'attribute_exists(partitionKey)',
          Item: {
            ...filterBlankAttributes(item),
            indexSortKey: hsk,
          },
          TableName: process.env.DYNAMODB_RESOURCES_TABLE,
        },
      },
    ],
  }
  await client.transactWrite(params).promise()
  return item
}

/**
 * Retreives a product by unique ID.
 * @param id The UUID of the product to find.
 */
const find = async (id: string): Promise<IProduct | null> => {
  const searchParams = {
    Key: {
      partitionKey: id,
      sortKey: SECONDARY_KEY,
    },
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.get(searchParams).promise()
  return result.Item ? (result.Item as IProduct) : null
}

/**
 * Retreives a product by it's name.
 * @param name The name of the product to find.
 */
const findByName = async (name: string): Promise<IProduct | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':hsk': name,
      ':rkey': SECONDARY_KEY,
    },
    IndexName: 'GSI_1',
    KeyConditionExpression: 'sortKey = :rkey AND indexSortKey = :hsk',
    Limit: 1,
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items[0] as IProduct) : null
}

/**
 * Retreives a list of all products.
 */
const all = async (): Promise<IProduct[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':rkey': SECONDARY_KEY,
    },
    IndexName: 'GSI_1',
    KeyConditionExpression: 'sortKey = :rkey',
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IProduct[]) : []
}

const findByIds = async (ids: string[]): Promise<IProduct[]> => {
  const searchParams = {
    RequestItems: {
      [process.env.DYNAMODB_RESOURCES_TABLE]: {
        Keys: [
          ...ids.map(productId => ({
            partitionKey: productId,
            sortKey: SECONDARY_KEY,
          })),
        ],
      },
    },
  }
  const result = await client.batchGet(searchParams).promise()
  return (
    (result.Responses[process.env.DYNAMODB_RESOURCES_TABLE] as IProduct[]) || []
  )
}

/**
 * Deletes a product and associated child objects from the
 * database via UUID.
 * @param id The UUID of the product to delete.
 */
const destroy = async (id: string): Promise<boolean> => {
  try {
    if (!(await find(id))) {
      return false
    }
    const relatedModelNumbers = await ModelNumber.forProduct(id)
    const params = {
      TransactItems: [
        ...relatedModelNumbers.map(({ partitionKey, sortKey }) => ({
          Delete: {
            Key: { partitionKey, sortKey },
            TableName: process.env.DYNAMODB_RESOURCES_TABLE,
          },
        })),
        {
          Delete: {
            Key: { partitionKey: id, sortKey: SECONDARY_KEY },
            TableName: process.env.DYNAMODB_RESOURCES_TABLE,
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
 * Converts a product record to public output that can be consumed
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
  findByIds,
  findByName,
  output,
  update,
}
