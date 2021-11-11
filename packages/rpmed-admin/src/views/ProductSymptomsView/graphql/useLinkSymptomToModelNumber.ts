import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import { ErrorList } from 'rpmed-validation-schema'

const LINK_SYMPTOM_TO_MODEL_NUMBER = gql`
  mutation LinkSymptomToModelNumber(
    $modelNumber: String!
    $symptomId: String!
    $linked: Boolean!
  ) {
    response: linkSymptomToModel(
      modelNumber: $modelNumber
      symptomId: $symptomId
      linked: $linked
    ) {
      success
      productSymptom {
        id
        name
        associatedModelNumbers
      }
      modelNumber {
        id
        symptoms {
          id
          faultCode
          name
        }
      }
      errors {
        message
        path
      }
    }
  }
`

interface ISimplifiedModelNumber {
  id: string
  symptoms: Array<{ id: string; faultCode: string; name: string }>
}

interface ILinkSymptomToModelNumberMutationData {
  response: {
    productSymptom: {
      id: string
      associatedModelNumbers: string[]
      modelNumbers: ISimplifiedModelNumber[]
    }
    errors?: ErrorList
    success: boolean
  }
}

interface ILinkSymptomToModelNumberMutationVariables {
  modelNumber: string
  symptomId: string
  linked: boolean
}

export const useLinkSymptomToModelNumber = () => {
  const [linkSymptomToModelNumber] = useMutation<
    ILinkSymptomToModelNumberMutationData,
    ILinkSymptomToModelNumberMutationVariables
  >(LINK_SYMPTOM_TO_MODEL_NUMBER, {
    update: (cache, { data }) => {
      if (!data) {
        return
      }
      const symptomData = get(data, 'response.productSymptom')
      cache.writeFragment({
        data: symptomData,
        fragment: gql`
          fragment linkedSymptom on ProductSymptom {
            associatedModelNumbers
            __typename
          }
        `,
        id: symptomData.id,
      })
    },
  })
  return linkSymptomToModelNumber
}
