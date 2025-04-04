import { v4 as uuid } from 'uuid'
import { getDynamoClient } from 'api-utils'
import { filterBlankAttributes } from 'utils'

/**
 * Dynamo DB Model:
 * PRODUCT REGISTRATION
 * ==========================================================
 *
 * This model represents a product being registered to a given
 * customer. This can be achieved either directly by a customer
 * submitting a product registration directly or by a distributor
 * or team member filing an RGA and associating the appropriate
 * customer credentials for the product.
 *
 * The table structure in dynamo DB is as follows:
 *
 * ------------------------------------------------------------------------------------------------------
 * |                    | (GS1 Partition Key) | (GS1 Sort Key)                      | (GS2 Sort Key)
 * ------------------------------------------------------------------------------------------------------
 * | Partition Key      | Sort Key            | HSK                                 | SHSK
 * ------------------------------------------------------------------------------------------------------
 * | Serial/UUID        | CONST               | ProductId#ModelNumber#customerId    | registeredOn
 * ------------------------------------------------------------------------------------------------------
 *
 * This allows for the following access patterns:
 *
 * 1. Fetch a registration via serial number (PK matches Serial Number)
 * 2. Fetch registration by unique id if the product was not lotted. (PK matches uuid)
 * 3. Fetch all product registrations (Sort Key matches 'CONST')
 * 4. Fetch all product registrations for a given product (HSK begins with ProductId)
 * 5. Fetch all product registrations for a given product configuration (HSK matches #ProductId#ModelNumber)
 * 6. Fetch all product registrations sorted by date registered (GS2 PK matches CONST)
 */

const client = getDynamoClient()

const SECONDARY_KEY = 'PRODUCT_REGISTRATION'

interface IRegistrationSortKeyInput {
  productId: string
  modelNumber: string
}

export interface IProductRegistrationInput {
  customerId: string
  productId: string
  lotted: boolean
  modelNumber: string
  serial?: string
  registeredOn: string
  id?: string
}

export interface IProductRegistration {
  customerId: string
  productId: string
  lotted: boolean
  modelNumber: string
  registeredOn: string
  partitionKey: string
  indexSortKey: string
  secondaryIndexSortKey: string
  serial?: string
  sortKey: string
}

export interface IProductRegistrationOutput {
  customerId: string
  modelNumber: string
  lotted: boolean
  productId: string
  registeredOn: string
  serial: string
  id: string
}

/**
 * Generates a new product model in the database provided the supplied credentials are valid.
 * @param credentials The identifying credentials to assign to the account.
 */
const create = async ({
  customerId,
  id,
  productId,
  modelNumber,
  serial,
  ...registrationInput
}: IProductRegistrationInput): Promise<IProductRegistration> => {
  const item: IProductRegistration = {
    ...registrationInput,
    customerId,
    modelNumber,
    partitionKey: serial || uuid(),
    productId,
    serial,
    sortKey: SECONDARY_KEY,
    indexSortKey: `${productId}#${modelNumber}#${customerId}`,
    secondaryIndexSortKey: registrationInput.registeredOn,
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
 * Updates an existing registration model in the database provided the supplied
 * credentials are valid. Some attributes cannot be changed such as the serial
 * or model number.
 * @param input An object representing the input to replace the supplied object.
 */
const update = async ({
  customerId,
  id,
  registeredOn,
  ...input
}: IProductRegistrationInput): Promise<IProductRegistration> => {
  const existingItem = await find(id)
  const item: IProductRegistration = {
    ...existingItem,
    ...input,
    customerId,
    registeredOn,
    sortKey: SECONDARY_KEY,
  }
  const hsk = `${existingItem.productId}#${existingItem.modelNumber}#${customerId}`
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: 'attribute_exists(partitionKey)',
          Item: {
            ...item,
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
 * Retreive a registration by serial / uuid.
 * @param uuid The uuid of the product to find.
 */
const find = async (id: string): Promise<IProductRegistration | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':pk': id,
      ':rkey': SECONDARY_KEY,
    },
    KeyConditionExpression: 'partitionKey = :pk and sortKey = :rkey',
    Limit: 1,
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items[0] ? (result.Items[0] as IProductRegistration) : null
}

/**
 * Retreive all registrations for a given product and model number configuration.
 * @param productConfig The product Id and model number of the registrations to find.
 */
const forModel = async ({
  productId,
  modelNumber,
}: IRegistrationSortKeyInput): Promise<IProductRegistration[] | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':pk': SECONDARY_KEY,
      ':rkey': `${productId}#${modelNumber}`,
    },
    IndexName: 'GSI_1',
    KeyConditionExpression:
      'sortKey = :pk and begins_with(indexSortKey, :rkey)',
    Limit: 500,
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IProductRegistration[]) : []
}

/**
 * Retreive all registrations for a given product across all configurations.
 * @param productId The product Id of the registrations to find.
 */
const forProduct = async (
  productId: string
): Promise<IProductRegistration[] | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':pk': SECONDARY_KEY,
      ':rkey': productId,
    },
    IndexName: 'GSI_1',
    KeyConditionExpression:
      'sortKey = :pk and begins_with(indexSortKey, :rkey)',
    Limit: 500,
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IProductRegistration[]) : []
}

/**
 * Retreives a list of all product registrations.
 */
const all = async (): Promise<IProductRegistration[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':rkey': SECONDARY_KEY,
    },
    IndexName: 'GSI_2',
    KeyConditionExpression: 'sortKey = :rkey',
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
    ScanIndexForward: false,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IProductRegistration[]) : []
}

/**
 * Deletes a product and associated child objects from the
 * database via UUID.
 * @param id The UUID of the product to delete.
 */
const destroy = async (id: string): Promise<boolean> => {
  const registration = await find(id)
  try {
    if (!registration) {
      return false
    }
    const params = {
      TransactItems: [
        {
          Delete: {
            Key: { partitionKey: id, sortKey: registration.sortKey },
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
 * Converts a productRegistation record to public output that can be consumed
 * by the API.
 */
const output = ({
  partitionKey,
  sortKey,
  secondaryIndexSortKey,
  indexSortKey,
  ...productRegistation
}: IProductRegistration): IProductRegistrationOutput => {
  const result = {
    ...productRegistation,
    id: partitionKey,
    serial: productRegistation.serial || '',
  }
  return result
}

export const ProductRegistration = {
  SECONDARY_KEY,
  all,
  create,
  destroy,
  find,
  forModel,
  forProduct,
  output,
  update,
}
