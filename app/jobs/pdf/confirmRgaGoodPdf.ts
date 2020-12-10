import { SNSHandler } from 'aws-lambda'
import { confirmCustomerLetter } from './confirmCustomerLetter'
import { confirmServiceLetter } from './confirmServiceLetter'
import { RGAGoodDocumentType } from './types'

/**
 * Sends a confirmation email with a customer service letter
 * and service form to any addresses associates to a given RGA Good.
 * @param event An incoming request from the AWS API Gateway
 */
export const confirmRgaGoodPdf: SNSHandler = async event => {
  try {
    // tslint:disable-next-line no-console
    console.log(JSON.stringify(event))
    const { jobId, key } = JSON.parse(event.Records[0].Sns.Message)
    const [documentType, rgaId, rgaGoodId] = jobId.split('#')
    switch (documentType as RGAGoodDocumentType) {
      case RGAGoodDocumentType.CustomerLetter:
        await confirmCustomerLetter({ key, rgaGoodId, rgaId })
        break
      case RGAGoodDocumentType.ServiceForm:
        await confirmServiceLetter({ key, rgaGoodId, rgaId })
        break
    }
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log(e)
  }
}
