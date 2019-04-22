import * as Validation from "rpmed-validation-schema"
import { IUserInput, IUserOutput, User } from "../../models"

interface IMutationOutput {
  user?: IUserOutput
  errors?: Validation.ErrorList
  success: boolean
}

export const resolvers = {
  Mutation: {
    createUser: async (
      _: any,
      { userInput }: { userInput: IUserInput }
    ): Promise<IMutationOutput> => {
      try {
        await Validation.User.New.validate(userInput, { abortEarly: false })
      } catch (e) {
        return { errors: Validation.formatError(e), success: false }
      }

      const { email, password, firstName, lastName } = userInput
      const existingUser = await User.findByEmail(email)
      if (existingUser) {
        return {
          errors: [{
            message: "An account with this email address already exists.",
            path: "email"
          }],
          success: false
        }
      }

      try {
        const user = await User.create({ email, password, firstName, lastName })
        return { user: User.output(user), success: true }
      } catch (e) {
        return { success: false, errors: [{ message: "The user credentials provided were not valid.", path: "_" }] }
      }
    },

    destroyUser: async (
      _: any,
      { id }: { id: string }
    ): Promise<IMutationOutput> => {
      const user = await User.find(id)
      if (!user) {
        return { success: false, errors: [{ message: `No user exists with ID: '${id}'.`, path: "_" }] }
      }
      try {
        User.destroy(id)
      } catch (e) {
        return { success: false, errors: [{ message: "Could not remove user.", path: "_" }] }
      }
      return { user: User.output(user), success: true }
    },

    updateUser: async (
      _: any,
      { userInput }: { userInput: IUserInput }
    ): Promise<IMutationOutput> => {
      try {
        await Validation.User.Existing.validate(userInput, { abortEarly: false })
      } catch (e) {
        return { errors: Validation.formatError(e), success: false }
      }
      let user = await User.find(userInput.id)
      if (!user) {
        return { success: false, errors: [{ message: "The requested user could not be found.", path: "_" }] }
      }
      user = await User.update(userInput)
      return { user: User.output(user), success: true }
    },
  },

  Query: {
    user: async (_, args) => User.output(await User.find(args.id)),
    userWithEmail: async (_, args) =>
      User.output(await User.findByEmail(args.email)),
    users: async () => (await User.all()).map(User.output),
  },
}
