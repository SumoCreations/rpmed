import { getSNSClient } from '../util'
import { BackgroundJob } from './types'

/**
 * Dispatches a job to be executed via an SNS event.
 * @param jobType The name of the job to trigger.
 * @param params Any parameters that will be passed as a JSON string to the SNS message.
 */
export const dispatch = async (jobType: BackgroundJob, params: object) => {
  if (process.env.stage === 'TEST') {
    return
  }
  const client = getSNSClient()
  await client
    .publish({
      TopicArn: process.env.SNS_EXECUTE_BACKGROUND_JOB,
      Message: JSON.stringify({ jobType, ...params }),
    })
    .promise()
}
