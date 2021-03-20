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
    console.log(`HTML: ${params.template}`)
    console.log(templates.html[params.template])
    console.log(`TXT: ${params.template}`)
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
        console.log('Sent email to:')
        console.log(params.to)
        res(info)
      }
    )
  })
