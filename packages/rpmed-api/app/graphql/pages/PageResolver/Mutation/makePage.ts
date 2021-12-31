import { Page } from '../../../../models'
import * as Validation from '../../../../validations'
import { ErrorPageWithSlugAlreadyExists, ErrorPageInvalid } from '../pageErrors'
import { PageInput, PageMutationOutput } from 'rpmed-schema'

export const makePage = async (
  _: any,
  { pageInput }: { pageInput: PageInput }
): Promise<PageMutationOutput> => {
  try {
    await Validation.Page.Default.validate(pageInput, {
      abortEarly: false,
    })
  } catch (e) {
    return { errors: Validation.formatError(e), success: false }
  }

  const { id, slug } = pageInput
  const existingPage = await Page.findBySlug(slug)
  if (existingPage && existingPage?.id !== id) {
    return {
      errors: [ErrorPageWithSlugAlreadyExists],
      success: false,
    }
  }
  try {
    const page = await Page.make({
      ...(pageInput as any),
      slug: existingPage?.slug === 'root' ? 'root' : slug, // root page cannot be renamed or changed.
    })
    return { page: Page.output(page), success: true }
  } catch (e) {
    console.log('PAGE MAKE ERROR!')
    console.log(e)
    return { success: false, errors: [ErrorPageInvalid] }
  }
}
