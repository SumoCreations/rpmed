import { useCreateUserMutation } from '../../../schema'
import { UsersDocument, UsersQuery } from '../../../schema'

export const useCreateUser = () => {
  const [createUser] = useCreateUserMutation({
    update: (cache, { data }) => {
      const response = data && data.response && data.response
      const errors = response && response.errors
      const user = response && response.user
      const { users } = cache.readQuery({
        query: UsersDocument,
      }) as UsersQuery
      if (errors && errors.length > 0) {
        return
      }
      if (!user) {
        return
      }
      if (!users) {
        return
      }
      cache.writeQuery({
        data: {
          users: [...users, user],
        },
        query: UsersDocument,
      })
    },
  })
  return createUser
}
