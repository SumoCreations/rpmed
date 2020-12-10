import { SNSHandler } from 'aws-lambda'
import { confirmRgaGoodPdf } from './jobs'

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
  console.log(event)
}
