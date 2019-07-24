import { padStart } from "lodash"
import { DateTime } from "luxon"
import { filterBlankAttributes, getClient } from "../util"

/**
 * Dynamo DB Model:
 * RGA
 * ==========================================================
 * 
 * This model represents an RGA request submitted by a partner
 * or distributor.
 * 
 * The table structure in dynamo DB is as follows:
 * 
 * --------------------------------------------------------------
 * |                    | (GS1 Partition Key)   | (GS1 Sort Key)
 * --------------------------------------------------------------
 * | Partition Key      | Sort Key              | HSK
 * --------------------------------------------------------------
 * | RGA-ID             | "RGA"                 | Status#SubmittedOn
 * --------------------------------------------------------------
 * 
 * This allows for the following access patterns:
 * 
 * 1. Fetch any RGA by unique ID.
 * 2. Fetch all RGAs (SK matches 'RGA')
 * 3. Fetch all RGAs for a given status (SK matches 'RGA' and HSK begins with Status)
 * 3. Look up all RGAs for a given status and date or date range (HSK matches Status#SubmittedOn)
 * 
 * The RGA-ID is a special type of UUID key utilizing the date, time, and some randomness:
 * 06212019MR-565583319
 * 06212019MR-293346429
 * 06212019MR-284397710
 * 
 */

const SECONDARY_KEY = "RGA"

const client = getClient()

export interface IRGAInput {
  id?: string
  distributorId: string
  submittedBy: string
  submittedOn: string
}

export interface IRGA {
  partitionKey: string // id
  sortKey: string
  indexSortKey: string // distributorId#submittedBy
  distributorId: string
  submittedBy: string
  submittedOn: string
}

export interface IRGAOutput {
  id: string
  distributorId: string
  submittedBy: string
  submittedOn: string
}

const DATE_FORMAT = "MMddyyyy'MR'-mmssSSS"

const generateDate = (isoString?: string) => (isoString ? DateTime.fromISO(isoString) : DateTime.utc()).toFormat(DATE_FORMAT)
const randomPaddedTwoDigit = () => padStart(`${Math.round(Math.random() * 99)}`, 2, '0')
const generateId = (dateString: string) => `${generateDate(dateString)}${randomPaddedTwoDigit()}`

/**
 * Generates a new RGA model in the database provided the supplied credentials are valid.
 * @param credentials The identifying credentials to assign to the RGA.
 */
const create = async ({
  id,
  submittedOn,
  ...rgaInput
}: IRGAInput): Promise<IRGA> => {
  const partitionKey = await generateId(submittedOn)
  const item: IRGA = {
    ...rgaInput,
    indexSortKey: submittedOn,
    partitionKey,
    sortKey: SECONDARY_KEY,
    submittedOn
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: "attribute_not_exists(partitionKey)",
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
 * Retreives a model number configuration by its ID.
 * @param id The ID of the model number to find.
 */
const find = async (id: string): Promise<IRGA | null> => {
  const searchParams = {
    Key: {
      partitionKey: id,
      sortKey: SECONDARY_KEY,
    },
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.get(searchParams).promise()
  return result.Item ? (result.Item as IRGA) : null
}

/**
 * Retreives a list of all model number configurations.
 */
const all = async (): Promise<IRGA[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "sortKey = :rkey",
    ScanIndexForward: false,
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IRGA[]) : []
}

/**
 * Retreives a list of all RGAs submitted for a specified date.
 */
const submittedOnDate = async (isoString: string): Promise<IRGA[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":maxDate": DateTime.fromISO(isoString).endOf("day").toISO(),
      ":minDate": DateTime.fromISO(isoString).startOf("day").toISO(),
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "sortKey = :rkey and indexSortKey BETWEEN :minDate and :maxDate",
    ScanIndexForward: false,
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IRGA[]) : []
}

/**
 * Deletes an RGA from the database via UUID.
 * @param id The UUID of the RGA to delete.
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
 * Converts an RGA record to public output that can be consumed
 * by the API.
 */
const output = ({
  partitionKey,
  sortKey,
  indexSortKey,
  ...rga
}: IRGA): IRGAOutput => {
  const result = {
    ...rga,
    id: partitionKey,
  }
  return result
}

export const RGA = {
  SECONDARY_KEY,
  all,
  create,
  destroy,
  find,
  output,
  submittedOnDate,
}
