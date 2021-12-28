import * as AWS from 'aws-sdk'
import { isOffline } from './isOffline'

// process.env.AWS_ACCESS_KEY_ID = 'access-key';
// process.env.AWS_SECRET_ACCESS_KEY = 'secret-key';
/**
 * A convenience method to retrieve a DynamoDB document client with an offline
 * configuration for development testing.
 */
export const getDynamoClient = () =>
  isOffline()
    ? new AWS.DynamoDB.DocumentClient({
        accessKeyId:
          process.env.STAGE === 'test' ? 'access-key' : 'MOCK_ACCESS_KEY_ID',
        endpoint: 'http://localhost:8000',
        region: process.env.STAGE === 'test' ? 'local-env' : 'localhost',
        secretAccessKey:
          process.env.STAGE === 'test' ? 'access-key' : 'MOCK_ACCESS_KEY_ID',
      })
    : new AWS.DynamoDB.DocumentClient()

/**
 * A convenience method to retrieve DynamoDB with an offline
 * configuration for development testing.
 */
export const getDynamo = () =>
  isOffline()
    ? new AWS.DynamoDB({
        accessKeyId: 'access-key',
        endpoint: 'http://localhost:8000',
        region: process.env.STAGE === 'test' ? 'local-env' : 'localhost',
        secretAccessKey:
          process.env.STAGE === 'test' ? 'secret-key' : 'MOCK_SECRET_KEY_ID',
      })
    : new AWS.DynamoDB()
