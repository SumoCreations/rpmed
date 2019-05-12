import { ErrorList } from "rpmed-validation-schema"
import { IRGAOutput } from "../../../../models"

// interface IExtendedRGAOutput extends IRGAOutput {
//   customer: () => Promise<ICustomerOutput | null>
// }

export interface IRGAQueryOutput {
  lastEvaluatedKey?: string
  pageSize?: number
  rgas?: IRGAOutput[]
  rga?: IRGAOutput
  errors?: ErrorList
  success: boolean
}