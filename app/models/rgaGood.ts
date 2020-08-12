import { v4 as uuid } from 'uuid'
import { FeeStructure, RgaGoodStatus, RgaStatus } from '../schema'
import {
  filterBlankAttributes,
  getDynamoClient,
  getS3Client,
  getSNSClient,
} from '../util'

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
 * ----------------------------------------------------------------------
 * |                    | (GS1 Partition Key)   | (GS1 Sort Key)
 * ----------------------------------------------------------------------
 * | Partition Key      | Sort Key              | HSK
 * ----------------------------------------------------------------------
 * | RGA-ID             | GOOD#Serial           | ProductId#ModelNumber
 * ----------------------------------------------------------------------
 *
 * This allows for the following access patterns:
 *
 * 1. Fetch any RGA by unique composite ID (PK + SK).
 * 2. Fetch all RGAs (PK matches RGA-ID and SK begins with 'GOOD#')
 * 3. Look up all RGA goods for an associated serial number (SK matches GOOD#Serial)
 * 4. Look up all RGA goods for an associated product (HSK beginsWith ProductId)
 * 5. Look up all RGA goods for an associated model number (HSK matches ProductId#ModelNumber)
 */

const SECONDARY_KEY = 'GOOD'

const client = getDynamoClient()
const sns = getSNSClient()
const s3 = getS3Client()

export interface IRGAGoodBase {
  faultCode?: string
  rgaId: string
  lotted?: boolean
  preApproved?: boolean
  modelNumber?: string
  status?: RgaGoodStatus
  serial?: string
  rma?: string
  po?: string
  notes?: string
  productType?: string
  productId?: string
  productName?: string
  customerId?: string
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  customerStreet?: string
  customerStreet2?: string
  customerCity?: string
  customerState?: string
  customerZip?: string
  customerCountry?: string
  resolution?: string
  resolutionFee?: FeeStructure
  symptomId?: string
  symptomDescription?: string
  symptomSynopsis?: string
  symptomSolution?: string
  submittedBy: string
  submittedOn: string
  warrantied?: boolean
  warrantyTerm?: number
  warrantyDescription?: string
}

export interface IRGAGoodInput extends IRGAGoodBase {
  id?: string
}

export interface IRGAGood extends IRGAGoodBase {
  partitionKey: string // rgaId
  sortKey: string // good#serial
  indexSortKey: string // productId#modelNumber
  id: string
}

export interface IRGAGoodOutput extends IRGAGoodBase {
  id: string
}

export enum RGAGoodDocumentType {
  CustomerLetter = 'customer-letter',
  ServiceForm = 'service-form',
}

/**
 * Generates a new RGAGood model in the database provided the supplied input is valid.
 * @param input The identifying input to assign to the RGAGood.
 */
const create = async ({
  lotted,
  serial,
  rgaId,
  submittedOn,
  ...good
}: IRGAGoodInput): Promise<IRGAGood> => {
  const partitionKey = rgaId
  const id = lotted ? serial : uuid()
  const indexSortKey = `${good.productId}#${good.modelNumber}`
  const item: IRGAGood = {
    ...good,
    id,
    indexSortKey,
    lotted,
    partitionKey,
    rgaId,
    serial: id,
    sortKey: `${SECONDARY_KEY}#${id}`,
    status: RgaGoodStatus.Valid,
    submittedOn: submittedOn || new Date().toISOString(),
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: 'attribute_not_exists(sortKey)',
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
 * Updates an existing RGAGood model in the database provided the supplied input is valid.
 * @param input The identifying input to assign to the RGAGood.
 */
const update = async ({
  id,
  lotted,
  serial,
  rgaId,
  submittedOn,
  ...good
}: IRGAGoodInput): Promise<IRGAGood> => {
  const existing = await find(rgaId, id)
  const partitionKey = rgaId
  const item: IRGAGood = {
    ...existing,
    ...good,
    indexSortKey: `${good.productId}#${good.modelNumber}`,
    partitionKey,
    rgaId,
    status: RgaGoodStatus.Valid,
    submittedOn: submittedOn || new Date().toISOString(),
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
 * Retreives a good for a specific RGA / Serial combo.
 * @param serialOrUuid The serial or UUID used to look up the good.
 */
const find = async (rgaId: string, id: string): Promise<IRGAGood | null> => {
  const searchParams = {
    Key: {
      partitionKey: rgaId,
      sortKey: `${SECONDARY_KEY}#${id}`,
    },
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
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
      ':pkey': rgaId,
      ':rkey': SECONDARY_KEY,
    },
    KeyConditionExpression:
      'partitionKey = :pkey and begins_with(sortKey, :rkey)',
    TableName: process.env.DYNAMODB_RESOURCES_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IRGAGood[]) : []
}

const generateServiceLetter = async (
  rgaGood: IRGAGood,
  rgaStatus: RgaStatus,
  token: string
) => {
  try {
    const clientUrl = `https://${
      process.env.CLIENT_DOMAIN
    }/admin/rga/${rgaStatus}/${rgaGood.rgaId}/service-form/${rgaGood.id}`
    // tslint:disable-next-line no-console
    console.log(`publishing SERVICE FORM to SNS ${clientUrl}`)
    await sns
      .publish({
        Message: JSON.stringify({
          clientUrl,
          cookies: [
            {
              name: 'ACCESS_TOKEN',
              value: `Bearer ${token}`,
            },
          ],
          jobId: `${RGAGoodDocumentType.ServiceForm}#${rgaGood.rgaId}#${
            rgaGood.id
          }`,
          key: `${RGAGoodDocumentType.ServiceForm}-${rgaGood.rgaId}-${
            rgaGood.id
          }.pdf`,
          margin: {
            bottom: '0.075in',
            left: '0.05in',
            right: '0.05in',
            top: '0.075in',
          },
          pageRanges: '1',
          printBackground: true,
          successNotificationArn: process.env.PDF_CONFIRMATION_TOPIC_ARN,
          type: 'pdf',
          waitForSelector: '#serviceFormLogo',
        }),
        TopicArn: process.env.PDF_RENDER_TOPIC_ARN,
      })
      .promise()
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log('error publishing')
    // tslint:disable-next-line no-console
    console.log(e)
  }
}

const generateCustomerLetter = async (
  rgaGood: IRGAGood,
  rgaStatus: RgaStatus,
  token: string
) => {
  try {
    const clientUrl = `https://${
      process.env.CLIENT_DOMAIN
    }/admin/rga/${rgaStatus}/${rgaGood.rgaId}/service-form/${rgaGood.id}`
    // tslint:disable-next-line no-console
    console.log(`publishing LETTER to SNS ${clientUrl}`)
    await sns
      .publish({
        Message: JSON.stringify({
          clientUrl,
          cookies: [
            {
              name: 'ACCESS_TOKEN',
              value: `Bearer ${token}`,
            },
          ],
          jobId: `${RGAGoodDocumentType.CustomerLetter}#${rgaGood.rgaId}#${
            rgaGood.id
          }`,
          key: `${RGAGoodDocumentType.CustomerLetter}-${rgaGood.rgaId}-${
            rgaGood.id
          }.pdf`,
          margin: {
            bottom: '0.075in',
            left: '0.05in',
            right: '0.05in',
            top: '0.075in',
          },
          pageRanges: '2',
          printBackground: true,
          successNotificationArn: process.env.PDF_CONFIRMATION_TOPIC_ARN,
          type: 'pdf',
          waitForSelector: '#customerLetterLogo',
        }),
        TopicArn: process.env.PDF_RENDER_TOPIC_ARN,
      })
      .promise()
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log('error publishing')
    // tslint:disable-next-line no-console
    console.log(e)
  }
}

const generateServiceLetterUrl = async (
  rgaGood: IRGAGood,
  rgaStatus: RgaStatus,
  token?: string
) => {
  const params = {
    Bucket: process.env.PDF_RENDER_BUCKET,
    Key: `service-form-${rgaGood.rgaId}-${rgaGood.id}.pdf`,
  }
  console.log('Looking up service letter url...')
  try {
    const head = await s3.headObject(params).promise()
    console.log(head)
  } catch (err) {
    // tslint:disable-next-line no-console
    console.log(err)
    if (!token) {
      // tslint:disable-next-line no-console
      console.log(
        `Aborting render of service letter. Token was not supplied (${token})`
      )
      return null
    }
    if (
      [RgaStatus.Assessing, RgaStatus.Shipping, RgaStatus.Closed].includes(
        rgaStatus
      )
    ) {
      await generateServiceLetter(rgaGood, rgaStatus, token)
    }
    return null
  }
  // tslint:disable-next-line no-console
  console.log('Fetching signed url:')
  console.log(params)
  return s3.getSignedUrl('getObject', params)
}

const generateCustomerLetterUrl = async (
  rgaGood: IRGAGood,
  rgaStatus: RgaStatus,
  token?: string
) => {
  const params = {
    Bucket: process.env.PDF_RENDER_BUCKET,
    Key: `customer-letter-${rgaGood.rgaId}-${rgaGood.id}.pdf`,
  }
  try {
    await s3.headObject(params).promise()
  } catch (err) {
    // tslint:disable-next-line no-console
    console.log(err)
    if (!token) {
      // tslint:disable-next-line no-console
      console.log(
        `Aborting render of customer letter. Token was not supplied (${token})`
      )
      return null
    }
    if (
      [RgaStatus.Assessing, RgaStatus.Shipping, RgaStatus.Closed].includes(
        rgaStatus
      )
    ) {
      await generateCustomerLetter(rgaGood, rgaStatus, token)
    }
    return null
  }
  return s3.getSignedUrl('getObject', params)
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
 * Converts an RGAGood record to public output that can be consumed
 * by the API.
 */
const output = ({
  partitionKey,
  sortKey,
  indexSortKey,
  ...rgaGood
}: IRGAGood): IRGAGoodOutput => ({
  ...rgaGood,
  id: rgaGood.id,
  lotted:
    typeof rgaGood.lotted === 'boolean'
      ? rgaGood.lotted
      : (rgaGood.serial && rgaGood.serial.length > 0) || false,
  status: rgaGood.status || RgaGoodStatus.Valid,
  warrantyDescription: rgaGood.warrantyDescription || 'n/a',
})

export const RGAGood = {
  SECONDARY_KEY,
  create,
  destroy,
  find,
  forRGA,
  generateCustomerLetter,
  generateCustomerLetterUrl,
  generateServiceLetter,
  generateServiceLetterUrl,
  output,
  update,
}
