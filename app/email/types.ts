export interface ITemplateVariables {
  [key: string]: string
}

export enum Template {
  CreateAccountConfirmation = 'createAccountConfirmation',
  ResetPassword = 'resetPassword',
  RgaGoodServiceForm = 'rgaGoodServiceForm',
  RgaGoodCustomerLetter = 'rgaGoodCustomerLetter',
}

export interface IAttachment {
  filename: string
  path: string
}

export interface IEmailSendParams {
  attachments?: IAttachment[]
  template: Template
  subject: string
  to: string[]
  cc?: string[]
  bcc?: string[]
  variables?: ITemplateVariables
}
