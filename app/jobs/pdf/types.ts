import { BackgroundJob } from '../types'

export interface PdfJobParams {
  key: string
  rgaId: string
  rgaGoodId: string
  cursor?: string
  jobType?: BackgroundJob
}

export enum RGAGoodDocumentType {
  CustomerLetter = 'customer-letter',
  ServiceForm = 'service-form',
}
