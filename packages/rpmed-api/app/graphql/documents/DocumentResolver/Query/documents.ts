import { Document } from '../../../../models'
import {
  isAuthorized,
  generateAuthorizationError,
  ServerContext,
} from '../../../auth'
import { ErrorDocumentNotFound } from '../documentErrors'
import { DocumentQueryOutput } from 'rpmed-schema'

export const documents = async (
  _,
  _args,
  ctx: ServerContext
): Promise<DocumentQueryOutput> => {
  if (!isAuthorized(ctx)) {
    return generateAuthorizationError()
  }
  try {
    const result = await Document.all()
    if (!result) {
      return {
        errors: [ErrorDocumentNotFound],
        success: false,
      }
    }
    return {
      documents: result,
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
