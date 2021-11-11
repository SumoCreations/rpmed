import { useUpdateUserMutation } from '../../../schema'

export const useUpdateUser = () => {
  const [updateUser] = useUpdateUserMutation()
  return updateUser
}
