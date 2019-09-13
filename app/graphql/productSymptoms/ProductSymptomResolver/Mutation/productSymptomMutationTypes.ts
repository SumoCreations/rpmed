import { IModelNumberOutput, IProductSymptomOutput } from '../../../../models'
import { ErrorList } from '../../../../validations'

interface IExtendedModelNumberOutput extends IModelNumberOutput {
  symptoms: () => Promise<IProductSymptomOutput[]>
}

interface IExtendedProductSymptomOutput extends IProductSymptomOutput {
  modelNumbers: () => Promise<IExtendedModelNumberOutput[]>
}

export interface IProductSymptomMutationOutput {
  modelNumber?: () => Promise<IExtendedModelNumberOutput>
  productSymptom?: () => Promise<IExtendedProductSymptomOutput>
  errors?: ErrorList
  success: boolean
}
