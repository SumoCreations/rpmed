import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import get from 'lodash.get'
import { ErrorList } from 'rpmed-validation-schema'
import {
  IProductSymptomDataShape,
  IProductSymptomQueryData,
} from './useProductSymptom'
import { PRODUCT_SYMPTOMS_QUERY } from './useProductSymptoms'

const CREATE_PRODUCT_SYMPTOM = gql`
  mutation CreateProductSymptom($productSymptomInput: NewProductSymptomInput!) {
    response: createProductSymptom(productSymptomInput: $productSymptomInput) {
      productSymptom {
        id
        faultCode
        synopsis
        solution
      }
      errors {
        message
        path
      }
    }
  }
`

interface ICreateProductSymptomMutationData {
  response: {
    ProductSymptom?: IProductSymptomDataShape
    errors?: ErrorList
    success: boolean
  }
}

export interface IProductSymptomInput {
  id?: string
  careTip?: string
  fee: boolean
  preApproved: boolean
  faultCode: string
  name: string
  solution: string
  synopsis: string
}

interface ICreateProductSymptomMutationVariables {
  productSymptomInput: IProductSymptomInput
}

export const useCreateProductSymptom = () => {
  const [createProductSymptom] = useMutation<
    ICreateProductSymptomMutationData,
    ICreateProductSymptomMutationVariables
  >(CREATE_PRODUCT_SYMPTOM, {
    update: (cache, { data }) => {
      const { response } = cache.readQuery({
        query: PRODUCT_SYMPTOMS_QUERY,
      }) as IProductSymptomQueryData
      const productSymptom =
        get(data, 'response.productSymptom') || ({} as IProductSymptomDataShape)
      const productSymptoms = (response.productSymptoms ||
        []) as IProductSymptomDataShape[]
      if (productSymptom) {
        cache.writeQuery({
          data: {
            ...response,
            response: {
              productSymptoms: productSymptoms.concat([productSymptom]),
            },
          },
          query: PRODUCT_SYMPTOMS_QUERY,
        })
      }
    },
  })
  return createProductSymptom
}
