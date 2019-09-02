interface IMutationError {
  path: string
  message: string
}

interface IMutationErrorOutput {
  success: boolean
  errors: IMutationError[]
}

export const generateMutationError = (
  errors: IMutationError[]
): IMutationErrorOutput => ({
  errors,
  success: false,
})
