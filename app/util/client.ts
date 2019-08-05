import * as AWS from "aws-sdk"

export const isOffline = () => process.env.IS_OFFLINE === "true"

export const getS3 = () => isOffline() ? new AWS.S3({
  accessKeyId: "AKIAWGRSBMEEDQRPXZTT",
  region: "us-west-2",
  secretAccessKey: "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",
  signatureVersion: 'v4'
}) : new AWS.S3({ signatureVersion: 'v4' })

export const getS3Bucket = () => isOffline() ? "rpmed-dev-uploads" : process.env.ATTACHED_IMAGES_BUCKET

export const getClient = () =>
  isOffline()
    ? new AWS.DynamoDB.DocumentClient({
      accessKeyId: "MOCK_ACCESS_KEY_ID",
      endpoint: "http://localhost:8000",
      region: "localhost",
      secretAccessKey: "MOCK_SECRET_ACCESS_KEY",
    })
    : new AWS.DynamoDB.DocumentClient()

export const resetTable = async (
  tableName: string,
  key: (i: any) => { [key: string]: any }
) => {
  try {
    const params = {
      TableName: tableName,
    }
    const client = getClient()
    const results = await client.scan(params).promise()
    const requests = results.Items.map(async i => {
      const deleteParams = {
        Key: key(i),
        TableName: tableName,
      }
      await client.delete(deleteParams).promise()
    })

    await Promise.all(requests)
  } catch (e) {
    // tslint:disable
    console.log(`Could not reset table: ${tableName}`)
    console.log(e)
    // tslint:enable
    return
  }
}

export const resetTestTables = async () => {
  resetTable(process.env.DYNAMODB_USER_LOOKUP_TABLE, i => ({
    email: i.email,
  }))
  resetTable(process.env.DYNAMODB_ACCOUNTS_TABLE, i => ({
    partitionKey: i.partitionKey,
    sortKey: i.sortKey
  }))
  resetTable(process.env.DYNAMODB_TOKEN_LOOKUP_TABLE, i => ({
    id: i.id,
  }))
}