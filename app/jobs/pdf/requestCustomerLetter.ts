import { getSNSClient } from '../../util'
import { RGAGood } from '../../models'
import { RgaStatus } from '../../schema'
import { RGAGoodDocumentType } from './types'
import * as oauth from '../../oauth'

const sns = getSNSClient()

export const requestCustomerLetter = async (
  rgaId: string,
  rgaGoodId: string,
  rgaStatus: RgaStatus
) => {
  try {
    const rgaGood = await RGAGood.find(rgaId, rgaGoodId)
    const { token } = await oauth.generate({ userId: 'admin' })
    const clientUrl = `https://${
      process.env.CLIENT_DOMAIN
    }/admin/rga/${rgaStatus}/${rgaGood.rgaId}/service-form/${rgaGood.id}`
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
          jobId: `${RGAGoodDocumentType.CustomerLetter}#${rgaGood.rgaId}#${
            rgaGood.id
          }`,
          key: `${RGAGoodDocumentType.CustomerLetter}-${rgaGood.rgaId}-${
            rgaGood.id
          }.pdf`,
          margin: {
            bottom: '0.075in',
            left: '0.05in',
            right: '0.05in',
            top: '0.075in',
          },
          pageRanges: '2',
          printBackground: true,
          successNotificationArn: process.env.PDF_CONFIRMATION_TOPIC_ARN,
          type: 'pdf',
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
