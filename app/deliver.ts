import { SNSHandler } from 'aws-lambda'
import * as email from './email'
import { RGA, RGAGood, RGAGoodDocumentType } from './models'

const adminEmail = 'MedLED@rpmed.com'

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
    const rga = await RGA.find(rgaId)
    const good = await RGAGood.find(rgaId, rgaGoodId)
    switch (documentType as RGAGoodDocumentType) {
      case RGAGoodDocumentType.CustomerLetter:
        const letterUrl = await RGAGood.generateCustomerLetterUrl(
          good,
          rga.status
        )
        if (good.customerEmail) {
          // await email.send({
          //   attachments: [
          //     {
          //       filename: key,
          //       path: letterUrl,
          //     },
          //   ],
          //   subject: '[MedLED] Return Status',
          //   template: email.Template.RgaGoodCustomerLetter,
          //   to: [
          //     `${good.customerName || 'RPMed Customer'} <${
          //       good.customerEmail
          //     }>`,
          //   ],
          //   variables: {
          //     firstName: good.customerName || 'Valued Customer',
          //     rga: good.rgaId || 'n/a',
          //     rma: good.rma || 'n/a',
          //   },
          // })
        }
        await email.send({
          attachments: [
            {
              filename: key,
              path: letterUrl,
            },
          ],
          subject: `[RGA][${good.rgaId}] Customer Letter`,
          template: email.Template.RgaGoodCustomerLetter,
          to: [`${'RPMed'} <${adminEmail}>`],
          variables: {
            documentDescription: `Customer Letter - ${good.rgaId}`,
            rga: good.rgaId || 'n/a',
            rma: good.rma || 'n/a',
          },
        })
        return
      case RGAGoodDocumentType.ServiceForm:
        const serviceFormUrl = await RGAGood.generateServiceLetterUrl(
          good,
          rga.status
        )
        await email.send({
          attachments: [
            {
              filename: key,
              path: serviceFormUrl,
            },
          ],
          subject: `[RGA][${good.rgaId}] Service Form Documentation`,
          template: email.Template.RgaGoodServiceForm,
          to: [`${'RPMed'} <${adminEmail}>`],
          variables: {
            documentDescription: `Service Form - ${good.rgaId}`,
            rga: good.rgaId || 'n/a',
            rma: good.rma || 'n/a',
          },
        })
        return
    }
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log(e)
  }
}
