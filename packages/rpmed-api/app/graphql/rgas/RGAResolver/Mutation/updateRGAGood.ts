import { RGA, RGAGood } from '../../../../models'
import { ProductType } from '../../../../schema'
import {
  ErrorRGAGoodCouldNotBeUpdated,
  ErrorRGAGoodWithIDDoesNotExist,
  ErrorRGAWithIDDoesNotExist,
} from '../rgaErrors'
import { IRGAGoodMutationOutput } from './rgaMutationTypes'

interface IRGAUpdateGoodInputParams {
  rgaId: string
  id: string
  rgaGoodInput: {
    warrantied: boolean
    symptomId: string
    rgaId: string
    productId: string
    productName: string
    productType: ProductType
    lotted: boolean
    modelNumber: string
    serial?: string
    rma?: string
    po?: string
    notes?: string
    customerName?: string
    customerEmail?: string
    submittedBy?: string
    submittedOn?: string
  }
}

export const updateRGAGood = async (
  _: any,
  { rgaId, id, rgaGoodInput }: IRGAUpdateGoodInputParams
): Promise<IRGAGoodMutationOutput> => {
  const rga = await RGA.find(rgaId)
  if (!rga) {
    return { success: false, errors: [ErrorRGAWithIDDoesNotExist] }
  }
  const existing = await RGAGood.find(rgaId, id)
  if (!existing) {
    return { success: false, errors: [ErrorRGAGoodWithIDDoesNotExist] }
  }
  try {
    const rgaGood = await RGAGood.update({
      ...existing,
      ...rgaGoodInput,
      id,
      rgaId,
    })
    return { rgaGood: RGAGood.output(rgaGood), rgaId, success: true }
  } catch (e) {
    return { success: false, errors: [ErrorRGAGoodCouldNotBeUpdated] }
  }
}
