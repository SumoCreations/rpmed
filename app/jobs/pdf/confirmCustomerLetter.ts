import * as email from '../../email'
import { RGAGood } from '../../models'
import { PdfJobParams } from './types'

const adminEmail = 'MedLED@rpmed.com'

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
    const letterUrl = await RGAGood.generateCustomerLetterUrl(good)
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
        variables: {
          firstName: good.customerName || 'Valued Customer',
          rga: good.rgaId || 'n/a',
          rma: good.rma || 'n/a',
        },
      })
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
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log(e)
  }
}
