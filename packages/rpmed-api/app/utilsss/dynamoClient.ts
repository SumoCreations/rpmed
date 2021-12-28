import * as AWS from 'aws-sdk'
import { isOffline } from './isOffline'

/**
 * A convenience method to retrieve a DynamoDB client with an offline
 * configuration for development testing.
 */
export const getDynamoClient = () =>
  isOffline()
    ? new AWS.DynamoDB.DocumentClient({
        accessKeyId: 'access-key',
        endpoint: 'http://localhost:8000',
        region: 'local-env',
        secretAccessKey: 'secret-key',
      })
    : new AWS.DynamoDB.DocumentClient()
