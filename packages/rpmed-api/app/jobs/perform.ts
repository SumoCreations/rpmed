import { BackgroundJob } from './types'
import {
  requestCustomerLetter,
  requestServiceLetter,
  generateMissingRgaDocs,
} from './pdf'

export const perform = async (job: BackgroundJob, params: any) => {
  switch (job) {
    case BackgroundJob.RequestCustomerLetterForRgaGood:
      await requestCustomerLetter({ ...params })
      break
    case BackgroundJob.RequestServiceLetterForRgaGood:
      await requestServiceLetter({ ...params })
      break
    case BackgroundJob.GenerateMissingRgaDocs:
      await generateMissingRgaDocs({ ...params })
  }
}
