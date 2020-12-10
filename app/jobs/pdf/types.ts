export interface PdfJobParams {
  key: string
  rgaId: string
  rgaGoodId: string
}

export enum RGAGoodDocumentType {
  CustomerLetter = 'customer-letter',
  ServiceForm = 'service-form',
}
