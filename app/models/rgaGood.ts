import { v4 as uuid } from "uuid"
import { filterBlankAttributes, getClient } from "../util"

/**
 * Dynamo DB Model:
 * RGA Good
 * ==========================================================
 * 
 * This model represents a specific good attached to an RGA 
 * request.
 * 
 * The table structure in dynamo DB is as follows:
 * 
 * --------------------------------------------------------------
 * |                    | (GS1 Partition Key)   | (GS1 Sort Key)
 * --------------------------------------------------------------
 * | Partition Key      | Sort Key              | HSK
 * --------------------------------------------------------------
 * | RGA-ID             | GOOD_Serial           | ProductId:ModelNumber
 * --------------------------------------------------------------
 * 
 * This allows for the following access patterns:
 * 
 * 1. Fetch any RGA by unique composite ID (PK + SK).
 * 2. Fetch all RGAs (PK matches RGA-ID and SK begins with 'GOOD_')
 * 3. Look up all RGA goods for an associated serial number (SK matches GOOD_Serial)
 * 4. Look up all RGA goods for an associated product (HSK beginsWith ProductId)
 * 5. Look up all RGA goods for an associated model number (HSK matches ProductId:ModelNumber)
 */

const SECONDARY_KEY = "GOOD"

const client = getClient()

export interface IRGAGoodInput {
  warrantied: boolean
  symptomId: string
  rgaId: string
  productId: string
  lotted: boolean
  modelNumber: string
  serial?: string
  rma?: string
  po?: string
  notes?: string
  customerName?: string
  customerEmail?: string
  submittedBy: string
  submittedOn?: string
}

export interface IRGAGood {
  partitionKey: string // id
  sortKey: string
  indexSortKey: string // productId#modelNumber
  id: string
  warrantied: boolean
  symptomId: string
  rgaId: string
  productId: string
  lotted: boolean
  modelNumber: string
  serial?: string
  rma?: string
  po?: string
  notes?: string
  customerName?: string
  customerEmail?: string
  submittedBy: string
  submittedOn: string
}

export interface IRGAGoodOutput {
  id: string
  warrantied: boolean
  symptomId: string
  rgaId: string
  productId: string
  lotted: boolean
  modelNumber: string
  serial?: string
  rma?: string
  po?: string
  notes?: string
  customerName?: string
  customerEmail?: string
  submittedBy: string
  submittedOn: string
}

/**
 * Generates a new RGAGood model in the database provided the supplied input is valid.
 * @param input The identifying input to assign to the RGAGood.
 */
const create = async ({
  serial,
  rgaId,
  submittedOn,
  ...good
}: IRGAGoodInput): Promise<IRGAGood> => {
  const partitionKey = rgaId
  const id = serial || uuid()
  const indexSortKey = `${good.productId}:${good.modelNumber}`
  const item: IRGAGood = {
    ...good,
    id,
    indexSortKey,
    partitionKey,
    rgaId,
    serial: id,
    sortKey: `${SECONDARY_KEY}_${id}`,
    submittedOn: submittedOn || new Date().toISOString()
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: "attribute_not_exists(sortKey)",
          Item: {
            ...filterBlankAttributes(item),
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
 * Retreives a good for a specific RGA / Serial combo.
 * @param serialOrUuid The serial or UUID used to look up the good.
 */
const find = async (rgaId: string, id: string): Promise<IRGAGood | null> => {
  const searchParams = {
    Key: {
      partitionKey: rgaId,
      sortKey: `${SECONDARY_KEY}_${id}`,
    },
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.get(searchParams).promise()
  return result.Item ? (result.Item as IRGAGood) : null
}

/**
 * Retreives a list of all goods for a specific RGA.
 * @param rgaId The unique id of the RGA to search for goods of.
 */
const forRGA = async (rgaId: string): Promise<IRGAGood[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":pkey": rgaId,
      ":rkey": SECONDARY_KEY,
    },
    KeyConditionExpression: "partitionKey = :pkey and begins_with(sortKey, :rkey)",
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IRGAGood[]) : []
}


/**
 * Deletes an RGA good for a given request.
 * @param id The UUID of the product to delete.
 */
const destroy = async (rgaId: string, id: string): Promise<boolean> => {
  try {
    const good = await find(rgaId, id)
    if (!good) {
      return false
    }
    const params = {
      TransactItems: [
        {
          Delete: {
            Key: { partitionKey: good.partitionKey, sortKey: good.sortKey },
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
 * Converts an RGAGood record to public output that can be consumed
 * by the API.
 */
const output = ({
  partitionKey,
  sortKey,
  indexSortKey,
  ...rgaGood
}: IRGAGood): IRGAGoodOutput => {
  const result = {
    ...rgaGood,
    id: rgaGood.id,
  }
  return result
}

export const RGAGood = {
  SECONDARY_KEY,
  create,
  destroy,
  find,
  forRGA,
  output,
}
