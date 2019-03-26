import * as AWS from "aws-sdk"

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
    // tslint:disable-next-line
    console.log(e)
    return
  }
}
