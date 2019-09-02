import * as Validation from 'rpmed-validation-schema'
import { Distributor, IDistributorInput } from '../../../../models'
import {
  ErrorDistributorCredentialsInvalid,
  ErrorDistributorWithDomainAlreadyExists,
} from '../distributorErrors'
import { IDistributorMutationOutput } from './distributorMutationTypes'

export const createDistributor = async (
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

  const { domain, name } = distributorInput
  const existingDistributor = await Distributor.findByDomain(domain)
  if (existingDistributor) {
    return {
      errors: [ErrorDistributorWithDomainAlreadyExists],
      success: false,
    }
  }

  try {
    const distributor = await Distributor.create({ domain, name })
    return { distributor: Distributor.output(distributor), success: true }
  } catch (e) {
    return { success: false, errors: [ErrorDistributorCredentialsInvalid] }
  }
}
