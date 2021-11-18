import { Document } from '../../../../models'
import { ErrorDocumentNotFound } from '../documentErrors'
import { DocumentQueryOutput } from "rpmed-schema"
export const document = async (
  _,
  args
): Promise<DocumentQueryOutput> => {
  try {
    const result = await Document.find(args.id)
    if (!result) {
      return {
        errors: [ErrorDocumentNotFound],
        success: false,
      }
    }
    return {
      document: {
        ...Document.output(result),
      },
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
