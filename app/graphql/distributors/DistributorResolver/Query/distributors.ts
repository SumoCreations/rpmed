import { Distributor } from '../../../../models'
import { IDistributorQueryOutput } from './distributorQueryTypes'

export const distributors = async (): Promise<IDistributorQueryOutput> => {
  try {
    const results = await Distributor.all()
    return {
      distributors: results.map(Distributor.output),
      success: true,
    }
  } catch (e) {
    return {
      errors: [
        {
          path: '_',
          message: e.localizedMessage || 'Could not find distributors',
        },
      ],
      success: false,
    }
  }
}
