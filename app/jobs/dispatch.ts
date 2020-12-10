import { BackgroundJob } from './types'
import { requestCustomerLetter, requestServiceLetter } from './pdf'

export const dispatch = async (job: BackgroundJob, params: any) => {
  switch (job) {
    case BackgroundJob.RequestCustomerLetterForRgaGood:
      await requestCustomerLetter(
        params.rgaId,
        params.rgaGoodId,
        params.rgaStatus
      )
      break
    case BackgroundJob.RequestServiceLetterForRgaGood:
      await requestServiceLetter(
        params.rgaId,
        params.rgaGoodId,
        params.rgaStatus
      )
      break
  }
}
