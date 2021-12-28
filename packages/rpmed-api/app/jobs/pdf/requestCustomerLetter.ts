import { getSNSClient } from 'api-utils'
import { RGAGood } from '../../models'
import { RgaStatus } from '../../schema'
import { PdfJobParams, RGAGoodDocumentType } from './types'
import * as oauth from '../../oauth'

const sns = getSNSClient()

export const requestCustomerLetter = async ({
  rgaId,
  rgaGoodId,
  force,
}: PdfJobParams) => {
  try {
    const rgaGood = await RGAGood.find(rgaId, rgaGoodId)
    const { token } = await oauth.generate({ userId: 'admin' })
    const clientUrl = `https://${process.env.CLIENT_DOMAIN}/admin/rga/${RgaStatus.Closed}/${rgaGood.rgaId}/service-form/${rgaGood.id}`
    // tslint:disable-next-line no-console
    console.log(`publishing LETTER to SNS ${clientUrl}`)
    await sns
      .publish({
        Message: JSON.stringify({
          clientUrl,
          cookies: [
            {
              name: 'ACCESS_TOKEN',
              value: `Bearer ${token}`,
            },
          ],
          force,
          jobId: `${RGAGoodDocumentType.CustomerLetter}#${rgaGood.rgaId}#${rgaGood.id}`,
          key: `${rgaGood.rgaId}/${rgaGood.id}/${RGAGoodDocumentType.CustomerLetter}-${rgaGood.rgaId}-${rgaGood.id}.pdf`,
          margin: {
            bottom: '0.075in',
            left: '0.05in',
            right: '0.05in',
            top: '0.075in',
          },
          pageRanges: '2',
          printBackground: true,
          bucketName: process.env.GENERATED_DOCUMENTS_BUCKET,
          type: 'pdf',
          waitUntil: 'networkIdle0',
          waitForSelector: '#customerLetterLogo',
        }),
        TopicArn: process.env.PDF_RENDER_TOPIC_ARN,
      })
      .promise()
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log('error publishing')
    // tslint:disable-next-line no-console
    console.log(e)
  }
}
