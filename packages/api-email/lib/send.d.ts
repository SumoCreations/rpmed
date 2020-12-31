import { SES } from 'aws-sdk';
import { EmailSendParams } from './types';
/**
 * Send an email via AWS SES.
 * @param params Describe attributes for an outgoing email.
 * @param client An instance of an AWS SES client preconfigured for the application.
 */
export declare const send: (params: EmailSendParams, client: SES) => Promise<SES.SendEmailResponse>;
