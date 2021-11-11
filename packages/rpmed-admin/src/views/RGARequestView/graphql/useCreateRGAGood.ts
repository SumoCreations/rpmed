import {
  RgaDocument,
  RgaQuery,
  useCreateRgaGoodMutation,
} from '../../../schema'

export const useCreateRGAGood = () => {
  const [createRGAGood] = useCreateRgaGoodMutation({
    update: (cache, result) => {
      const response = result.data && result.data.response
      const success = response && response.success
      const rgaId = response && response.rgaId
      const rgaGood = response && response.rgaGood
      if (!success || !rgaGood || !rgaId) {
        return
      }
      const { response: cacheResponse } = cache.readQuery({
        query: RgaDocument,
        variables: { rgaId },
      }) as RgaQuery
      if (rgaGood) {
        const goods = (cacheResponse.rga && cacheResponse.rga.goods) || []
        const updatedData = {
          response: {
            ...cacheResponse,
            rga: { ...cacheResponse.rga, goods: [...goods, rgaGood] },
          },
        }
        cache.writeQuery({
          data: updatedData,
          query: RgaDocument,
          variables: { rgaId },
        })
      }
    },
  })
  return createRGAGood
}
