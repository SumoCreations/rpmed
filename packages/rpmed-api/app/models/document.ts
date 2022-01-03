import { v4 as uuid } from 'uuid'
import { getDynamoClient } from 'api-utils'
import { filterBlankAttributes } from 'utils'

/**
 * Dynamo DB Model:
 * Document
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
 * | ID                 | DOCUMENT              | Slug
 * ----------------------------------------------------------------------
 *
 * This allows for the following access patterns:
 *
 * 1. Fetch any document by unique composite ID (PK + SK).
 * 2. Fetch all documents (SK equals 'DOCUMENT')
 */

const SECONDARY_KEY = 'DOCUMENT'

const client = getDynamoClient()

export interface DocumentBase {
  title: string
  description?: string
  keywords?: string
  slug: string
  id: string
  fileKey?: string
}

export interface Document extends DocumentBase {
  partitionKey: string // id
  sortKey: string // secondary_key
  indexSortKey: string // slug
}

export interface DocumentInput extends DocumentBase {}

export interface DocumentOutput extends DocumentBase {}

/**
 * Creates or updates an existing Document model in the database provided the supplied input is valid.
 * @param input The identifying input to assign to the Document.
 */
const make = async ({ id, ...document }: DocumentInput): Promise<Document> => {
  const existing = await find(id)
  const partitionKey = id ?? uuid()
  const documentAttributes: Document = {
    ...(existing ?? {}),
    ...document,
    id: partitionKey,
    indexSortKey: document.slug,
    partitionKey,
    sortKey: `${SECONDARY_KEY}`,
  }
  console.log(documentAttributes)
  const params = {
    TransactItems: [
      {
        Put: {
          Item: {
            ...filterBlankAttributes(documentAttributes),
          },
          TableName: process.env.DYNAMODB_RESOURCES_TABLE,
        },
      },
    ],
  }
  await client.transactWrite(params).promise()
  return documentAttributes
}

/**
 * Retreives a specific document by uuid.
 * @param id The UUID used to look up the document.
 */
const find = async (
  id?: string | null | undefined
): Promise<Document | null> => {
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
  return result.Item ? (result.Item as Document) : null
}

/**
 * Retreives a document for a specific document by slug.
 * @param slug The slug identifiying the document.
 */
const findBySlug = async (slug: string): Promise<Document | null> => {
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
  return result.Items ? (result.Items[0] as Document) : null
}

/**
 * Retreives all documents in the system.
 */
const all = async (): Promise<DocumentOutput[]> => {
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
    ? (result.Items as Document[]).map(output)
    : []) as DocumentOutput[]
}

/**
 * Deletes a document.
 * @param id The id of the document to delete.
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
 * Converts an Document record to public output that can be consumed
 * by the API.
 */
const output = ({
  partitionKey,
  sortKey,
  indexSortKey,
  ...document
}: Document): DocumentOutput => ({
  ...document,
})

export const Document = {
  SECONDARY_KEY,
  all,
  destroy,
  find,
  make,
  findBySlug,
  output,
}
