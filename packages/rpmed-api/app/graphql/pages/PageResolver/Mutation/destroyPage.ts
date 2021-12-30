import { Page } from '../../../../models'
import { generateMutationError } from 'api-utils'
import { ErrorPageInvalid, ErrorPageNotFound } from '../pageErrors'
import { MutationDestroyPageArgs, PageMutationOutput } from 'rpmed-schema'

export const destroyPage = async (
  _: any,
  { id }: MutationDestroyPageArgs
): Promise<PageMutationOutput> => {
  const page = await Page.find(id)
  if (!page) {
    return generateMutationError([ErrorPageNotFound])
  }
  if (page.slug === 'root') {
    return generateMutationError([ErrorPageInvalid])
  }
  try {
    await Page.destroy(id)
  } catch (e) {
    return generateMutationError([ErrorPageInvalid])
  }
  return {
    page: {
      ...page,
    },
    success: true,
  }
}
