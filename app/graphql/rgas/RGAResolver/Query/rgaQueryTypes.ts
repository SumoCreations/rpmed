import { ErrorList } from "rpmed-validation-schema"
import {
  IDistributorOutput,
  IRGAGoodOutput,
  IRGAOutput,
} from "../../../../models"

interface IExtendedRGAOutput extends IRGAOutput {
  distributor: () => Promise<IDistributorOutput | null>
  goods: () => Promise<IRGAGoodOutput[] | null>
}

export interface IRGAQueryOutput {
  lastEvaluatedKey?: string
  pageSize?: number
  rgas?: IExtendedRGAOutput[]
  rga?: IExtendedRGAOutput
  rgaGood?: IRGAGoodOutput
  errors?: ErrorList
  success: boolean
}
