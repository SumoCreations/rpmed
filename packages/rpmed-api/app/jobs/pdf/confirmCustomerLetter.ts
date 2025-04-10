import * as email from '../../email'
import { RGAGood } from '../../models'
import { PdfJobParams } from './types'

/**
 * Sends a confirmation email with a customer service letter
 * to any addresses associates to a given RGA Good.
 * @param event An incoming request from the AWS SNS
 */
export const confirmCustomerLetter = async ({
  key,
  rgaId,
  rgaGoodId,
}: PdfJobParams) => {
  try {
    const good = await RGAGood.find(rgaId, rgaGoodId)
    const letterUrl = await RGAGood.generateCustomerLetterUrl(rgaId, rgaGoodId)
    if (good.customerEmail) {
      await email.send({
        attachments: [
          {
            filename: key,
            path: letterUrl,
          },
        ],
        subject: '[MedLED] Return Status',
        template: email.Template.RgaGoodCustomerLetter,
        to: [
          `${good.customerName || 'RPMed Customer'} <${good.customerEmail}>`,
        ],
        cc: [`${'RPMed'} <${process.env.ADMIN_EMAIL}>`],
        variables: {
          firstName: good.customerName || 'Valued Customer',
          rga: good.rgaId || 'n/a',
          rma: good.rma || 'n/a',
        },
      })
    }
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log(e)
  }
}
