import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import { ErrorList } from 'rpmed-validation-schema'
import { IAttachedImage } from './useProductSymptom'

const ATTACH_IMAGES_TO_SYMPTOM = gql`
  mutation AttachImagesToSymptom(
    $symptomId: String!
    $attachedImages: [AttachedImageInput]!
  ) {
    response: attachImagesToSymptom(
      symptomId: $symptomId
      attachedImages: $attachedImages
    ) {
      productSymptom {
        id
        attachedImages {
          position
          status
          id
          url
        }
      }
      success
      errors {
        message
        path
      }
    }
  }
`

export interface IAttachImagesToSymptomMutationData {
  response: {
    productSymptom: {
      id: string
      attachedImages: IAttachedImage[]
    }
    errors?: ErrorList
    success: boolean
  }
}

export interface IAttachImagesToSymptomMutationVariables {
  symptomId: string
  attachedImages: IAttachedImage[]
}

export const useAttachImagesToSymptom = () => {
  const [attachImagesToSymptom] = useMutation<
    IAttachImagesToSymptomMutationData,
    IAttachImagesToSymptomMutationVariables
  >(ATTACH_IMAGES_TO_SYMPTOM, {
    update: (cache, { data }) => {
      if (!data) {
        return
      }
      const symptomData = get(data, 'response.productSymptom')
      cache.writeFragment({
        data: symptomData,
        fragment: gql`
          fragment cacheUpdateSymptomImages on ProductSymptom {
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
  return attachImagesToSymptom
}
