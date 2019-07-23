import * as AWS from "aws-sdk"

export const getS3 = () => !process.env.AWS_ACCESS_KEY_ID ? new AWS.S3({
  accessKeyId: "AKIAWGRSBMEEDQRPXZTT",
  region: "us-west-2",
  secretAccessKey: "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",
  signatureVersion: 'v4'
}) : new AWS.S3({ signatureVersion: 'v4' })

export const getClient = () =>
  !process.env.AWS_ACCESS_KEY_ID
    ? new AWS.DynamoDB.DocumentClient({
      accessKeyId: "DEFAULT_ACCESS_KEY",
      endpoint: "http://localhost:8000",
      region: "localhost",
      secretAccessKey: "DEFAUlT_SECRET",
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