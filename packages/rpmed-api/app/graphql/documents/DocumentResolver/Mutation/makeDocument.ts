import { Document } from '../../../../models'
import * as Validation from '../../../../validations'
import {
  ErrorDocumentWithSlugAlreadyExists,
  ErrorDocumentInvalid,
} from '../documentErrors'
import { MutationMakeDocumentArgs, DocumentMutationOutput } from "rpmed-schema"

export const makeDocument = async (
  _: any,
  { documentInput }: MutationMakeDocumentArgs
): Promise<DocumentMutationOutput> => {
  try {
    await Validation.Document.Default.validate(documentInput, {
      abortEarly: false,
    })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }

  const { id, slug } = documentInput
  const existingDocument = await Document.findBySlug(slug)
  if (existingDocument && existingDocument?.id !== id) {
    return {
      errors: [ErrorDocumentWithSlugAlreadyExists],
      success: false,
    }
  }

  try {
    const document = await Document.make({ ...documentInput as any })
    return { document: Document.output(document), success: true }
  } catch (e) {
    console.log("PAGE MAKE ERROR!")
    console.log(e)
    return { success: false, errors: [ErrorDocumentInvalid] }
  }
}
