import { RGA, RGAGood } from '../../../models'
import { dispatch, BackgroundJob } from '../../../jobs'

/**
 * Dispatches a job to generate a document but only if the RGA's state
 * represents a state in which documents can be generated AND the document
 * has not already been created.
 * @param job The type of document job to dispatch.
 * @param rgaId The id of the RGA to generate a document for.
 * @param rgaGoodId The id of the good to generate a document for.
 */
const generate = async (
  job: BackgroundJob,
  rgaId: string,
  rgaGoodId: string
) => {
  const rga = await RGA.find(rgaId)
  if (!RGA.readyForDocuments(rga)) {
    throw new Error('RGA must be closed in order to generate documents.')
  }
  const request =
    job === BackgroundJob.RequestCustomerLetterForRgaGood
      ? RGAGood.generateCustomerLetterUrl(rgaId, rgaGoodId)
      : RGAGood.generateServiceLetterUrl(rgaId, rgaGoodId)
  const documentUrl = await request
  if (documentUrl) {
    throw new Error(`Document already exists at '${documentUrl}'`)
  }
  await dispatch(job, {
    rgaId,
    rgaGoodId,
  })
}

/**
 * Generate a service letter via background job.
 * @param rgaId The id of the RGA
 * @param rgaGoodId The id of the Good.
 */
export const generateServiceLetterForGood = async (
  rgaId: string,
  rgaGoodId: string
) => {
  await generate(BackgroundJob.RequestServiceLetterForRgaGood, rgaId, rgaGoodId)
}

/**
 * Generate a customer letter via background job.
 * @param rgaId The id of the RGA
 * @param rgaGoodId The id of the Good.
 */
export const generateCustomerLetter = async (
  rgaId: string,
  rgaGoodId: string
) => {
  await generate(
    BackgroundJob.RequestCustomerLetterForRgaGood,
    rgaId,
    rgaGoodId
  )
}

/**
 * Generate a service letter via background job.
 * @param rgaId The id of the RGA
 * @param rgaGoodId The id of the Good.
 */
export const generateDocumentsForGood = async (
  rgaId: string,
  rgaGoodId: string
) => {
  await generate(BackgroundJob.RequestServiceLetterForRgaGood, rgaId, rgaGoodId)
  await generate(
    BackgroundJob.RequestCustomerLetterForRgaGood,
    rgaId,
    rgaGoodId
  )
}
