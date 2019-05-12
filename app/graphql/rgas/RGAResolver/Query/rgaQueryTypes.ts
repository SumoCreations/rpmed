import { ErrorList } from "rpmed-validation-schema"
import { IDistributorOutput, IRGAOutput } from "../../../../models"

interface IExtendedRGAOutput extends IRGAOutput {
  distributor: () => Promise<IDistributorOutput | null>
}

export interface IRGAQueryOutput {
  lastEvaluatedKey?: string
  pageSize?: number
  rgas?: IExtendedRGAOutput[]
  rga?: IExtendedRGAOutput
  errors?: ErrorList
  success: boolean
}