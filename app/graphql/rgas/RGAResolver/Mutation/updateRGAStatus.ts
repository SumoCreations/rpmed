import { IUser, RGA, User } from '../../../../models'
import * as oauth from '../../../../oauth'
import {
  MutationUpdateRgaStatusArgs,
  Rga,
  RgaMutationOutput,
} from '../../../../schema'
import {
  ErrorRGAWithIDDoesNotExist,
  ErrorUserProfileNotFound,
} from '../rgaErrors'

type UpdateRgaStatusResolver = (
  parent: any,
  args: MutationUpdateRgaStatusArgs,
  ctx: any
) => Promise<RgaMutationOutput>

/**
 * Retrieves the current user ID from an access token
 * or temporary access token.
 * @param token The access token passed to the authorization context.
 */
const getUserFromToken = async (token: string): Promise<IUser | null> => {
  try {
    const decoded: any = oauth.decode(token)
    const user = await User.find(decoded.userId)
    return user
  } catch (e) {
    // tslint:disable-next-line
    console.log(e)
  }
  return null
}

/**
 * A GraphQL resolver that handles the 'CreateRGA' mutation.
 */
export const updateRGAStatus: UpdateRgaStatusResolver = async (
  _,
  { id, notes, status },
  ctx: any
) => {
  const existing = await RGA.find(id)
  if (!existing) {
    return { success: false, errors: [ErrorUserProfileNotFound] }
  }
  const user = await getUserFromToken(ctx.authorization)
  if (!user) {
    return { success: false, errors: [ErrorRGAWithIDDoesNotExist] }
  }
  const rga = await RGA.updateStatus({
    id,
    notes,
    status,
    updatedBy: {
      email: user.email,
      id: user.partitionKey,
      name: `${user.firstName} ${user.lastName}`,
    },
  })
  return {
    rga: {
      ...RGA.output(rga),
      distributor: { id: null, domain: null },
      goods: [],
    } as Rga,
    success: true,
  }
}
