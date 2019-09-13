import * as jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import { getDynamoClient } from '../util'

/**
 * Dynamo DB Model:
 * TEMPORARY_ACCESS_TOKEN
 * ==========================================================
 *
 * This model represents a temporary access token that is emailed
 * to a given user to access a specific portion of the application
 * without being signed in.
 *
 * The table structure in dynamo DB is as follows:
 *
 * --------------------------------------------------------------
 * |                    | (GS1 Partition Key)   | (GS1 Sort Key)
 * --------------------------------------------------------------
 * | Partition Key      | Sort Key              | HSK
 * --------------------------------------------------------------
 * | TOKEN              | CONST                 |
 * --------------------------------------------------------------
 *
 * This allows for the following access patterns:
 *
 * 1. Fetch token by jwt. (PK is generated jwt and SK matches 'CONST')
 */

const client = getDynamoClient()

const ALGORITHM = 'HS512'
const SECONDARY_KEY = 'TEMPORARY_ACCESS_TOKEN'

export interface ITemporaryAccessTokenInput {
  payload: object
  expiresIn?: string
}

export interface ITemporaryAccessToken {
  partitionKey: string
  sortKey: string
  secret: string
}

/**
 * Generates a new temporary access token with the supplied payload. The token
 * will expire in 7 days unless otherwise specified.
 * @param input The payload for the jwt token generated for this instance.
 */
const create = async ({
  expiresIn,
  payload,
}: ITemporaryAccessTokenInput): Promise<ITemporaryAccessToken> => {
  const secret = uuid()
  const signedToken = jwt.sign(
    {
      ...payload,
      iat: Math.floor(Date.now() / 1000) - 30,
    },
    secret,
    {
      algorithm: ALGORITHM,
      expiresIn: expiresIn || '7d',
      jwtid: uuid(),
    }
  )
  const item: ITemporaryAccessToken = {
    partitionKey: signedToken,
    secret,
    sortKey: SECONDARY_KEY,
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: 'attribute_not_exists(id)',
          Item: {
            ...item,
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
 * Retreives a token record via the supplied JWT token.
 * @param token The jwt to retrieve.
 */
const find = async (token: string): Promise<ITemporaryAccessToken | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':pkey': token,
      ':rkey': SECONDARY_KEY,
    },
    KeyConditionExpression: 'partitionKey = :pkey AND sortKey = :rkey',
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return (
    (result.Items ? (result.Items[0] as ITemporaryAccessToken) : null) || null
  )
}

/**
 * Deletes a temporary access token from the database via the JWT token.
 * @param token The JWT token to retreive.
 */
const destroy = async (token: string): Promise<boolean> => {
  try {
    if (!(await find(token))) {
      return false
    }
    const params = {
      TransactItems: [
        {
          Delete: {
            Key: { partitionKey: token, sortKey: SECONDARY_KEY },
            TableName: process.env.DYNAMODB_RESOURCES_TABLE,
          },
        },
      ],
    }
    await client.transactWrite(params).promise()
    return true
  } catch (e) {
    // tslint:disable-next-line
    console.log(e)
    return false
  }
}

/**
 * Verifies and decodes a temporary access token..
 */
const decode = ({ partitionKey, secret }: ITemporaryAccessToken) => {
  const decoded: object = jwt.verify(partitionKey, secret) as object
  return decoded
}

export const TemporaryAccessToken = {
  SECONDARY_KEY,
  create,
  decode,
  destroy,
  find,
}
