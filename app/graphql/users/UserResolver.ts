import { IUser, IUserInput, User } from "../../models"

export const resolvers = {
  Mutation: {
    createUser: async (
      _: any,
      { email, password, firstName, lastName }: IUserInput
    ): Promise<IUser> => {
      const user = await User.create({ email, password, firstName, lastName })
      return user
    },
  },
  Query: {
    user: async (_, args) => await User.find(args.id),
    userWithEmail: async (_, args) => await User.findByEmail(args.email),
    users: async () => await User.all(),
  },
}
