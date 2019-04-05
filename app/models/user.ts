import { v4 as uuid } from "uuid"
import { hashPassword } from "../oauth"
import { getClient } from "../util"

const client = getClient()

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
  id: string
  lastName: string
  password: string
}

/**
 * Generates a new user model in the database provided the supplied credentials are valid.
 * @param credentials The identifying credentials to assign to the account.
 */
const create = async (userInput: IUserInput): Promise<IUser> => {
  const hashedPassword = await hashPassword(userInput.password)
  const item: IUser = {
    ...userInput,
    id: uuid(),
    password: hashedPassword,
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: "attribute_not_exists(email)",
          Item: { email: item.email, id: item.id },
          TableName: process.env.DYNAMODB_USER_LOOKUP_TABLE,
        },
      },
      {
        Put: {
          ConditionExpression: "attribute_not_exists(id)",
          Item: { ...item },
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
      id,
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
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.scan(searchParams).promise()
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
            Key: { id },
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

export const User = {
  all,
  create,
  destroy,
  destroyByEmail,
  find,
  findByEmail,
}
