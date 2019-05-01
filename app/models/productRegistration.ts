import { v4 as uuid } from "uuid"
import { getClient } from "../util"
import { Customer, ICustomer } from "./customer"
import { IModelNumberOutput, ModelNumber } from "./modelNumber"

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
 * ----------------------------------------------------------------------
 * | Parition Key         | Sort Key                        | HSK
 * ----------------------------------------------------------------------
 * | UUID / Serial        | CONST#ProductId#ModelNumber     | CustomerId
 * ----------------------------------------------------------------------
 * 
 * This allows for the following access patterns:
 * 
 * 1. Fetch registration by serial number. (PK is serial)
 * 2. Fetch registration by unique id (if the product was not lotted). (PK is generated uuid)
 * 3. Fetch all product registrations (SK begins with 'CONST')
 * 4. Fetch all product registrations for a given product (SK begins with CONST#ProductId)
 * 5. Fetch all product registrations for a given product configuration (SK matches CONST#ProductId#ModelNumber)
 * 6. Fetch all product registrations for a given customer (HSK matches CustomerId)
 */

const client = getClient()

const SECONDARY_KEY = "PRODUCT_REGISTRATION"

interface IRegistrationSortKeyInput { productId: string, modelNumber: string }
const generateSortKey = ({ productId, modelNumber }: IRegistrationSortKeyInput) => `${SECONDARY_KEY}#${productId}#${modelNumber}`

export interface IProductRegistrationInput {
  customerId: string
  productId: string
  modelNumber: string
  serial?: string
  registeredOn: string
  id?: string
}

export interface IProductRegistration {
  customerId: string
  productId: string
  modelNumber: string
  registeredOn: string
  partitionKey: string
  sortKey: string
}

export interface IProductRegistrationOutput {
  customerId: string
  modelNumber: string
  productId: string
  registeredOn: string
  id: string
}

/**
 * Generates a new product model in the database provided the supplied credentials are valid.
 * @param credentials The identifying credentials to assign to the account.
 */
const create = async ({
  id,
  productId,
  modelNumber,
  serial,
  ...registrationInput
}: IProductRegistrationInput): Promise<IProductRegistration> => {
  const item: IProductRegistration = {
    ...registrationInput,
    modelNumber,
    partitionKey: serial || uuid(),
    productId,
    sortKey: generateSortKey({ modelNumber, productId }),
  }
  const hsk = registrationInput.customerId
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: "attribute_not_exists(partitionKey)",
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
 * Generates a new registration model in the database provided the supplied credentials are valid.
 * @param input An object representing the input to replace the supplied object.
 */
const update = async ({
  id,
  modelNumber,
  productId,
  registeredOn,
  ...registrationInput
}: IProductRegistrationInput): Promise<IProductRegistration> => {
  const existingItem = await find(id)
  const item: IProductRegistration = {
    ...existingItem,
    modelNumber,
    productId,
    registeredOn,
    sortKey: generateSortKey({ modelNumber, productId }),
  }
  const hsk = registrationInput.customerId
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: "attribute_exists(partitionKey)",
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
 * Retreive a registration by serial / uuid.
 * @param uuid The uuid of the product to find.
 */
const find = async (id: string): Promise<IProductRegistration | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":pk": id,
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "begins_with(sortKey, :rkey) AND partitionKey = :pk",
    Limit: 1,
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items[0] as IProductRegistration) : null
}

/**
 * Retreive all registrations for a given product and model number configuration.
 * @param productConfig The product Id and model number of the registrations to find.
 */
const forModel = async (productConfig: IRegistrationSortKeyInput): Promise<IProductRegistration[] | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":rkey": generateSortKey(productConfig),
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "begins_with(sortKey, :rkey)",
    Limit: 500,
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IProductRegistration[]) : []
}


/**
 * Retreive all registrations for a given product across all configurations.
 * @param productId The product Id of the registrations to find.
 */
const forProduct = async (productId: string): Promise<IProductRegistration[] | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":rkey": generateSortKey({ productId, modelNumber: '' }),
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "begins_with(sortKey, :rkey)",
    Limit: 500,
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
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
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "begins_with(sortKey, :rkey)",
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
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
 * Converts a productRegistation record to public output that can be consumed
 * by the API.
 */
const output = ({
  partitionKey,
  sortKey,
  ...productRegistation
}: IProductRegistration): IProductRegistrationOutput => {
  const result = {
    ...productRegistation,
    id: partitionKey,
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
  update
}
