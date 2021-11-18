import { Page } from '../../../../models'
import { ErrorPageNotFound } from '../pageErrors'
import { PageQueryOutput } from 'rpmed-schema'

export const pages = async (
  _,
  _args
): Promise<PageQueryOutput> => {
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
          message:
            e.localizedMessage || 'Could not retrieve page',
        },
      ],
      success: false,
    }
  }
}
