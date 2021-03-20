/**
 * A key value map of strings that will be
 * interpolated into the text and html email
 * bodies.
 */
export interface TemplateVariables {
  [key: string]: string
}

export interface EmailSendMeta {
  /**
   * The subject of the email.
   */
  subject: string
  /**
   * The recipient(s) for the email.
   */
  to: string[]
  /**
   * Variables that will be substituted into the
   * associated templates.
   */
  variables?: TemplateVariables
  /**
   * The carbon copy recipient(s) for the email.
   */
  cc?: string[]
  /**
   * The bline carbon copy recipient(s) for the email.
   */
  bcc?: string[]
}

export interface EmailSendParams extends EmailSendMeta {
  /**
   * The plain text email template.
   */
  text: string
  /**
   * The text/html email template.
   */
  html: string
  /**
   * An optional source or (from address) for the
   * outgoing email. If left blank the environment
   * variable 'SES_SOURCE' will be used.
   */
  source?: string
  /**
   * An optional source ARN to utilize via SES.
   * If left blank the environment variable
   * 'SES_SOURCE_ARN' will be used.
   */
  sourceArn?: string
}
