import { Page } from '../../../../models'
import { ErrorPageNotFound } from '../pageErrors'
import { PageQueryOutput, QueryPageArgs } from 'rpmed-schema'
import {
  generateAuthorizationError,
  ServerContext,
  isAuthorized,
} from '../../../auth'

export const page = async (
  _,
  args: QueryPageArgs,
  ctx: ServerContext
): Promise<PageQueryOutput> => {
  if (!isAuthorized(ctx)) {
    generateAuthorizationError()
  }
  try {
    const result = await Page.find(args.id)
    if (!result) {
      return {
        errors: [ErrorPageNotFound],
        success: false,
      }
    }
    return {
      page: {
        ...Page.output(result),
      },
      success: true,
    }
  } catch (e) {
    return {
      errors: [
        {
          path: '_',
          message: e.localizedMessage || 'Could not retrieve page',
        },
      ],
      success: false,
    }
  }
}
