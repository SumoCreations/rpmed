import { Distributor, RGA, RGAGood } from '../../../../models'
import { IRGAQueryOutput } from './rgaQueryTypes'

export const rgas = async (_, args): Promise<IRGAQueryOutput> => {
  try {
    const results = args.status
      ? await RGA.findWithStatus(args.status)
      : await RGA.all()
    return {
      rgas: results.map(RGA.output).map(o => ({
        ...o,
        distributor: async () =>
          Distributor.output(await Distributor.find(o.distributorId)),
        goods: async () =>
          ((await RGAGood.forRGA(o.id)) || []).map(RGAGood.output),
      })) as any[],
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
