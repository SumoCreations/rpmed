import { v4 as uuid } from "uuid"
import { getClient } from "../util"

/**
 * Dynamo DB Model:
 * CUSTOMER
 * ==========================================================
 * 
 * This model represents a customer of Riverpoint Medical. 
 * Customers are tracked in order to track product registrations
 * and warranties. It also helps us maintain a centralized 
 * database of all service interactions with a direct customer.
 * 
 * The table structure in dynamo DB is as follows:
 * 
 * --------------------------------------------------------------
 * |                  | (GS1 Partition Key)    | (GS1 Sort Key)
 * --------------------------------------------------------------
 * | Partition Key     | Sort Key              | HSK
 * --------------------------------------------------------------
 * | UUID             | CONST                 | Email
 * --------------------------------------------------------------
 * 
 * This allows for the following access patterns:
 * 
 * 1. Fetch customer by unique id. (PK is generated uuid)
 * 2. Fetch all customers (SK matches 'CONST')
 * 3. Look up a customer via email (HSK matches Email)
 */

const client = getClient()

const SECONDARY_KEY = "CUSTOMER"

export interface ICustomerInput {
  name: string
  email: string
  id?: string
}

export interface ICustomer {
  name: string
  email: string
  partitionKey: string
  sortKey: string
}

export interface ICustomerOutput {
  name: string
  email: string
  id: string
}

/**
 * Generates a new customer model provided the input is valid.
 * @param input The identifying credentials to assign to the customer.
 */
const create = async ({
  id,
  ...customerInput
}: ICustomerInput): Promise<ICustomer> => {
  const item: ICustomer = {
    ...customerInput,
    partitionKey: uuid(),
    sortKey: SECONDARY_KEY,
  }
  const hsk = customerInput.email
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
 * Generates a new customer model in the database provided the supplied credentials are valid.
 * @param input An object representing the input to replace the supplied object.
 */
const update = async ({
  id, ...customerInput
}: ICustomerInput): Promise<ICustomer> => {
  const existingItem = await find(id)
  const item: ICustomer = {
    ...existingItem,
    ...customerInput
  }
  const hsk = customerInput.email
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
 * Retreives a customer by unique ID.
 * @param id The UUID of the customer to find.
 */
const find = async (id: string): Promise<ICustomer | null> => {
  const searchParams = {
    Key: {
      partitionKey: id,
      sortKey: SECONDARY_KEY,
    },
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.get(searchParams).promise()
  return result.Item ? (result.Item as ICustomer) : null
}

/**
 * Retreives a customer by their email.
 * @param email The email of the customer to find.
 */
const findByEmail = async (email: string): Promise<ICustomer | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":hsk": email,
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "sortKey = :rkey AND indexSortKey = :hsk",
    Limit: 1,
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items[0] as ICustomer) : null
}

/**
 * Retreives a list of all customers.
 */
const all = async (): Promise<ICustomer[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "sortKey = :rkey",
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as ICustomer[]) : []
}

/**
 * Deletes a customer and associated child objects from the 
 * database via UUID.
 * @param id The UUID of the customer to delete.
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
 * Converts a customer record to public output that can be consumed
 * by the API.
 */
const output = ({
  partitionKey,
  sortKey,
  ...customer
}: ICustomer): ICustomerOutput => {
  const result = {
    ...customer,
    id: partitionKey
  }
  return result
}

export const Customer = {
  SECONDARY_KEY,
  all,
  create,
  destroy,
  find,
  findByEmail,
  output,
  update
}
