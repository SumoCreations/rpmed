import * as AWS from "aws-sdk"
import { defaultOfflineConfig } from "./defaultOfflineConfig"

/**
 * A convenience method to retrieve an SNS client with an offline
 * configuration for development testing.
 */
export const getSNSClient = () =>
  !process.env.AWS_ACCESS_KEY_ID
    ? new AWS.SNS(defaultOfflineConfig)
    : new AWS.SNS()
