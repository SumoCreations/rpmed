import { Document } from '../../../../models'
import { ErrorDocumentNotFound } from '../documentErrors'
import { DocumentQueryOutput, QueryDocumentBySlugArgs } from 'rpmed-schema'
import { getDownloadUrl } from 'api-utils'
import {
  ServerContext,
  isAuthorized,
  generateAuthorizationError,
} from '../../../auth'

export const documentBySlug = async (
  _,
  args: QueryDocumentBySlugArgs,
  ctx: ServerContext
): Promise<DocumentQueryOutput> => {
  if (!isAuthorized(ctx)) {
    return generateAuthorizationError()
  }
  try {
    const result = await Document.findBySlug(args.slug)
    if (!result) {
      return {
        errors: [ErrorDocumentNotFound],
        success: false,
      }
    }
    const url = await getDownloadUrl(
      result.fileKey,
      process.env.ATTACHED_IMAGES_BUCKET,
      true
    )
    return {
      document: {
        ...Document.output(result),
        url,
      },
      success: true,
    }
  } catch (e) {
    return {
      errors: [
        {
          path: '_',
          message: e.localizedMessage || 'Could not retrieve document',
        },
      ],
      success: false,
    }
  }
}
