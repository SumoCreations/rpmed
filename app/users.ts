import { APIGatewayProxyHandler } from "aws-lambda"
import { IUser, User } from "./models"
import { response, Status } from "./net"
import { ICredentials, parseCredentials } from "./parsers"

interface IPublicUserInfo {
  id: string
  email: string
}

const publicUserInfo = (user: any): IPublicUserInfo => {
  const { email, id } = user
  return { id, email }
}

export const create: APIGatewayProxyHandler = async event => {
  let credentials: ICredentials | null
  try {
    credentials = parseCredentials(event.body)
  } catch (e) {
    return response(Status.BadRequest, { user: e.message })
  }

  let user: IUser
  try {
    user = await User.create(credentials)
  } catch (e) {
    return response(Status.BadRequest, {}, { email: "already exists." })
  }
  return response(Status.OK, publicUserInfo(user))
}
