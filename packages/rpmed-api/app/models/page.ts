import { v4 as uuid } from 'uuid'
import { getDynamoClient } from 'api-utils'
import { filterBlankAttributes } from 'utils'

/**
 * Dynamo DB Model:
 * Page
 * ==========================================================
 *
 * This model represents a specific good attached to an RGA
 * request.
 *
 * The table structure in dynamo DB is as follows:
 *
 * ----------------------------------------------------------------------
 * |                    | (GS1 Partition Key)   | (GS1 Sort Key)
 * ----------------------------------------------------------------------
 * | Partition Key      | Sort Key              | HSK
 * ----------------------------------------------------------------------
 * | ID                 | PAGE                  | Slug
 * ----------------------------------------------------------------------
 *
 * This allows for the following access patterns:
 *
 * 1. Fetch any page by unique composite ID (PK + SK).
 * 2. Fetch all pages (SK equals 'PAGE')
 */

const SECONDARY_KEY = 'PAGE'

const client = getDynamoClient()

export interface PageBase {
  title: string
  description?: string
  keywords?: string
  slug: string
  id: string
}

export interface PageInput extends PageBase {}

export interface Page extends PageBase {
  partitionKey: string // id
  sortKey: string // secondary_key
  indexSortKey: string // title
}

export interface PageOutput extends PageBase {}

/**
 * Creates or updates an existing Page model in the database provided the supplied input is valid.
 * @param input The identifying input to assign to the Page.
 */
const make = async ({ id, ...page }: PageInput): Promise<Page> => {
  const existing = await find(id)
  const partitionKey = id ?? uuid()
  const pageAttributes: Page = {
    ...(existing ?? {}),
    ...page,
    id: partitionKey,
    indexSortKey: page.slug,
    partitionKey,
    sortKey: `${SECONDARY_KEY}`,
  }
  console.log(pageAttributes)
  const params = {
    TransactItems: [
      {
        Put: {
          Item: {
            ...filterBlankAttributes(pageAttributes),
          },
          TableName: process.env.DYNAMODB_RESOURCES_TABLE,
        },
      },
    ],
  }
  await client.transactWrite(params).promise()
  return pageAttributes
}

/**
 * Retreives a specific page by uuid.
 * @param id The UUID used to look up the page.
 */
const find = async (id?: string | null | undefined): Promise<Page | null> => {
  if (!id) {
    return null
  }
  const searchParams = {
    Key: {
      partitionKey: id,
      sortKey: SECONDARY_KEY,
    },
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.get(searchParams).promise()
  return result.Item ? (result.Item as Page) : null
}

/**
 * Retreives a page for a specific page by slug.
 * @param slug The slug identifiying the page.
 */
const findBySlug = async (slug: string): Promise<Page | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':sortKey': SECONDARY_KEY,
      ':indexSortKey': slug,
    },
    IndexName: 'GSI_1',
    KeyConditionExpression:
      'sortKey = :sortKey AND indexSortKey = :indexSortKey',
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items[0] as Page) : null
}

/**
 * Retreives all pages in the system.
 */
const all = async (): Promise<PageOutput[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':rkey': SECONDARY_KEY,
    },
    IndexName: 'GSI_1',
    KeyConditionExpression: 'sortKey = :rkey',
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return (result.Items
    ? (result.Items as Page[]).map(output)
    : []) as PageOutput[]
}

/**
 * Deletes a page.
 * @param id The id of the page to delete.
 */
const destroy = async (id: string): Promise<boolean> => {
  try {
    const good = await find(id)
    if (!good) {
      return false
    }
    const params = {
      TransactItems: [
        {
          Delete: {
            Key: { partitionKey: good.partitionKey, sortKey: good.sortKey },
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
 * Converts an Page record to public output that can be consumed
 * by the API.
 */
const output = ({
  partitionKey,
  sortKey,
  indexSortKey,
  ...page
}: Page): PageOutput => ({
  ...page,
})

export const Page = {
  SECONDARY_KEY,
  all,
  destroy,
  find,
  make,
  findBySlug,
  output,
}
