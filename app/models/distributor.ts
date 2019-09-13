import { v4 as uuid } from 'uuid'
import { getDynamoClient } from '../util'

/**
 * Dynamo DB Model:
 * DISTRIBUTOR
 * ==========================================================
 *
 * This model represents a distributor or partner of Riverpoint Medical.
 * Distributors are tracked in order to track RGA requests. It also
 * allows us to manage any special terms that may overwrite default warranties
 * or other specific agreements that are made on a partner by partner
 * basis.
 *
 * The table structure in dynamo DB is as follows:
 *
 * --------------------------------------------------------------
 * |                  | (GS1 Partition Key)   | (GS1 Sort Key)
 * --------------------------------------------------------------
 * | Partition Key    | Sort Key              | HSK
 * --------------------------------------------------------------
 * | UUID             | CONST                 | Domain
 * --------------------------------------------------------------
 *
 * This allows for the following access patterns:
 *
 * 1. Fetch distributor by unique id. (PK is generated uuid)
 * 2. Fetch all distributors (SK matches 'CONST')
 * 3. Look up a distributor via email address domain (HSK matches Domain)
 */

const client = getDynamoClient()

const SECONDARY_KEY = 'DISTRIBUTOR'

export interface IDistributorInput {
  name: string
  domain: string
  id?: string
}

export interface IDistributor {
  name: string
  domain: string
  partitionKey: string
  sortKey: string
}

export interface IDistributorOutput {
  name: string
  domain: string
  id: string
}

/**
 * Generates a new distributor model provided the input is valid.
 * @param input The identifying credentials to assign to the distributor.
 */
const create = async ({
  id,
  ...distributorInput
}: IDistributorInput): Promise<IDistributor> => {
  const item: IDistributor = {
    ...distributorInput,
    partitionKey: uuid(),
    sortKey: SECONDARY_KEY,
  }
  const hsk = distributorInput.domain
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: 'attribute_not_exists(partitionKey)',
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
 * Generates a new distributor model in the database provided the supplied credentials are valid.
 * @param input An object representing the input to replace the supplied object.
 */
const update = async ({
  id,
  ...distributorInput
}: IDistributorInput): Promise<IDistributor> => {
  const existingItem = await find(id)
  const item: IDistributor = {
    ...existingItem,
    ...distributorInput,
  }
  const hsk = distributorInput.domain
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
 * Retreives a distributor by unique ID.
 * @param id The UUID of the distributor to find.
 */
const findOrCreateWithDomain = async (
  domain: string
): Promise<IDistributor> => {
  const existing = await findByDomain(domain)
  if (existing) {
    return existing
  }
  return await create({
    domain,
    name: domain,
  })
}

/**
 * Retreives a distributor by unique ID.
 * @param id The UUID of the distributor to find.
 */
const find = async (id: string): Promise<IDistributor | null> => {
  const searchParams = {
    Key: {
      partitionKey: id,
      sortKey: SECONDARY_KEY,
    },
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.get(searchParams).promise()
  return result.Item ? (result.Item as IDistributor) : null
}

/**
 * Retreives a distributor by their domain.
 * @param domain The domain of the distributor to find.
 */
const findByDomain = async (domain: string): Promise<IDistributor | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':hsk': domain,
      ':rkey': SECONDARY_KEY,
    },
    IndexName: 'GSI_1',
    KeyConditionExpression: 'sortKey = :rkey AND indexSortKey = :hsk',
    Limit: 1,
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items[0] as IDistributor) : null
}

/**
 * Retreives a list of all distributors.
 */
const all = async (): Promise<IDistributor[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':rkey': SECONDARY_KEY,
    },
    IndexName: 'GSI_1',
    KeyConditionExpression: 'sortKey = :rkey',
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IDistributor[]) : []
}

/**
 * Deletes a distributor and associated child objects from the
 * database via UUID.
 * @param id The UUID of the distributor to delete.
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
  } catch {
    return false
  }
}

/**
 * Converts a distributor record to public output that can be consumed
 * by the API.
 */
const output = ({
  partitionKey,
  sortKey,
  ...distributor
}: IDistributor): IDistributorOutput => {
  const result = {
    ...distributor,
    id: partitionKey,
  }
  return result
}

export const Distributor = {
  SECONDARY_KEY,
  all,
  create,
  destroy,
  find,
  findByDomain,
  findOrCreateWithDomain,
  output,
  update,
}
