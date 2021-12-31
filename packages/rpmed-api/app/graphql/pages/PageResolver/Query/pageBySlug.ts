import { Page } from '../../../../models'
import { ErrorPageNotFound } from '../pageErrors'
import { PageQueryOutput, QueryPageBySlugArgs } from 'rpmed-schema'
import {
  generateAuthorizationError,
  ServerContext,
  isAuthorized,
} from '../../../auth'

export const pageBySlug = async (
  _,
  args: QueryPageBySlugArgs,
  ctx: ServerContext
): Promise<PageQueryOutput> => {
  if (!isAuthorized(ctx)) {
    return generateAuthorizationError()
  }
  try {
    const result = await Page.findBySlug(args.slug)
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
