export interface ITemplateVariables {
  [key: string]: string
}

export enum Template {
  CreateAccountConfirmation = 'createAccountConfirmation',
  ResetPassword = 'resetPassword',
}

export interface IEmailSendParams {
  template: Template
  subject: string
  to: string[]
  cc?: string[]
  bcc?: string[]
  variables?: ITemplateVariables
}
