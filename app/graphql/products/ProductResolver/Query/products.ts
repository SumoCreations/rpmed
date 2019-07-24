import { Product } from "../../../../models"
import { IProductQueryOutput } from "./productQueryTypes"

/**
 * Retrieves all products or a filtered search of some products.
 */
export const products = async (_, { search }: { search?: string }): Promise<IProductQueryOutput> => {
  try {
    const results = (await Product.all())
      .filter(p => search ? p.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 : true)
      .map(Product.output)
    return {
      products: results,
      success: true
    }
  } catch (e) {
    return {
      errors: [{ path: "_", message: e.localizedMessage || "Could not retrieve products" }],
      success: false
    }
  }
}