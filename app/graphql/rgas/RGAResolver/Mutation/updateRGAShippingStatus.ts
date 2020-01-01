import * as Yup from 'yup'
import * as email from '../../../../email'
import { IUser, RGA, RGAGood, User } from '../../../../models'
import * as oauth from '../../../../oauth'
import {
  MutationUpdateRgaShippingStatusArgs,
  Rga,
  RgaGoodStatus,
  RgaMutationOutput,
  RgaShippingCarrier,
  RgaShippingStatus,
  RgaStatus,
} from '../../../../schema'
import { generateMutationError } from '../../../../util'
import * as Validation from '../../../../validations'
import {
  ErrorRGAWithIDDoesNotExist,
  ErrorUserProfileNotFound,
} from '../rgaErrors'

type UpdateRgaStatusResolver = (
  parent: any,
  args: MutationUpdateRgaShippingStatusArgs,
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

const testForMessage: any = (s: any, r: any) => {
  return s === 'shipping' && r.length > 0
}

const validationSchema = Yup.object().shape({
  notes: Yup.string(),
  shippingUpdates: Yup.array(
    Yup.object().shape({
      message: Yup.string().when(['status', 'recipients'], {
        is: testForMessage,
        then: Yup.string().required('cannot be blank'),
      }),
      recipients: Yup.array(Validation.RequiredEmail()).when('status', {
        is: s => s === 'shipping',
        then: Yup.array(Validation.RequiredEmail()).min(1),
      }),
      status: Yup.string().required('cannot be blank'),
      tracking: Yup.string().when('status', {
        is: s => s === 'shipping',
        then: Yup.string().required('cannot be blank'),
      }),
    })
  ).required(),
})

/**
 * A GraphQL resolver that handles the 'CreateRGA' mutation.
 */
export const updateRGAShippingStatus: UpdateRgaStatusResolver = async (
  _,
  { id, notes, shippingUpdates },
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

  try {
    await validationSchema.validate(
      { notes, shippingUpdates },
      { abortEarly: false }
    )
  } catch (e) {
    return generateMutationError(Validation.formatError(e))
  }

  const delayedUpdates = shippingUpdates.filter(
    u => u.status === RgaShippingStatus.Delayed
  )
  const shippedUpdates = shippingUpdates.filter(
    u => u.status === RgaShippingStatus.Shipped
  )
  const status =
    delayedUpdates.length > 0 ? RgaStatus.Delayed : RgaStatus.Closed

  const urlForCarrier = (carrier: RgaShippingCarrier, tracking: string) => {
    switch (carrier) {
      case RgaShippingCarrier.Fedex:
        return `https://www.fedex.com/fedextrack/?tracknumbers=${tracking}`
      case RgaShippingCarrier.Ups:
        return `https://www.ups.com/track?loc=en_US&tracknum=${tracking}`
      case RgaShippingCarrier.Dhl:
        return `https://www.dhl.com/en/express/tracking.html?AWB=${tracking}&brand=DHL`
      default:
        return `https://easypackagetracker.org/track9/?keyword=All%20Carriers`
    }
  }
  // Send email notifications to each recipient.
  await Promise.all(
    shippedUpdates.map(async u => {
      try {
        const good = await RGAGood.find(id, u.id)
        await RGAGood.update({
          ...good,
          status:
            u.status === RgaShippingStatus.Shipped
              ? RgaGoodStatus.Valid
              : RgaGoodStatus.Delayed,
        })
        await Promise.all(
          u.recipients.map(async r => {
            const messageVars = {
              model: good.modelNumber,
              name: good.customerName || 'Valued Customer',
              rga: good.rgaId ? good.rgaId.substring(0, 13) : 'n/a',
              rma: good.rma || 'n/a',
              serial: good.lotted ? good.id : 'no serial #',
              tracking: u.tracking,
              trackingUrl: urlForCarrier(u.carrier, u.tracking),
            }
            await email.send({
              subject: '[MedLED] Item Shipping',
              template: email.Template.RgaGoodShippingConfirmation,
              to: [r],
              variables: {
                message: email.renderer(u.message, messageVars),
                messageHtml: email.renderer(
                  u.message.replace(/\n/gi, '<br/>'),
                  messageVars
                ),
                ...messageVars,
              },
            })
          })
        )
      } catch (e) {
        // tslint:disable-next-line
        console.log('Could not update good for shipping.')
        // tslint:disable-next-line
        console.log(e)
      }
    })
  )

  // Update RGA Status
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
