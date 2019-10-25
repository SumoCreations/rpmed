import { SES } from 'aws-sdk'
import { getSESClient } from '../util'
import { renderer } from './renderer'
import * as templates from './template'
import { IEmailSendParams } from './types'

const ses = getSESClient()

export const send = (
  params: IEmailSendParams
): Promise<SES.SendEmailResponse> =>
  new Promise((res, rej) => {
    ses.sendEmail(
      {
        Destination: {
          BccAddresses: [...(params.bcc || [])],
          CcAddresses: [...(params.cc || [])],
          ToAddresses: [...params.to],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: renderer(templates.html[params.template], params.variables),
            },
            Text: {
              Charset: 'UTF-8',
              Data: renderer(templates.txt[params.template], params.variables),
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: params.subject,
          },
        },
        Source: 'RPMed Service Admin <donotreply@rpmed-apps.com>',
        SourceArn: process.env.SES_SOURCE_ARN,
      },
      (err, data) => {
        if (err) {
          rej(err)
        }
        res(data)
      }
    )
  })
