import { filterBlankAttributes, getClient } from "../util"

/**
 * Dynamo DB Model:
 * MODEL NUMBER
 * ==========================================================
 *
 * This model represents a configuration of a given product.
 * The configuration is the item directly associated to an
 * RGA or product registration. It is more specific than a
 * Product which actually represents a family of various
 * configurations.
 *
 * The table structure in dynamo DB is as follows:
 *
 * --------------------------------------------------------------
 * |                    | (GS1 Partition Key)   | (GS1 Sort Key)
 * --------------------------------------------------------------
 * | Partition Key      | Sort Key              | HSK
 * --------------------------------------------------------------
 * | UUID/ModelNumber   | "MODEL_NUMBER"        | ProductId
 * --------------------------------------------------------------
 *
 * This allows for the following access patterns:
 *
 * 1. Fetch model number by unique name / ID. (PK is a user assigned model number)
 * 2. Fetch all model numbers (SK matches 'MODEL_NUMBER')
 * 3. Look up all model numbers for a given product (HSK matches ProductId)
 */

const SECONDARY_KEY = "MODEL_NUMBER"

const client = getClient()

export interface IModelNumberInput {
  description: string
  id: string // not optional as it is managed by the user not a user generated UUID.
  productId: string
  lotted: boolean
  warrantyTerm: number
  warrantyDescription: string
  feeWithWarranty: number
  feeWithoutWarranty: number
  resolutionWithWarranty?: string | null | undefined
  resolutionWithoutWarranty?: string | null | undefined
  publicNotes?: string | null | undefined
  privateNotes?: string | null | undefined
}

export interface IModelNumber {
  description: string
  partitionKey: string // id
  sortKey: string
  symptoms: string[]
  indexSortKey: string // productId
  lotted: boolean
  warrantyTerm: number
  warrantyDescription: string
  feeWithWarranty: number
  feeWithoutWarranty: number
  resolutionWithWarranty?: string | null | undefined
  resolutionWithoutWarranty?: string | null | undefined
  publicNotes?: string | null | undefined
  privateNotes?: string | null | undefined
}

export interface IModelNumberOutput {
  description: string
  id: string // not optional as it is managed by the user not a user generated UUID.
  productId: string
  lotted: boolean
  warrantyTerm: number
  warrantyDescription: string
  feeWithWarranty: number
  feeWithoutWarranty: number
  resolutionWithWarranty?: string | null | undefined
  resolutionWithoutWarranty?: string | null | undefined
  publicNotes?: string | null | undefined
  privateNotes?: string | null | undefined
}

/**
 * Generates a new user model in the database provided the supplied credentials are valid.
 * @param credentials The identifying credentials to assign to the account.
 */
const create = async ({
  id,
  productId,
  ...modelNumberInput
}: IModelNumberInput): Promise<IModelNumber> => {
  const item: IModelNumber = {
    ...modelNumberInput,
    indexSortKey: productId,
    partitionKey: id,
    sortKey: SECONDARY_KEY,
    symptoms: [],
  }

  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: "attribute_not_exists(partitionKey)",
          Item: {
            ...filterBlankAttributes(item),
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
 * Updates an existing model number record in the database provided the supplied
 * input is valid.
 * @param input The identifying credentials to assign to the account.
 */
const update = async ({
  id,
  productId,
  ...modelNumberInput
}: IModelNumberInput): Promise<IModelNumber> => {
  const existingModelNumber = await find(id)
  const item: IModelNumber = {
    ...existingModelNumber,
    ...modelNumberInput,
    indexSortKey: productId,
    partitionKey: id,
    sortKey: SECONDARY_KEY,
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: "attribute_exists(partitionKey)",
          Item: {
            ...filterBlankAttributes(item),
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
 * Retreives a model number configuration by its ID.
 * @param id The ID of the model number to find.
 */
const find = async (id: string): Promise<IModelNumber | null> => {
  const searchParams = {
    Key: {
      partitionKey: id,
      sortKey: SECONDARY_KEY,
    },
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.get(searchParams).promise()
  return result.Item ? (result.Item as IModelNumber) : null
}

/**
 * Retreives a list of all model number configurations.
 */
const all = async (): Promise<IModelNumber[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "sortKey = :rkey",
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IModelNumber[]) : []
}

/**
 * Retreive a symptom by serial / uuid.
 * @param ids An array of specific uuids of symptoms to find.
 */
const findAll = async (ids: string[]): Promise<IModelNumber[]> => {
  const searchParams = {
    RequestItems: {
      [process.env.DYNAMODB_ACCOUNTS_TABLE]: {
        Keys: [
          ...ids.map(modelNumberId => ({
            partitionKey: modelNumberId,
            sortKey: SECONDARY_KEY,
          })),
        ],
      },
    },
  }
  const result = await client.batchGet(searchParams).promise()
  return (
    (result.Responses[process.env.DYNAMODB_ACCOUNTS_TABLE] as IModelNumber[]) ||
    []
  )
}

/**
 * Retreives a list of all model number configurations for a specified product ID.
 */
const forProduct = async (productId: string): Promise<IModelNumber[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":productId": productId,
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "sortKey = :rkey AND indexSortKey = :productId",
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IModelNumber[]) : []
}

/**
 * Deletes a model from the database via UUID.
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
 * Converts a model number record to public output that can be consumed
 * by the API.
 */
const output = ({
  partitionKey,
  sortKey,
  indexSortKey,
  ...modelNumber
}: IModelNumber): IModelNumberOutput => {
  const result = {
    ...modelNumber,
    id: partitionKey,
    lotted: modelNumber.lotted || false,
    privateNotes: modelNumber.privateNotes || "",
    productId: indexSortKey,
    publicNotes: modelNumber.publicNotes || "",
    resolutionWithWarranty: modelNumber.resolutionWithWarranty || "",
    resolutionWithoutWarranty: modelNumber.resolutionWithoutWarranty || "",
  }
  return result
}

export const ModelNumber = {
  SECONDARY_KEY,
  all,
  create,
  destroy,
  find,
  findAll,
  forProduct,
  output,
  update,
}
