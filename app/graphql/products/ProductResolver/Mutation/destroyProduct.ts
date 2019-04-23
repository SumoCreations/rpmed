
import { Product } from "../../../../models"
import { ErrorProductCouldNotBeDestroyed, ErrorProductIDDoesNotExist } from "./productErrors"
import { IProductMutationOutput } from "./productMutationTypes"

export const destroyProduct = async (
  _: any,
  { id }: { id: string }
): Promise<IProductMutationOutput> => {
  const product = await Product.find(id)
  if (!product) {
    return { success: false, errors: [ErrorProductIDDoesNotExist] }
  }
  try {
    await Product.destroy(id)
  } catch (e) {
    return { success: false, errors: [ErrorProductCouldNotBeDestroyed] }
  }
  return { product: Product.output(product), success: true }
}