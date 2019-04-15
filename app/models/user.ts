import { v4 as uuid } from "uuid"
import { hashPassword } from "../oauth"
import { getClient } from "../util"

const client = getClient()

const SECONDARY_KEY = "USER"

export interface IUserInput {
  email: string
  firstName: string
  id?: string
  lastName: string
  password: string
}

export interface IUser {
  email: string
  firstName: string
  lastName: string
  password: string
  partitionKey: string
  sortKey: string
}

export interface IUserOutput {
  email: string
  firstName: string
  lastName: string
  id: string
}

/**
 * Generates a new user model in the database provided the supplied credentials are valid.
 * @param credentials The identifying credentials to assign to the account.
 */
const create = async ({ id, ...userInput }: IUserInput): Promise<IUser> => {
  const hashedPassword = await hashPassword(userInput.password)
  const item: IUser = {
    ...userInput,
    password: hashedPassword,
    partitionKey: uuid(),
    sortKey: SECONDARY_KEY,
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: "attribute_not_exists(email)",
          Item: { email: item.email, id: item.partitionKey },
          TableName: process.env.DYNAMODB_USER_LOOKUP_TABLE,
        },
      },
      {
        Put: {
          ConditionExpression: "attribute_not_exists(id)",
          Item: {
            ...item,
            indexSortKey: [item.firstName, item.lastName, item.email].join("#"),
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
const find = async (id: string): Promise<IUser | null> => {
  const searchParams = {
    Key: {
      partitionKey: id,
      sortKey: SECONDARY_KEY,
    },
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.get(searchParams).promise()
  return result.Item ? (result.Item as IUser) : null
}

/**
 * Retreives a list of all user accounts.
 */
const all = async (): Promise<IUser[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "sortKey = :rkey",
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IUser[]) : []
}

/**
 * Retreives a user by an associated email.
 * @param email The email of the user to look up.
 */
const findByEmail = async (email: string): Promise<IUser | null> => {
  const lookUpParams = {
    Key: {
      email,
    },
    TableName: process.env.DYNAMODB_USER_LOOKUP_TABLE,
  }
  const result = (await client.get(lookUpParams).promise()).Item
  if (!result) {
    return null
  }
  const id = result.id
  return await find(id)
}

const destroyParamsForAssociatedEmailAddressesForUserId = async (
  userId: string
): Promise<
  Array<{ [key: string]: { Key: { email: string }; TableName: string } }>
> => {
  const params = {
    ExpressionAttributeValues: {
      ":hkey": userId,
    },
    IndexName: "UserIdGSI",
    KeyConditionExpression: "id = :hkey",
    TableName: process.env.DYNAMODB_USER_LOOKUP_TABLE,
  }
  const results = await client.query(params).promise()
  return results.Items.map(i => ({
    Delete: {
      Key: {
        email: i.email,
      },
      TableName: process.env.DYNAMODB_USER_LOOKUP_TABLE,
    },
  }))
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
        ...(await destroyParamsForAssociatedEmailAddressesForUserId(id)),
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
 * Retreives a user by an associated email.
 * @param email The email of the user to look up.
 */
const destroyByEmail = async (email: string): Promise<boolean> => {
  const lookUpParams = {
    Key: {
      email,
    },
    TableName: process.env.DYNAMODB_USER_LOOKUP_TABLE,
  }
  const result = (await client.get(lookUpParams).promise()).Item
  return typeof result === "undefined" ? false : await destroy(result.id)
}

/**
 * Converts a user record to public output that can be consumed
 * by the API.
 */
const output = ({
  partitionKey,
  sortKey,
  password,
  ...user
}: IUser): IUserOutput => ({
  ...user,
  id: partitionKey,
})

export const User = {
  SECONDARY_KEY,
  all,
  create,
  destroy,
  destroyByEmail,
  find,
  findByEmail,
  output,
}
