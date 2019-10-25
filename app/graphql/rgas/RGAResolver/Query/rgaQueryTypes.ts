import {
  IDistributorOutput,
  IRGAGoodOutput,
  IRGAOutput,
} from '../../../../models'
import { ErrorList } from '../../../../validations'

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

export interface IRGACountQueryOutput {
  issued?: () => Promise<number> | number | null
  awaitingArrival?: () => Promise<number> | number | null
  received?: () => Promise<number> | number | null
  assessing?: () => Promise<number> | number | null
  repairing?: () => Promise<number> | number | null
  shipping?: () => Promise<number> | number | null
  closed?: () => Promise<number> | number | null
  canceled?: () => Promise<number> | number | null
  errors?: ErrorList
  success: boolean
}
