import { Document } from '../../../../models'
import { ErrorDocumentNotFound } from '../documentErrors'
import { DocumentQueryOutput, QueryDocumentArgs } from 'rpmed-schema'
import { getDownloadUrl } from 'api-utils'
import {
  generateAuthorizationError,
  isAuthorized,
  ServerContext,
} from '../../../auth'

export const document = async (
  _,
  args: QueryDocumentArgs,
  ctx: ServerContext
): Promise<DocumentQueryOutput> => {
  if (!isAuthorized(ctx)) {
    return generateAuthorizationError()
  }
  try {
    const result = await Document.find(args.id)
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
