import { Distributor, RGA, RGAGood } from '../../../../models'
import { IRGAQueryOutput } from './rgaQueryTypes'

export const rgas = async (): Promise<IRGAQueryOutput> => {
  try {
    const results = await RGA.all()
    return {
      rgas: results.map(RGA.output).map(o => ({
        ...o,
        distributor: async () =>
          Distributor.output(await Distributor.find(o.distributorId)),
        goods: async () =>
          ((await RGAGood.forRGA(o.id)) || []).map(RGAGood.output),
      })),
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
