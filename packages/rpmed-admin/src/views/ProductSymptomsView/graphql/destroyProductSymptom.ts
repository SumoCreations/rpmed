import {
  ProductSymptomsDocument,
  ProductSymptomsQuery,
  useDestroyProductSymptomMutation,
} from '../../../schema'

export const useDestroyProductSymptom = () => {
  const [destroyProductSymptom] = useDestroyProductSymptomMutation({
    update: (cache, { data }) => {
      const { response } = cache.readQuery({
        query: ProductSymptomsDocument,
        variables: { modelNumber: '', search: '' },
      }) as ProductSymptomsQuery
      const productSymptoms = response.productSymptoms || []
      const productSymptom =
        data && data.response && data.response.productSymptom
      if (!productSymptom) {
        return
      }
      const updatedSymptoms = productSymptoms.filter(
        current => current && current.id !== productSymptom.id
      )
      cache.writeQuery({
        data: {
          response: {
            ...response,
            pageSize: updatedSymptoms.length,
            productSymptoms: updatedSymptoms,
          },
        },
        query: ProductSymptomsDocument,
        variables: { modelNumber: '', search: '' },
      })
    },
  })
  return destroyProductSymptom
}
