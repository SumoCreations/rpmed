import { SES } from 'aws-sdk'
import nodemailer from 'nodemailer'
import { getSESClient } from '../util'
import { renderer } from './renderer'
import * as templates from './template'
import { IEmailSendParams } from './types'

export const send = (
  params: IEmailSendParams
): Promise<SES.SendEmailResponse> =>
  new Promise((res, rej) => {
    const ses = getSESClient()
    const transporter = nodemailer.createTransport({
      SES: ses,
    })
    // tslint:disable-next-line
    console.log(`HTML: ${params.template}`)
    // tslint:disable-next-line
    console.log(templates.html[params.template])
    // tslint:disable-next-line
    console.log(`TXT: ${params.template}`)
    // tslint:disable-next-line
    console.log(templates.txt[params.template])
    transporter.sendMail(
      {
        attachments: [...(params.attachments || [])],
        bcc: [...(params.bcc || [])],
        cc: [...(params.cc || [])],
        from: 'RPMed Service Admin <donotreply@rpmed-apps.com>',
        html: renderer(templates.html[params.template], params.variables),
        subject: params.subject,
        text: renderer(templates.txt[params.template], params.variables),
        to: [...params.to],
      },
      (err, info) => {
        if (err) {
          rej(err)
        }
        // tslint:disable-next-line
        console.log('Sent email.')
        res(info)
      }
    )

    // ses.sendEmail(
    //   {
    //     Destination: {
    //       BccAddresses: [...(params.bcc || [])],
    //       CcAddresses: [...(params.cc || [])],
    //       ToAddresses: [...params.to],
    //     },
    //     Message: {
    //       Body: {
    //         Html: {
    //           Charset: 'UTF-8',
    //           Data: renderer(templates.html[params.template], params.variables),
    //         },
    //         Text: {
    //           Charset: 'UTF-8',
    //           Data: renderer(templates.txt[params.template], params.variables),
    //         },
    //       },
    //       Subject: {
    //         Charset: 'UTF-8',
    //         Data: params.subject,
    //       },
    //     },
    //     Source: 'RPMed Service Admin <donotreply@rpmed-apps.com>',
    //     SourceArn: process.env.SES_SOURCE_ARN,
    //   },
    //   (err, data) => {
    //     if (err) {
    //       rej(err)
    //     }
    //     res(data)
    //   }
    // )
  })
