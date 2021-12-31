import { Page } from '../../../../models'
import { ErrorPageNotFound } from '../pageErrors'
import { PageQueryOutput } from 'rpmed-schema'
import {
  generateAuthorizationError,
  ServerContext,
  isAuthorized,
} from '../../../auth'

export const pages = async (
  _,
  _args,
  ctx: ServerContext
): Promise<PageQueryOutput> => {
  if (!isAuthorized(ctx)) {
    return generateAuthorizationError()
  }
  try {
    const result = await Page.all()
    if (!result) {
      return {
        errors: [ErrorPageNotFound],
        success: false,
      }
    }
    return {
      pages: result,
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
