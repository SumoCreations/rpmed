import { v4 as uuid } from "uuid"
import { filterBlankAttributes, getClient } from "../util"
import AttachedImage, {
  AttachedImageStatus,
  IAttachedImage,
} from "./attachedImage"

/**
 * Dynamo DB Model:
 * PRODUCT SYMPTOM
 * ==========================================================
 *
 * This model represents a product troubleshooting symptom applicable
 * to a product or set of products.
 *
 * The table structure in dynamo DB is as follows:
 *
 * ----------------------------------------------------------------------
 * |                    | (GS1 Partition Key) | (GS1 Sort Key)
 * ----------------------------------------------------------------------
 * | Partition Key      | Sort Key            | HSK
 * ----------------------------------------------------------------------
 * | UUID               | "PRODUCT_SYMPTOM"   | faultCode
 * ----------------------------------------------------------------------
 *
 * This allows for the following access patterns:
 *
 * 1. Fetch a symptom via serial number (PK matches UUID Number)
 * 2. Fetch all product symptoms (Sort Key matches 'PRODUCT_SYMPTOM')
 * 3. Fetch all product symptoms for a given product (HSK matchs faultCode)
 */

const client = getClient()

const SECONDARY_KEY = "PRODUCT_SYMPTOM"

export interface IProductSymptomInput {
  careTip?: string
  faultCode: string
  fee: boolean
  id?: string
  name: string
  preApproved: boolean
  synopsis: string
  solution: string
  attachedImages?: IAttachedImage[]
}

export interface IProductSymptom {
  careTip?: string
  faultCode: string
  fee: boolean
  name: string
  synopsis: string
  solution: string
  partitionKey: string
  preApproved: boolean
  sortKey: string
  modelNumbers: string[]
  attachedImages: IAttachedImage[]
}

export interface IProductSymptomOutput {
  attachedImages: Promise<IAttachedImage[]>
  careTip?: string
  faultCode: string
  fee: boolean
  id: string
  name: string
  preApproved: boolean
  synopsis: string
  solution: string
}

/**
 * Generates a new symptom model in the database provided the supplied credentials are valid.
 * @param symptomInput The identifying symptomInput to assign to the account.
 */
const create = async ({
  id,
  ...symptomInput
}: IProductSymptomInput): Promise<IProductSymptom> => {
  const item: IProductSymptom = {
    ...symptomInput,
    attachedImages: [],
    modelNumbers: [],
    partitionKey: uuid(),
    sortKey: SECONDARY_KEY,
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: "attribute_not_exists(partitionKey)",
          Item: {
            ...filterBlankAttributes(item),
            indexSortKey: symptomInput.faultCode,
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
 * Generates a new symptom model in the database provided the supplied credentials are valid.
 * @param symptomInput An object representing the symptomInput to replace the supplied object.
 */
const update = async ({
  id,
  ...symptomInput
}: IProductSymptomInput): Promise<IProductSymptom> => {
  const existingItem = await find(id)
  const item: IProductSymptom = {
    ...existingItem,
    ...symptomInput,
  }
  const params = {
    TransactItems: [
      {
        Put: {
          ConditionExpression: "attribute_exists(partitionKey)",
          Item: {
            ...filterBlankAttributes(item),
            indexSortKey: symptomInput.faultCode,
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
 * Retreive a symptom by serial / uuid.
 * @param uuid The uuid of the product to find.
 */
const find = async (id: string): Promise<IProductSymptom | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":pk": id,
      ":rkey": SECONDARY_KEY,
    },
    KeyConditionExpression: "partitionKey = :pk and sortKey = :rkey",
    Limit: 1,
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items[0] ? (result.Items[0] as IProductSymptom) : null
}

/**
 * Retreive a symptom by serial / uuid.
 * @param ids An array of specific uuids of symptoms to find.
 */
const findAll = async (ids: string[]): Promise<IProductSymptom[]> => {
  const searchParams = {
    RequestItems: {
      [process.env.DYNAMODB_ACCOUNTS_TABLE]: {
        Keys: [
          ...ids.map(symptom => ({
            partitionKey: symptom,
            sortKey: SECONDARY_KEY,
          })),
        ],
      },
    },
  }
  const result = await client.batchGet(searchParams).promise()
  return (
    (result.Responses[
      process.env.DYNAMODB_ACCOUNTS_TABLE
    ] as IProductSymptom[]) || []
  )
}

/**
 * Retreive a symptom by faultCode.
 * @param faultCode The faultCode of the product to find.
 */
const findByFaultCode = async (
  faultCode: string
): Promise<IProductSymptom | null> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":indexSortKey": faultCode,
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "sortKey = :rkey and indexSortKey = :indexSortKey",
    Limit: 1,
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items[0] ? (result.Items[0] as IProductSymptom) : null
}

/**
 * Retreives a list of all product symptoms.
 */
const all = async (): Promise<IProductSymptom[]> => {
  const searchParams = {
    ExpressionAttributeValues: {
      ":rkey": SECONDARY_KEY,
    },
    IndexName: "GSI_1",
    KeyConditionExpression: "sortKey = :rkey",
    TableName: process.env.DYNAMODB_ACCOUNTS_TABLE,
  }
  const result = await client.query(searchParams).promise()
  return result.Items ? (result.Items as IProductSymptom[]) : []
}

/**
 * Deletes a symptom and associated child objects from the
 * database via UUID.
 * @param id The UUID of the product to delete.
 */
const destroy = async (id: string): Promise<boolean> => {
  const symptom = await find(id)
  try {
    if (!symptom) {
      return false
    }
    const params = {
      TransactItems: [
        {
          Delete: {
            Key: { partitionKey: id, sortKey: symptom.sortKey },
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
 * Merges an attached image to a product symptom.
 */
export const mergeImages = async (
  symptom: IProductSymptom,
  newImages: IAttachedImage[]
): Promise<IProductSymptom> => {
  const newIds = (newImages || []).map(i => i.id)
  const existingImages = (symptom.attachedImages || []).filter(
    i => !newIds.includes(i.id)
  )
  const attachedImages = [...existingImages, ...newImages]
  return await update({ ...output(symptom), attachedImages })
}

/**
 * Converts a productSymptom record to public output that can be consumed
 * by the API.
 */
const output = ({
  partitionKey,
  sortKey,
  ...productSymptom
}: IProductSymptom): IProductSymptomOutput => {
  const result = {
    ...productSymptom,
    associatedModelNumbers: productSymptom.modelNumbers || [],
    attachedImages: Promise.all(
      (productSymptom.attachedImages || [])
        .filter(i => i.status !== AttachedImageStatus.Pending)
        .map(AttachedImage.output)
    ),
    id: partitionKey,
    preApproved: productSymptom.preApproved || false,
  }
  return result
}

export const ProductSymptom = {
  SECONDARY_KEY,
  all,
  create,
  destroy,
  find,
  findAll,
  findByFaultCode,
  output,
  update,
}
