import { SNSHandler, S3Handler } from 'aws-lambda'
import { confirmRgaGoodPdf, perform } from './jobs'

/**
 * Process any incomming events from our PDF generation service.
 */
export const handlePDF: S3Handler = async (event, context, callback) => {
  console.log(event)
  console.log(event.Records[0])
  await confirmRgaGoodPdf(event, context, callback)
}

/**
 * Process any incomming background jobs.
 * @param event An event object from AWS SNS.
 */
export const handleJob: SNSHandler = async event => {
  const params = JSON.parse(event.Records[0].Sns.Message)
  await perform(params.jobType, params)
}
