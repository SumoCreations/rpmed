import { SNSHandler } from 'aws-lambda'
import { confirmRgaGoodPdf, perform } from './jobs'

/**
 * Process any incomming events from our PDF generation service.
 */
export const handlePDF: SNSHandler = async (event, context, callback) => {
  await confirmRgaGoodPdf(event, context, callback)
}

/**
 * Process any incomming background jobs.
 * @param event An event object from AWS SNS.
 */
export const handleJob: SNSHandler = async event => {
  console.log('Processing background job:')
  const params = JSON.parse(event.Records[0].Sns.Message)
  console.log(params)
  await perform(params.jobType, params)
}
