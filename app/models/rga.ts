import { padStart } from 'lodash'
import { DateTime } from 'luxon'
import { RgaStatus } from '../schema'
import { filterBlankAttributes, getDynamoClient } from '../util'

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
 * ------------------------------------------------------------------------------------------------
 * |                    | (GS1 Partition Key)   | (GS1 Sort Key)      | (GS2 Sort Key)
 * ------------------------------------------------------------------------------------------------
 * | Partition Key      | Sort Key              | HSK                 | SHSK
 * ------------------------------------------------------------------------------------------------
 * | RGA-ID             | "RGA"                 | Status#SubmittedOn  | distributorId#SubmittedOn
 * ------------------------------------------------------------------------------------------------
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

const SECONDARY_KEY = 'RGA'

const client = getDynamoClient()

export interface IRGAInput {
  id?: string
  status: RgaStatus
  distributorId: string
  submittedBy: string
  submittedOn: string
}

interface IUserUpdate {
  id: string
  name: string
  email: string
}

export interface IRGAStatusInput {
  id: string
  status: RgaStatus
  notes?: string
  updatedBy: IUserUpdate
}

interface IRGAStatusLogEntry {
  notes?: string
  updatedBy: IUserUpdate
  updatedOn: string
}

type IRGAStatusLog = { [key in RgaStatus]: IRGAStatusLogEntry }

export interface IRGA {
  partitionKey: string // id
  sortKey: string
  indexSortKey: string // status#submittedOn
  secondaryIndexSortKey: string // distributorId#submittedOn
  status: RgaStatus
  distributorId: string
  submittedBy: string
  submittedOn: string
  statusLog?: IRGAStatusLog
}

export interface IRGAOutput {
  id: string
  distributorId: string
  status: RgaStatus
  submittedBy: string
  submittedOn: string
}

const DATE_FORMAT = "MMddyyyy'MR'-mmssSSS"

const generateDate = (isoString?: string) =>
  (isoString ? DateTime.fromISO(isoString) : DateTime.utc()).toFormat(
    DATE_FORMAT
  )
const randomPaddedTwoDigit = () =>
  padStart(`${Math.round(Math.random() * 99)}`, 2, '0')
const generateId = (dateString: string) =>
  `${generateDate(dateString)}${randomPaddedTwoDigit()}`

/**
 * Generates a new RGA model in the database provided the supplied credentials are valid.
 * @param credentials The identifying inputs to assign to the RGA.
 */
const create = async ({
  id,
  submittedOn,
  ...rgaInput
}: IRGAInput): Promise<IRGA> => {
  const partitionKey = await generateId(submittedOn)
  const item: IRGA = {
    ...rgaInput,
    indexSortKey: [RgaStatus.Issued, submittedOn].join('#'),
    partitionKey,
    secondaryIndexSortKey: [rgaInput.distributorId, submittedOn].join('#'),
    sortKey: SECONDARY_KEY,
    submittedOn,
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: 'attribute_not_exists(partitionKey)',
          Item: {
            ...filterBlankAttributes(item),
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
 * Updates an existing RGA model in the database provided the supplied credentials are valid.
 * @param input The identifying inputs to assign to the RGA.
 */
const update = async ({
  id,
  submittedOn,
  ...rgaInput
}: IRGAInput): Promise<IRGA> => {
  const existing = await find(id)
  const item: IRGA = {
    ...existing,
    ...rgaInput,
    indexSortKey: [rgaInput.status, existing.submittedOn].join('#'),
    sortKey: SECONDARY_KEY,
    submittedBy: existing.submittedBy,
    submittedOn: existing.submittedOn,
  }
  const params = {
    TransactItems: [
      {
        Put: {
          Item: {
            ...filterBlankAttributes(item),
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
 * Updates the status of an existing RGA model in the database provided the supplied ID is valid.
 * @param input The identifying inputs to assign to the RGA.
 */
const updateStatus = async ({
  id,
  status,
  notes,
  updatedBy,
}: IRGAStatusInput): Promise<IRGA> => {
  const existing = await find(id)
  const statusLog = existing.statusLog || ({} as IRGAStatusLog)
  const updatedOn = new Date().toISOString
  const item: IRGA = {
    ...existing,
    indexSortKey: [status, existing.submittedOn].join('#'),
    sortKey: SECONDARY_KEY,
    status,
    statusLog: {
      ...statusLog,
      [status]: {
        notes: notes || 'N/A',
        updatedBy,
        updatedOn,
      },
    },
  }
  const params = {
    TransactItems: [
      {
        Put: {
          Item: {
            ...filterBlankAttributes(item),
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
 * Retreives a RGAs configuration by its ID.
 * @param id The ID of the RGAs to find.
 */
const find = async (id: string): Promise<IRGA | null> => {
  const searchParams = {
    Key: {
      partitionKey: id,
      sortKey: SECONDARY_KEY,
    },
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.get(searchParams).promise()
  return result.Item ? (result.Item as IRGA) : null
}

/**
 * Retreives a list of all RGAs.
 */
const all = async (): Promise<IRGA[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':rkey': SECONDARY_KEY,
    },
    IndexName: 'GSI_1',
    KeyConditionExpression: 'sortKey = :rkey',
    ScanIndexForward: false,
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IRGA[]) : []
}

/**
 * Retreives a list of all RGAs for a given status.
 * @param status The status to filter by.
 */
const findWithStatus = async (status: RgaStatus): Promise<IRGA[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':hkey': SECONDARY_KEY,
      ':rkey': status,
    },
    IndexName: 'GSI_1',
    KeyConditionExpression:
      'sortKey = :hkey AND begins_with(indexSortKey, :rkey)',
    ScanIndexForward: false,
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IRGA[]) : []
}

/**
 * Retreives the count of all RGAs for a given status.
 * @param status The status to filter by.
 */
const countWithStatus = async (status: RgaStatus): Promise<number> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':hkey': SECONDARY_KEY,
      ':rkey': status,
    },
    IndexName: 'GSI_1',
    KeyConditionExpression:
      'sortKey = :hkey AND begins_with(indexSortKey, :rkey)',
    ScanIndexForward: false,
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Count
}

/**
 * Retreives a list of all RGAs submitted for a specified date.
 */
const submittedOnDate = async (isoString: string): Promise<IRGA[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ':maxDate': DateTime.fromISO(isoString)
        .endOf('day')
        .toISO(),
      ':minDate': DateTime.fromISO(isoString)
        .startOf('day')
        .toISO(),
      ':rkey': SECONDARY_KEY,
    },
    IndexName: 'GSI_1',
    KeyConditionExpression:
      'sortKey = :rkey and indexSortKey BETWEEN :minDate and :maxDate',
    ScanIndexForward: false,
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
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
    status: rga.status || RgaStatus.Issued,
  }
  return result
}

export const RGA = {
  SECONDARY_KEY,
  all,
  countWithStatus,
  create,
  destroy,
  find,
  findWithStatus,
  output,
  submittedOnDate,
  update,
  updateStatus,
}
