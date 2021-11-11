import { useProductSymptomQuery } from '../../../schema'

export interface IAttachedImage {
  position: number
  status: string
  id: string
  url?: string | null
}

export type ProductSymptomFieldValue =
  | string
  | string[]
  | IAttachedImage[]
  | boolean
  | null
  | undefined

export interface IProductSymptomDataShape {
  [key: string]: ProductSymptomFieldValue
  attachedImages: IAttachedImage[]
  associatedModelNumbers: string[]
  faultCode: string
  fee: boolean
  name: string
  preApproved: boolean
  synopsis: string
  solution: string
  careTip: string | null
  id: string
}

export interface IProductSymptomQueryData {
  response: {
    productSymptom: IProductSymptomDataShape | null
    productSymptoms: IProductSymptomDataShape[] | null
    lastEvaluatedKey: string | null
    pageSize: number | null
    success: boolean
    errors: Array<{ path: string; message: string }> | null
  }
}

export const useProductSymptom = (productSymptomId: string) => {
  const { loading, error, data, refetch } = useProductSymptomQuery({
    variables: { productSymptomId },
  })
  const productSymptom = data && data.response && data.response.productSymptom
  return { loading, error, data, productSymptom, refetch }
}
