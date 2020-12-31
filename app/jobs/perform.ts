import { BackgroundJob } from './types'
import {
  requestCustomerLetter,
  requestServiceLetter,
  generateMissingRgaDocs,
} from './pdf'

export const perform = async (job: BackgroundJob, params: any) => {
  console.log(`Perform dispatching ${job}`)
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
    case BackgroundJob.GenerateMissingRgaDocs:
      await generateMissingRgaDocs({ ...params })
  }
}
