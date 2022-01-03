import { RGA } from '../../../../models'
import { RgaStatus } from 'rpmed-schema'
import { IRGACountQueryOutput } from './rgaQueryTypes'

export const rgaCount = async (): Promise<IRGACountQueryOutput> => {
  try {
    // tslint:disable object-literal-sort-keys
    return {
      issued: async () => await RGA.countWithStatus(RgaStatus.Issued),
      awaitingArrival: async () =>
        await RGA.countWithStatus(RgaStatus.AwaitingArrival),
      assessing: async () => await RGA.countWithStatus(RgaStatus.Assessing),
      repairing: async () => await RGA.countWithStatus(RgaStatus.Repairing),
      shipping: async () => await RGA.countWithStatus(RgaStatus.Shipping),
      closed: async () => await RGA.countWithStatus(RgaStatus.Closed),
      canceled: async () => await RGA.countWithStatus(RgaStatus.Canceled),
      delayed: async () => await RGA.countWithStatus(RgaStatus.Delayed),
      success: true,
    }
  } catch (e) {
    return {
      errors: [
        { path: '_', message: e.localizedMessage || 'Could not find any RGAs' },
      ],
      success: false,
    }
  }
}
