import * as AWS from "aws-sdk"
import { isOffline } from "./isOffline"

/**
 * A convenience method to retrieve a DynamoDB client with an offline
 * configuration for development testing.
 */
export const getDynamoClient = () =>
  isOffline()
    ? new AWS.DynamoDB.DocumentClient({
        accessKeyId: "MOCK_ACCESS_KEY_ID",
        endpoint: "http://localhost:8000",
        region: "localhost",
        secretAccessKey: "MOCK_SECRET_ACCESS_KEY",
      })
    : new AWS.DynamoDB.DocumentClient()
