import { Document } from '../../../../models'
import { generateMutationError } from 'api-utils'
import { ErrorDocumentInvalid, ErrorDocumentNotFound } from '../documentErrors'
import {
  MutationDestroyDocumentArgs,
  DocumentMutationOutput,
} from 'rpmed-schema'
import {
  ServerContext,
  generateAuthorizationError,
  isAuthorizedUser,
} from '../../../auth'

export const destroyDocument = async (
  _,
  { id }: MutationDestroyDocumentArgs,
  context: ServerContext
): Promise<DocumentMutationOutput> => {
  if (!isAuthorizedUser(context)) {
    return generateAuthorizationError()
  }
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
      ...document,
    },
    success: true,
  }
}
