import { IModelNumberOutput, IProductSymptomOutput } from '../../../../models'
import { ErrorList } from '../../../../validations'

interface IExtendedProductSymptomOutput extends IProductSymptomOutput {
  modelNumbers: () => Promise<IModelNumberOutput[]>
}

export interface IProductSymptomQueryOutput {
  lastEvaluatedKey?: string
  pageSize?: number
  productSymptoms?: IExtendedProductSymptomOutput[]
  productSymptom?: IExtendedProductSymptomOutput
  errors?: ErrorList
  success: boolean
}
