import {
  Rga,
  RgaCountsDocument,
  RgaCountsQuery,
  RgasDocument,
  RgasQuery,
  RgaStatus,
  useUpdateRgaStatusMutation,
} from '../../../schema'

import { keyForStatus } from './cacheHelpers'

export const useUpdateRGAStatus = (preUpdateStatus: RgaStatus) => {
  const [updateRgaStatus] = useUpdateRgaStatusMutation({
    update: (cache, { data }) => {
      const response = data && data.response
      const success = response && response.success
      const rga = response && response.rga
      if (!success || !rga) {
        return
      }

      // Remove from old status
      try {
        const { response: oldStatusResponse } = cache.readQuery({
          query: RgasDocument,
          variables: { status: preUpdateStatus },
        }) as RgasQuery
        const previousRgas = (oldStatusResponse.rgas || []) as Rga[]
        if (rga) {
          const updatedData = {
            response: {
              ...oldStatusResponse,
              rgas: previousRgas.filter(r => r.id !== rga.id),
            },
          }
          cache.writeQuery({
            data: updatedData,
            query: RgasDocument,
            variables: { status: preUpdateStatus },
          })
        }
      } catch (e) {
        // tslint:disable-next-line no-console
        console.log('Did not update pre-update status cache.')
      }

      // Update new status
      try {
        const { response: newStatusResponse } = cache.readQuery({
          query: RgasDocument,
          variables: { status: rga.status },
        }) as RgasQuery

        const rgas = (newStatusResponse.rgas || []) as Rga[]
        if (rga) {
          const updatedData = {
            response: {
              ...newStatusResponse,
              rgas: [...rgas, rga],
            },
          }
          cache.writeQuery({
            data: updatedData,
            query: RgasDocument,
            variables: { status: rga.status },
          })
        }
      } catch (e) {
        // tslint:disable-next-line no-console
        console.log('Did not update post-update status cache.')
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
              [keyForStatus(preUpdateStatus)]:
                (rgaCount[keyForStatus(preUpdateStatus)] || 1) - 1,
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
  return updateRgaStatus
}
