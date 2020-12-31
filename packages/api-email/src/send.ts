import { SES } from 'aws-sdk'
import { isEmail } from 'validator'
import { renderer } from './renderer'
import { EmailSendParams } from './types'

/**
 * Send an email via AWS SES.
 * @param params Describe attributes for an outgoing email.
 * @param client An instance of an AWS SES client preconfigured for the application.
 */
export const send = (
  params: EmailSendParams,
  client: SES
): Promise<SES.SendEmailResponse> => {
  const ToAddresses = [...params.to].filter((e) =>
    isEmail(e, { allow_display_name: true })
  )
  if (ToAddresses.length < 1) {
    throw new Error('No valid to addresses were provided.')
  }
  return new Promise((res, rej) => {
    client.sendEmail(
      {
        Destination: {
          BccAddresses: [...(params.bcc || [])].filter((e) => isEmail(e)),
          CcAddresses: [...(params.cc || [])].filter((e) => isEmail(e)),
          ToAddresses,
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: renderer(params.html, params.variables),
            },
            Text: {
              Charset: 'UTF-8',
              Data: renderer(params.text, params.variables),
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: params.subject,
          },
        },
        Source: params.source ?? process.env.SES_SOURCE,
        SourceArn: params.sourceArn ?? process.env.SES_SOURCE_ARN,
      },
      (err, data) => {
        if (err) {
          rej(err)
        }
        res(data)
      }
    )
  })
}
