import {
  IModelNumberOutput,
  IProductOutput,
  ModelNumber,
  Product,
} from "../../../models"

type ProductResolver = (context: any, args: { productId: string }) => Promise<IProductOutput>
type ProductsResolver = (context: any, args: any) => Promise<IProductOutput[]>
type ModelNumberResolver = (context: any, args: { modelNumber: string }) => Promise<IModelNumberOutput>
type ModelNumbersResolver = (context: any, args: any) => Promise<IModelNumberOutput[]>

/**
 * Retrieves a specific product in the system.
 */
export const product: ProductResolver = async (_, args) => Product.output(await Product.find(args.productId))

/**
 * Retreives all products in the system.
 */
export const products: ProductsResolver = async () => (await Product.all()).map(Product.output)

/**
 * Retreives a specific model numbers in the system.
 */
export const modelNumber: ModelNumberResolver = async (_, args) => ModelNumber.output((await ModelNumber.find(args.modelNumber)))

/**
 * Retreives all model numbers in the system.
 */
export const modelNumbers: ModelNumbersResolver = async () => (await ModelNumber.all()).map(ModelNumber.output)