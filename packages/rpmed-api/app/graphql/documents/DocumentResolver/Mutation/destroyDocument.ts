import { Document } from '../../../../models'
import { generateMutationError } from '../../../../util'
import {
  ErrorDocumentInvalid,
  ErrorDocumentNotFound,
} from '../documentErrors'
import { MutationDestroyDocumentArgs, DocumentMutationOutput } from 'rpmed-schema'

export const destroyDocument = async (
  _: any,
  { id }: MutationDestroyDocumentArgs
): Promise<DocumentMutationOutput> => {
  const document = await Document.find(id)
  if (!document) {
    return generateMutationError([ErrorDocumentNotFound])
  }
  try {
    await Document.destroy(id)
  } catch (e) {
    return generateMutationError([ErrorDocumentInvalid])
  }
  return {
    document: {
      ...document
    },
    success: true,
  }
}
