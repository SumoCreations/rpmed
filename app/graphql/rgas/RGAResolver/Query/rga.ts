import { Distributor, RGA, RGAGood } from '../../../../models'
import * as oauth from '../../../../oauth'
import { RgaStatus } from '../../../../schema'
import { ErrorRGAWithIDDoesNotExist } from '../rgaErrors'
import { IRGAQueryOutput } from './rgaQueryTypes'

export const rga = async (_, args): Promise<IRGAQueryOutput> => {
  try {
    const result = await RGA.find(args.id)
    if (!result) {
      return {
        errors: [ErrorRGAWithIDDoesNotExist],
        success: false,
      }
    }
    console.log(`Attempting to resolve RGA: ${args.id}`)
    return {
      rga: {
        ...RGA.output(result),
        distributor: async () =>
          Distributor.output(await Distributor.find(result.distributorId)),
        goods: async () => {
          return await Promise.all(
            ((await RGAGood.forRGA(result.partitionKey)) || []).map(
              async good => {
                let serviceFormUrl = null
                let customerLetterUrl = null
                if (
                  [RgaStatus.Shipping, RgaStatus.Assessing].includes(
                    result.status
                  )
                ) {
                  const { token } = await oauth.generate({ userId: 'admin' })
                  console.log(
                    `Attempting to generate service letter url for good: ${
                      good.id
                    }`
                  )
                  serviceFormUrl = await RGAGood.generateServiceLetterUrl(
                    good,
                    result.status,
                    token
                  )
                  customerLetterUrl = await RGAGood.generateCustomerLetterUrl(
                    good,
                    result.status,
                    token
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
        },
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
