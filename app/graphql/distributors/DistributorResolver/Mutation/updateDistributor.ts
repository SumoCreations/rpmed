import * as Validation from 'rpmed-validation-schema'
import { Distributor, IDistributorInput } from '../../../../models'
import {
  ErrorDistributorWithDomainAlreadyExists,
  ErrorDistributorWithIDDoesNotExist,
} from '../distributorErrors'
import { IDistributorMutationOutput } from './distributorMutationTypes'

export const updateDistributor = async (
  _: any,
  { distributorInput }: { distributorInput: IDistributorInput }
): Promise<IDistributorMutationOutput> => {
  try {
    await Validation.Distributor.Default.validate(distributorInput, {
      abortEarly: false,
    })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }
  let distributor = await Distributor.find(distributorInput.id)
  if (!distributor) {
    return { success: false, errors: [ErrorDistributorWithIDDoesNotExist] }
  }
  const distributorWithDomain = await Distributor.findByDomain(
    distributorInput.domain
  )
  if (
    distributorWithDomain &&
    distributorWithDomain.partitionKey !== distributor.partitionKey
  ) {
    return { success: false, errors: [ErrorDistributorWithDomainAlreadyExists] }
  }
  distributor = await Distributor.update(distributorInput)
  return { distributor: Distributor.output(distributor), success: true }
}
