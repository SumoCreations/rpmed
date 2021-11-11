import gql from 'graphql-tag'
import get from 'lodash.get'
import { useUpdateProductSymptomMutation } from '../../../schema'

export const UPDATE_PRODUCT_SYMPTOM = gql`
  mutation UpdateProductSymptom(
    $productSymptomInput: ExistingProductSymptomInput!
  ) {
    response: updateProductSymptom(productSymptomInput: $productSymptomInput) {
      productSymptom {
        id
        name
        fee
        faultCode
        synopsis
        solution
        careTip
      }
      errors {
        message
        path
      }
    }
  }
`

export const useUpdateProductSymptom = () => {
  const [updateProductSymptom] = useUpdateProductSymptomMutation({
    update: (cache, { data }) => {
      if (!data) {
        return
      }
      const symptomData = get(data, 'response.productSymptom')
      cache.writeFragment({
        data: symptomData,
        fragment: gql`
          fragment updatedSymptomImages on ProductSymptom {
            attachedImages {
              id
            }
            __typename
          }
        `,
        id: symptomData.id,
      })
    },
  })
  return updateProductSymptom
}
