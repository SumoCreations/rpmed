
import { Product } from "../../../../models"
import { generateMutationError } from "../../../../util";
import { ErrorProductCouldNotBeDestroyed, ErrorProductIDDoesNotExist } from "./productErrors"
import { IProductMutationOutput } from "./productMutationTypes"

export const destroyProduct = async (
  _: any,
  { id }: { id: string }
): Promise<IProductMutationOutput> => {
  const product = await Product.find(id)
  if (!product) {
    return generateMutationError([ErrorProductIDDoesNotExist])
  }
  try {
    await Product.destroy(id)
  } catch (e) {
    return generateMutationError([ErrorProductCouldNotBeDestroyed])
  }
  return { product: Product.output(product), success: true }
}