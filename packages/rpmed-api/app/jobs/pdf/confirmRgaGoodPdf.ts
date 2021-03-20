import { S3Handler } from 'aws-lambda'
import { confirmCustomerLetter } from './confirmCustomerLetter'
import { confirmServiceLetter } from './confirmServiceLetter'
import { RGAGoodDocumentType } from './types'

/**
 * Sends a confirmation email with a customer service letter
 * and service form to any addresses associates to a given RGA Good.
 * @param event An incoming request from the AWS API Gateway
 */
export const confirmRgaGoodPdf: S3Handler = async event => {
  try {
    // tslint:disable-next-line no-console
    console.log(JSON.stringify(event))
    const { bucket, object } = event.Records[0].s3
    const rgaId = object.key.split('/')[0]
    const rgaGoodId = object.key.split('/')[1]
    const params = { key: object.key, bucket, rgaGoodId, rgaId }
    const documentType = params.key.includes('service-form')
      ? RGAGoodDocumentType.ServiceForm
      : RGAGoodDocumentType.CustomerLetter
    console.log(`Attempting to confirm '${documentType}' via params:`)
    console.log(params)
    switch (documentType as RGAGoodDocumentType) {
      case RGAGoodDocumentType.CustomerLetter:
        await confirmCustomerLetter(params)
        break
      case RGAGoodDocumentType.ServiceForm:
        await confirmServiceLetter(params)
        break
    }
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log(e)
  }
}
