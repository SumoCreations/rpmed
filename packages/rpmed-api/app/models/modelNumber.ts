import { ProductType } from '../schema'
import { getDynamoClient } from 'api-utils'
import { filterBlankAttributes } from 'utils'

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
 * ---------------------------------------------------------------------------
 * |                    | (GS1 Partition Key)   | (GS1 SK)      | (GS2 SK)
 * ---------------------------------------------------------------------------
 * | Partition Key      | Sort Key              | HSK           | SHSK
 * ---------------------------------------------------------------------------
 * | UUID/ModelNumber   | "MODEL_NUMBER"        | ModelNumber   | ProductType
 * ---------------------------------------------------------------------------
 *
 * This allows for the following access patterns:
 *
 * 1. Fetch model number by unique name / ID. (PK is a user assigned model number)
 * 2. Fetch all model numbers (SK matches 'MODEL_NUMBER')
 * 3. Look up all model numbers for a given product (HSK matches ProductId)
 */

const SECONDARY_KEY = 'MODEL_NUMBER'

const client = getDynamoClient()

interface IFeeStructure {
  distributor: string
  endUser: string
}

interface IPricing {
  cost: string
  retail: string
}

export interface IModelNumberInput {
  description: string
  id: string // not optional as it is managed by the user not a user generated UUID.
  pricing: IPricing
  productIds: string[]
  productType: ProductType
  lotted: boolean
  warrantyTerm: number
  warrantyDescription: string
  feeWithWarranty: IFeeStructure
  feeWithoutWarranty: IFeeStructure
  resolutionWithWarranty?: string | null | undefined
  resolutionWithoutWarranty?: string | null | undefined
  publicNotes?: string | null | undefined
  publiclyViewable?: boolean | null | undefined
  privateNotes?: string | null | undefined
}

export interface IModelNumber {
  description: string
  partitionKey: string // id
  sortKey: string
  secondaryIndexSortKey: ProductType
  symptoms: string[]
  pricing: IPricing
  productIdHash: string
  productType: ProductType
  indexSortKey: string // productIds
  lotted: boolean
  warrantyTerm: number
  warrantyDescription: string
  feeWithWarranty: IFeeStructure
  feeWithoutWarranty: IFeeStructure
  resolutionWithWarranty?: string | null | undefined
  resolutionWithoutWarranty?: string | null | undefined
  publicNotes?: string | null | undefined
  publiclyViewable?: boolean | null | undefined
  privateNotes?: string | null | undefined
}

export interface IModelNumberOutput {
  description: string
  id: string // not optional as it is managed by the user not a user generated UUID.
  pricing: IPricing
  productIds: string[]
  productType: ProductType
  lotted: boolean
  warrantyTerm: number
  warrantyDescription: string
  feeWithWarranty: IFeeStructure
  feeWithoutWarranty: IFeeStructure
  resolutionWithWarranty?: string | null | undefined
  resolutionWithoutWarranty?: string | null | undefined
  publicNotes?: string | null | undefined
  publiclyViewable?: boolean | null | undefined
  privateNotes?: string | null | undefined
}

/**
 * Generates a new user model in the database provided the supplied credentials are valid.
 * @param credentials The identifying credentials to assign to the account.
 */
const create = async ({
  id,
  productIds,
  productType,
  ...modelNumberInput
}: IModelNumberInput): Promise<IModelNumber> => {
  const item: IModelNumber = {
    ...modelNumberInput,
    indexSortKey: id,
    partitionKey: id,
    productIdHash: productIds.join('::'),
    productType,
    secondaryIndexSortKey: productType,
    sortKey: SECONDARY_KEY,
    symptoms: [],
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: 'attribute_not_exists(partitionKey)',
          Item: {
            ...filterBlankAttributes(item),
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
 * Updates an existing model number record in the database provided the supplied
 * input is valid.
 * @param input The identifying credentials to assign to the account.
 */
const update = async ({
  id,
  productIds,
  productType,
  ...modelNumberInput
}: IModelNumberInput): Promise<IModelNumber> => {
  const existingModelNumber = await find(id)
  const item: IModelNumber = {
    ...existingModelNumber,
    ...modelNumberInput,
    indexSortKey: id,
    partitionKey: id,
    productIdHash: productIds.join('::'),
    secondaryIndexSortKey: productType,
    sortKey: SECONDARY_KEY,
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: 'attribute_exists(partitionKey)',
          Item: {
            ...filterBlankAttributes(item),
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
 * Updates an existing model number record's lotted status in the database provided the
 * supplied input is valid.
 * @param input The identifying credentials to assign to the account.
 */
const setLotted = async ({
  id,
  lotted,
}: {
  id: string
  lotted: boolean
}): Promise<IModelNumber> => {
  const params = {
    TransactItems: [
      {
        Update: {
          ConditionExpression: 'attribute_exists(partitionKey)',
          ExpressionAttributeNames: { '#lotted': 'lotted' },
          ExpressionAttributeValues: {
            ':lotted': lotted,
          },
          Key: {
            partitionKey: id,
            sortKey: SECONDARY_KEY,
          },
          TableName: process.env.DYNAMODB_RESOURCES_TABLE,
          UpdateExpression: 'set #lotted = :lotted',
        },
      },
    ],
  }
  await client.transactWrite(params).promise()
  return await find(id)
}

/**
 * Updates an existing model number record's lotted status in the database provided the
 * supplied input is valid.
 * @param input The identifying credentials to assign to the account.
 */
const setViewable = async ({
  id,
  publiclyViewable,
}: {
  id: string
  publiclyViewable: boolean
}): Promise<IModelNumber> => {
  const params = {
    TransactItems: [
      {
        Update: {
          ConditionExpression: 'attribute_exists(partitionKey)',
          ExpressionAttributeNames: { '#publiclyViewable': 'publiclyViewable' },
          ExpressionAttributeValues: {
            ':publiclyViewable': publiclyViewable,
          },
          Key: {
            partitionKey: id,
            sortKey: SECONDARY_KEY,
          },
          TableName: process.env.DYNAMODB_RESOURCES_TABLE,
          UpdateExpression: 'set #publiclyViewable = :publiclyViewable',
        },
      },
    ],
  }
  await client.transactWrite(params).promise()
  return await find(id)
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
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
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
      ':rkey': SECONDARY_KEY,
    },
    IndexName: 'GSI_1',
    KeyConditionExpression: 'sortKey = :rkey',
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
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
      [process.env.DYNAMODB_RESOURCES_TABLE]: {
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
    (result.Responses[
      process.env.DYNAMODB_RESOURCES_TABLE
    ] as IModelNumber[]) || []
  )
}

/**
 * Retreives a list of all model number configurations for a
 * specified product ID.
 *
 * NOTE: This queries all model numbers and uses a filter to
 * wither down the results to a specific product. This method
 * will ultimately become inconsistent once our database
 * extends beyond 1000 model number variations. At which point
 * a product / model number lookup table may be required.
 * Alternatively, this query will could eventually be performed
 * via elastic search.
 */
const forProduct = async (productId: string): Promise<IModelNumber[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':hkey': SECONDARY_KEY,
      ':productId': productId,
    },
    FilterExpression: 'contains(productIdHash, :productId)',
    IndexName: 'GSI_1',
    KeyConditionExpression: 'sortKey = :hkey',
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IModelNumber[]) : []
}

/**
 * Retreives a list of all model number configurations for a
 * specified product type.
 */
const forType = async (productType: ProductType): Promise<IModelNumber[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':hkey': SECONDARY_KEY,
      ':productType': productType,
    },
    IndexName: 'GSI_2',
    KeyConditionExpression:
      'sortKey = :hkey AND begins_with(secondaryIndexSortKey, :productType)',
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IModelNumber[]) : []
}

/**
 * Retreives a list of all model number configurations for a
 * specified product type and product id.
 *
 * NOTE: This queries all model numbers and uses a filter to
 * wither down the results to a specific product. This method
 * will ultimately become inconsistent once our database
 * extends beyond 1000 model number variations. At which point
 * a product / model number lookup table may be required.
 * Alternatively, this query will could eventually be performed
 * via elastic search.
 */
const forTypeAndProductID = async (
  productType: ProductType,
  productId: string
): Promise<IModelNumber[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':hkey': SECONDARY_KEY,
      ':productId': productId,
      ':productType': productType,
    },
    FilterExpression: 'contains(productIdHash, :productId)',
    IndexName: 'GSI_2',
    KeyConditionExpression:
      'sortKey = :hkey AND begins_with(secondaryIndexSortKey, :productType)',
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IModelNumber[]) : []
}

/**
 * Retreives a product by it's name.
 * @param productType The type of product to find.
 */
const findByType = async (
  productType: ProductType
): Promise<IModelNumber[] | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':rkey': SECONDARY_KEY,
      ':shsk': productType,
    },
    IndexName: 'GSI_2',
    KeyConditionExpression: 'sortKey = :rkey AND secondaryIndexSortKey = :shsk',
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IModelNumber[]) : null
}

/**
 * Retreives a product by it's name.
 * @param match The name of the product to find.
 */
const findModelNumbersStartingWith = async (
  match: string
): Promise<IModelNumber[] | null> => {
  if (match.length < 1) {
    return []
  }
  const searchParams = {
    ExpressionAttributeValues: {
      ':hkey': match,
      ':rkey': SECONDARY_KEY,
    },
    FilterExpression: 'begins_with(partitionKey, :hkey) AND sortKey = :rkey',
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.scan(searchParams).promise()
  return result.Items ? (result.Items as IModelNumber[]) : null
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
            TableName: process.env.DYNAMODB_RESOURCES_TABLE,
          },
        },
      ],
    }
    await client.transactWrite(params).promise()
    return true
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log(e)
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
  productIdHash,
  secondaryIndexSortKey,
  ...modelNumber
}: IModelNumber): IModelNumberOutput => {
  const result = {
    ...modelNumber,
    id: partitionKey,
    lotted: modelNumber.lotted || false,
    privateNotes: modelNumber.privateNotes || '',
    productIds: productIdHash ? [...productIdHash.split('::')] : [],
    productType: secondaryIndexSortKey || ProductType.Accessory,
    publicNotes: modelNumber.publicNotes || '',
    resolutionWithWarranty: modelNumber.resolutionWithWarranty || '',
    resolutionWithoutWarranty: modelNumber.resolutionWithoutWarranty || '',
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
  findByType,
  findModelNumbersStartingWith,
  forProduct,
  forType,
  forTypeAndProductID,
  output,
  setLotted,
  setViewable,
  update,
}
