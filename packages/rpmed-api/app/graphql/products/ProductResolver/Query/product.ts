import { Product } from '../../../../models'
import { ErrorProductIDDoesNotExist } from '../productErrors'
import { IProductQueryOutput } from './productQueryTypes'

/**
 * Retrieves a specific product.
 */
export const product = async (
  _,
  args: { id: string }
): Promise<IProductQueryOutput> => {
  try {
    const result = await Product.find(args.id)
    if (!result) {
      return {
        errors: [ErrorProductIDDoesNotExist],
        success: false,
      }
    }
    return {
      product: {
        ...Product.output(result),
      },
      success: true,
    }
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log(e)
    return {
      errors: [
        {
          message: e.localizedMessage || 'Could not retrieve product',
          path: '_',
        },
      ],
      success: false,
    }
  }
}
