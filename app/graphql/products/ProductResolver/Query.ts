import {
  IModelNumberOutput,
  IProductOutput,
  ModelNumber,
  Product,
} from "../../../models"

type ProductResolver = (context: any, args: { id: string }) => Promise<IProductOutput | null>
type ProductsResolver = (context: any, args: { search?: string }) => Promise<IProductOutput[]>
type ModelNumberResolver = (context: any, args: { id: string }) => Promise<IModelNumberOutput | null>
type ModelNumbersResolver = (context: any, args: any) => Promise<IModelNumberOutput[]>

/**
 * Retrieves a specific product in the system.
 */
export const product: ProductResolver = async (_, args) => {
  const result = await Product.find(args.id)
  return result ? Product.output(result) : null
}

/**
 * Retreives all products in the system.
 */
export const products: ProductsResolver = async (_, { search }) => (await Product.all())
  .filter(p => search ? p.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 : true)
  .map(Product.output)

/**
 * Retreives a specific model numbers in the system.
 */
export const modelNumber: ModelNumberResolver = async (_, args) => {
  const result = await ModelNumber.find(args.id)
  return result ? {
    ...ModelNumber.output({ ...result }),
    product: async () => Product.output(await Product.find(result.indexSortKey))
  } : null
}

/**
 * Retreives all model numbers in the system.
 */
export const modelNumbers: ModelNumbersResolver = async () => {
  const output = (await ModelNumber.all()).map(ModelNumber.output).map(o => ({
    ...o,
    product: async () => Product.output(await Product.find(o.productId))
  }))
  return output
}