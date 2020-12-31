import { dispatch } from '../dispatch'

import { RGA, RGAGood, ConnectedQuery, IRGA } from '../../models'
import { PdfJobParams } from './types'
import { BackgroundJob } from '../types'

export const PAGE_SIZE = 1000

/**
 * Chains a series of email requests until all active parent / gaurdian profiles have been reached.
 * @param params Configuration for the email request.
 */
export const generateMissingRgaDocs = async ({
  cursor,
  jobType,
  ...props
}: PdfJobParams) => {
  console.log('Requesting RGAs...')
  const connection = await RGA.allModels({ first: PAGE_SIZE, after: cursor })
  await processMissingDocsForConnection(
    {
      ...connection,
      nodes: connection.nodes.filter(rga => RGA.readyForDocuments(rga)),
    },
    props
  )
}

/**
 * Performs an update on all associated models and dispatches a follow up
 * job if there are more models to process.
 * @param connection A connected query containing RGA models.
 * @param params A param object defining this job.
 */
const processMissingDocsForConnection = async (
  connection: ConnectedQuery<IRGA>,
  { jobType, ...props }: PdfJobParams
) => {
  console.log('Processing connection.')
  await connection.nodes.reduce(async (p, rga) => {
    await p
    const goods = await RGAGood.forRGA(rga.partitionKey)
    await Promise.all(
      goods.map(async ({ rgaId, id }) => {
        console.log(`Ensuring good with id: '${id}' has docs.`)
        const serviceLetterUrl = await RGAGood.generateServiceLetterUrl(
          rgaId,
          id
        )
        if (!serviceLetterUrl) {
          await dispatch(BackgroundJob.RequestServiceLetterForRgaGood, {
            rgaId,
            rgaGoodId: id,
          })
        }
        const customerLetterUrl = await RGAGood.generateCustomerLetterUrl(
          rgaId,
          id
        )
        if (!customerLetterUrl) {
          await dispatch(BackgroundJob.RequestCustomerLetterForRgaGood, {
            rgaId,
            rgaGoodId: id,
          })
        }
      })
    )
  }, Promise.resolve())
  if (connection.pageInfo.hasNextPage) {
    await dispatch(jobType, {
      ...props,
      cursor: connection.pageInfo.endCursor,
    })
  }
}
