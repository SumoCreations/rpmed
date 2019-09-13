import { getDynamoClient } from './dynamoClient'

/**
 * Uses the dynamo client to iterate and destroy all items in a table.
 * @param tableName The name of the dynamoDB table to reset.
 * @param key A callback used to generate the key which will be used to delete each individual item.
 */
export const resetTable = async (
  tableName: string,
  key: (i: any) => { [key: string]: any }
) => {
  try {
    const params = {
      TableName: tableName,
    }
    const client = getDynamoClient()
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
    // tslint:disable no-console
    console.log(`Could not reset table: ${tableName}`)
    console.log(e)
    // tslint:enable no-console
    return
  }
}
