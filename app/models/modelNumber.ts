import { getClient } from "../util"

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
  resolutionWithWarranty: string | null | undefined
  resolutionWithoutWarranty: string | null | undefined
  publicNotes: string | null | undefined
  privateNotes: string | null | undefined
}

export interface IModelNumber {
  description: string
  partitionKey: string // id
  sortKey: string
  indexSortKey: string // productId
  lotted: boolean
  warrantyTerm: number
  warrantyDescription: string
  feeWithWarranty: number
  feeWithoutWarranty: number
  resolutionWithWarranty: string | null | undefined
  resolutionWithoutWarranty: string | null | undefined
  publicNotes: string | null | undefined
  privateNotes: string | null | undefined
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
  resolutionWithWarranty: string | null | undefined
  resolutionWithoutWarranty: string | null | undefined
  publicNotes: string | null | undefined
  privateNotes: string | null | undefined
}

/**
 * Generates a new user model in the database provided the supplied credentials are valid.
 * @param credentials The identifying credentials to assign to the account.
 */
const create = async ({
  id,
  productId,
  ...productInput
}: IModelNumberInput): Promise<IModelNumber> => {
  const item: IModelNumber = {
    ...productInput,
    indexSortKey: productId,
    partitionKey: id,
    sortKey: SECONDARY_KEY,
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: "attribute_not_exists(partitionKey)",
          Item: {
            ...item,
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
  // tslint:disable-next-line
  console.log(searchParams)
  const result = await client.query(searchParams).promise()
  // tslint:disable-next-line
  console.log(result)
  return result.Items ? (result.Items as IModelNumber[]) : []
}

/**
 * Retreives a list of all model number configurations for a specified product ID.
 */
const forProduct = async (productId: string): Promise<IModelNumber[]> => {
  // tslint:disable-next-line
  console.log("Fetching model numbers for product...")
  const searchParams = {
    ExpressionAttributeValues: {
      ":productId": productId,
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "sortKey = :rkey AND indexSortKey = :productId",
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  // tslint:disable-next-line
  console.log(searchParams)
  const result = await client.query(searchParams).promise()
  // tslint:disable-next-line
  console.log(result)
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
  ...product
}: IModelNumber): IModelNumberOutput => {
  const result = {
    ...product,
    id: partitionKey,
    productId: indexSortKey,
  }
  // tslint:disable
  console.log("Mapping product to output...")
  console.log(result)
  // tslint:enable
  return result
}

export const ModelNumber = {
  SECONDARY_KEY,
  all,
  create,
  destroy,
  find,
  forProduct,
  output,
}
