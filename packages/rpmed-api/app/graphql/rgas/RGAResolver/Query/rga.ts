import { RgaQueryOutput } from 'rpmed-schema'
import { Distributor, RGA, RGAGood } from '../../../../models'
import { ErrorRGAWithIDDoesNotExist } from '../rgaErrors'

export const rga = async (_, args): Promise<RgaQueryOutput> => {
  try {
    const result = await RGA.find(args.id)
    if (!result) {
      return {
        errors: [ErrorRGAWithIDDoesNotExist],
        success: false,
      }
    }
    return {
      rga: {
        ...RGA.output(result),
        distributor: (async () =>
          Distributor.output(
            await Distributor.find(result.distributorId)
          )) as any,
        goods: (async () => {
          return await Promise.all(
            ((await RGAGood.forRGA(result.partitionKey)) || []).map(
              async good => {
                let serviceFormUrl = null
                let customerLetterUrl = null
                if (RGA.readyForDocuments(result)) {
                  serviceFormUrl = await RGAGood.generateServiceLetterUrl(
                    args.id,
                    good.id
                  )
                  customerLetterUrl = await RGAGood.generateCustomerLetterUrl(
                    args.id,
                    good.id
                  )
                }
                return {
                  ...RGAGood.output(good),
                  resolutionFee:
                    typeof good.resolutionFee === 'object'
                      ? good.resolutionFee
                      : { distributor: 'RFQ', endUser: 'RFQ' },
                  customerLetterUrl,
                  serviceFormUrl,
                }
              }
            )
          )
        }) as any,
      },
      success: true,
    }
  } catch (e) {
    return {
      errors: [
        { path: '_', message: e.localizedMessage || 'Could not retrieve rga' },
      ],
      success: false,
    }
  }
}
