import { Document } from '../../../../models'
import { ErrorDocumentNotFound } from '../documentErrors'
// import { DocumentQueryOutput } from 'rpmed-schema'

export const documents = async (
  _,
  _args
): Promise<any> => {
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
          message:
            e.localizedMessage || 'Could not retrieve document',
        },
      ],
      success: false,
    }
  }
}
