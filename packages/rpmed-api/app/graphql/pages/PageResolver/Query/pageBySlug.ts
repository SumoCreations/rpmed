import { Page } from '../../../../models'
import { ErrorPageNotFound } from '../pageErrors'
import { PageQueryOutput } from 'rpmed-schema'

export const pageBySlug = async (_, args): Promise<PageQueryOutput> => {
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
