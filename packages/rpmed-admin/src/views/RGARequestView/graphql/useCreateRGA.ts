import {
  Rga,
  RgaCountsDocument,
  RgaCountsQuery,
  RgasDocument,
  RgasQuery,
  useCreateRgaMutation,
} from '../../../schema'

import { keyForStatus } from './cacheHelpers'

export const useCreateRGA = () => {
  const [createRGA] = useCreateRgaMutation({
    update: (cache, { data }) => {
      const response = data && data.response
      const success = response && response.success
      const rga = response && response.rga
      if (!success || !rga) {
        return
      }
      const { response: cacheResponse } = cache.readQuery({
        query: RgasDocument,
        variables: { status: rga.status },
      }) as RgasQuery
      const rgas = (cacheResponse.rgas || []) as Rga[]
      if (rga) {
        const updatedData = {
          response: {
            ...cacheResponse,
            rgas: [...rgas, rga],
          },
        }
        cache.writeQuery({
          data: updatedData,
          query: RgasDocument,
          variables: { status: rga.status },
        })
      }

      // Update Counts
      try {
        const { rgaCount } = cache.readQuery({
          query: RgaCountsDocument,
        }) as RgaCountsQuery
        if (rgaCount) {
          const updatedData = {
            rgaCount: {
              ...rgaCount,
              [keyForStatus(rga.status)]:
                (rgaCount[keyForStatus(rga.status)] || 0) + 1,
            },
          }
          cache.writeQuery({
            data: updatedData,
            query: RgaCountsDocument,
          })
        }
      } catch (e) {
        // tslint:disable-next-line no-console
        console.log('could not update counts.')
      }
    },
  })
  return createRGA
}
