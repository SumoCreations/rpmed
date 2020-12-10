import * as email from '../../email'
import { RGAGood } from '../../models'
import { PdfJobParams } from './types'

const adminEmail = 'MedLED@rpmed.com'

/**
 * Sends a confirmation email with a service form
 * to any admin addresses associated to a given RGA Good.
 * @param event An incoming request from the AWS SNS
 */
export const confirmServiceLetter = async ({
  key,
  rgaId,
  rgaGoodId,
}: PdfJobParams) => {
  try {
    const good = await RGAGood.find(rgaId, rgaGoodId)
    const serviceFormUrl = await RGAGood.generateServiceLetterUrl(good)
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
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log(e)
  }
}
