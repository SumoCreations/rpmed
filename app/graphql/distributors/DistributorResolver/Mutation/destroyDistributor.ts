import { Distributor } from "../../../../models"
import { generateMutationError } from "../../../../util"
import {
  ErrorDistributorCouldNotBeDestroyed,
  ErrorDistributorWithIDDoesNotExist,
} from "../distributorErrors"
import { IDistributorMutationOutput } from "./distributorMutationTypes"

export const destroyDistributor = async (
  _: any,
  { id }: { id: string }
): Promise<IDistributorMutationOutput> => {
  const distributor = await Distributor.find(id)
  if (!distributor) {
    return generateMutationError([ErrorDistributorWithIDDoesNotExist])
  }
  try {
    await Distributor.destroy(id)
  } catch (e) {
    return generateMutationError([ErrorDistributorCouldNotBeDestroyed])
  }
  return { distributor: Distributor.output(distributor), success: true }
}
