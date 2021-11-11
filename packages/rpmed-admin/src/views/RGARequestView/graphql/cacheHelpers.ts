import { RgaStatus } from '../../../schema'

export const keyForStatus = (status: RgaStatus) => {
  switch (status) {
    case RgaStatus.Assessing:
      return 'assessing'
    case RgaStatus.AwaitingArrival:
      return 'awaitingArrival'
    case RgaStatus.Canceled:
      return 'canceled'
    case RgaStatus.Closed:
      return 'closed'
    case RgaStatus.Issued:
      return 'issued'
    case RgaStatus.Repairing:
      return 'repairing'
    case RgaStatus.Shipping:
      return 'shipping'
    case RgaStatus.Delayed:
      return 'delayed'
    default:
      return 'closed'
  }
}
