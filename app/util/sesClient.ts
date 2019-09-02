import * as AWS from "aws-sdk"
import { defaultOfflineConfig } from "./defaultOfflineConfig"
import { isOffline } from "./isOffline"

/**
 * A convenience method to retrieve an S3 client with an offline
 * configuration for development testing.
 */
export const getSESClient = () =>
  isOffline()
    ? new AWS.SES({ ...defaultOfflineConfig, region: "us-west-2" })
    : new AWS.SES({ region: "us-west-2" })
