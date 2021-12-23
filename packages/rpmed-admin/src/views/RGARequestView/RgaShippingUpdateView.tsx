/* eslint-disable no-template-curly-in-string */
import {
  faBarcode,
  faEnvelope,
  faStickyNote,
  faTimes,
} from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik, FormikHelpers } from 'formik'
import get from 'lodash.get'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Box, Flex, Text } from 'rebass'
import { RequiredEmail } from 'rpmed-validation-schema'
import * as Yup from 'yup'
import {
  RgaGood,
  RgaGoodShippingInput,
  RgaShippingCarrier,
  RgaShippingStatus,
  RgaStatus,
  ValidationError,
} from 'rpmed-schema'
import {
  Actions,
  Divider,
  Form,
  Heading,
  Indicators,
  Input,
  Layout,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import { useRGA, useUpdateShippingStatus } from './graphql'
import { RGAStatusWidget } from './RGAStatusWidget'

interface IRGARouterProps {
  rgaId: string
  status: RgaStatus
}

interface IRGAUpdateStatusFormValues {
  status: RgaStatus
  notes: string
  shippingUpdates: RgaGoodShippingInput[]
}

const testForMessage: any = (s: any, r: any) => {
  return s === RgaShippingStatus.Shipped && r.length > 0
}

const validationSchema = Yup.object().shape({
  notes: Yup.string(),
  shippingUpdates: Yup.array(
    Yup.object().shape({
      carrier: Yup.string().when('status', {
        is: s => s === RgaShippingStatus.Shipped,
        then: Yup.string().required('cannot be blank'),
      }),
      message: Yup.string().when(['status', 'recipients'], {
        is: testForMessage,
        then: Yup.string().required('cannot be blank'),
      }),
      recipients: Yup.array(RequiredEmail()).when('status', {
        is: s => s === RgaShippingStatus.Shipped,
        then: Yup.array(RequiredEmail()).min(1),
      }),
      status: Yup.string().required('cannot be blank'),
      tracking: Yup.string().when('status', {
        is: s => s === RgaShippingStatus.Shipped,
        then: Yup.string().required('cannot be blank'),
      }),
    })
  ).required(),
})

const FormField = Input.Renderer<IRGAUpdateStatusFormValues>()

export const RGAShippingUpdateView: React.FC<RouteComponentProps<
  IRGARouterProps
>> = ({ history, match }) => {
  const { loading, rga } = useRGA(match.params.rgaId)
  const updateRgaShippingStatus = useUpdateShippingStatus()
  const handleSubmitForm = async (
    values: IRGAUpdateStatusFormValues,
    actions: FormikHelpers<IRGAUpdateStatusFormValues>
  ) => {
    const result = await updateRgaShippingStatus({
      variables: {
        id: match.params.rgaId,
        notes: values.notes,
        shippingUpdates: values.shippingUpdates,
      },
    })
    actions.setSubmitting(false)
    const errors = (get(result, 'data.response.errors') ||
      []) as ValidationError[]
    if (errors.length > 0) {
      errors.forEach(({ path, message }) => {
        actions.setFieldError(path as 'notes' | 'status', message)
      })
      return
    }
    const updatedRga =
      result.data && result.data.response && result.data.response.rga
    const status = updatedRga ? updatedRga.status : 'closed'
    history.replace(`/admin/rga/${status}/${match.params.rgaId}`)
  }

  const dismiss = () => {
    history.goBack()
  }

  return (
    <Layout.FullScreen>
      <Box my={[1, 1, 1, 4]} mx="auto" width={[1, 1, 1, 3 / 4]}>
        <Toolbar.View>
          <Toolbar.Item spreadLeft={false}>
            <Actions.Group>
              <Actions.Toolbar onClick={dismiss}>
                <FontAwesomeIcon icon={faTimes} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
          <Box width={1} my="auto" mx={3}>
            <Flex flexDirection="column">
              <Heading.ToolBarOne>Ship RGA</Heading.ToolBarOne>
              <Heading.ToolBarTwo>{match.params.rgaId}</Heading.ToolBarTwo>
            </Flex>
          </Box>
        </Toolbar.View>
        {loading || !rga ? (
          <Indicators.Spinner />
        ) : (
          <Formik
            initialValues={
              rga
                ? {
                  notes: '',
                  shippingUpdates: rga.goods
                    .map(g => g as RgaGood)
                    .map(
                      g =>
                      ({
                        id: g.id,
                        message:
                          'Hello ${NAME}, MedLED® Lighting has processed headlight return. Please keep the following details for your records.\n\nTracking Number: ${TRACKING} (${TRACKING_URL})\nModel Number / Serial: ${MODEL} / ${SERIAL}',
                        recipients: [
                          g.customerEmail,
                          rga.submittedBy,
                        ].filter(r => r && r.length > 0),
                        status: RgaShippingStatus.Shipped,
                        tracking: '',
                      } as RgaGoodShippingInput)
                    ),
                  status: RgaStatus.Shipping,
                }
                : {
                  notes: '',
                  recipients: [],
                  shippingUpdates: [] as RgaGoodShippingInput[],
                  status: RgaStatus.Shipping,
                }
            }
            enableReinitialize={true}
            onSubmit={handleSubmitForm}
            validationSchema={validationSchema}
          >
            {({
              handleSubmit,
              initialValues,
              isSubmitting,
              setFieldValue,
              submitForm,
              values,
            }) => {
              const handleRemoveRecipient = (
                index: number,
                recipient: string
              ): React.MouseEventHandler => e => {
                e.preventDefault()
                const updatedShippingInfo = [...values.shippingUpdates]
                updatedShippingInfo.splice(index, 1, {
                  ...values.shippingUpdates[index],
                  recipients: (
                    values.shippingUpdates[index].recipients || []
                  ).filter(r => r !== recipient),
                })
                setFieldValue('shippingUpdates', updatedShippingInfo)
              }
              const handleAddRecipient = (
                index: number
              ): React.MouseEventHandler => e => {
                e.preventDefault()
                const updatedShippingInfo = [...values.shippingUpdates]
                updatedShippingInfo.splice(index, 1, {
                  ...values.shippingUpdates[index],
                  recipients: [
                    ...(values.shippingUpdates[index].recipients || []),
                    '',
                  ],
                })
                setFieldValue('shippingUpdates', updatedShippingInfo)
              }
              return (
                <Flex flexDirection="column">
                  <Flex flexDirection="row-reverse">
                    <Box width={1}>
                      <Form.Form
                        disabled={isSubmitting}
                        onSubmit={handleSubmit}
                      >
                        <Flex flexDirection="column">
                          <Heading.Label>Ship RGA Goods</Heading.Label>
                          <p>
                            You are setting the status to{' '}
                            <strong>shipping</strong>. The goods associated to
                            this RGA are being returned to the associated
                            partner(s) or customer(s).
                          </p>
                          <RGAStatusWidget status={initialValues.status} />
                          <Flex flexDirection="column" width={[1, 1, 3 / 4]}>
                            <Heading.Label>
                              Internal Notes (not shown to customer)
                            </Heading.Label>
                            <FormField
                              name="notes"
                              label="Any specific notes about this update?"
                              placeholder=""
                              component={Input.RendererComponent.TextArea}
                              required={false}
                              icon={faStickyNote}
                            />
                          </Flex>
                          {rga.goods
                            .map(g => g as RgaGood)
                            .map((g, i) => {
                              const isDelayed =
                                values.shippingUpdates[i] &&
                                values.shippingUpdates[i].status ===
                                RgaShippingStatus.Delayed
                              const noRecipients =
                                (values.shippingUpdates[i].recipients || [])
                                  .length < 1
                              return (
                                <Flex
                                  flexDirection="column"
                                  key={`shippingUpdates${g.id}`}
                                >
                                  <Divider.Light />
                                  <Heading.Label>
                                    {g.modelNumber} for {g.customerName} ({g.id}
                                    )
                                  </Heading.Label>
                                  <Flex
                                    width={[1, 2 / 3, 1 / 2]}
                                    flexDirection={['column', 'row']}
                                  >
                                    <Flex
                                      width={[1, 1 / 2]}
                                      marginRight={[0, 3]}
                                    >
                                      <FormField
                                        name={`shippingUpdates.${i}.status`}
                                        label="Status"
                                        placeholder=""
                                        component={
                                          Input.RendererComponent.Select
                                        }
                                        required={true}
                                        icon={faStickyNote}
                                      >
                                        <option
                                          value={RgaShippingStatus.Shipped}
                                        >
                                          Shipping
                                        </option>
                                        <option
                                          value={RgaShippingStatus.Delayed}
                                        >
                                          Delayed
                                        </option>
                                      </FormField>
                                    </Flex>
                                    {!isDelayed ? (
                                      <Flex
                                        width={[1, 1 / 2]}
                                        marginRight={[0, 3]}
                                      >
                                        <FormField
                                          name={`shippingUpdates.${i}.carrier`}
                                          label="Carrier"
                                          placeholder=""
                                          component={
                                            Input.RendererComponent.Select
                                          }
                                          required={true}
                                          icon={faStickyNote}
                                        >
                                          <option />
                                          <option
                                            value={RgaShippingCarrier.Fedex}
                                          >
                                            FedEx
                                          </option>
                                          <option
                                            value={RgaShippingCarrier.Ups}
                                          >
                                            UPS
                                          </option>
                                          <option
                                            value={RgaShippingCarrier.Dhl}
                                          >
                                            DHL
                                          </option>
                                          <option
                                            value={RgaShippingCarrier.Other}
                                          >
                                            Other
                                          </option>
                                        </FormField>
                                      </Flex>
                                    ) : null}
                                    <Flex width={[1, 1 / 2]}>
                                      <FormField
                                        name={`shippingUpdates.${i}.tracking`}
                                        label="Tracking Number"
                                        placeholder=""
                                        disabled={isDelayed}
                                        component={Input.RendererComponent.Text}
                                        required={true}
                                        icon={faBarcode}
                                      />
                                    </Flex>
                                  </Flex>
                                  {!isDelayed ? (
                                    <React.Fragment>
                                      <Heading.Label>Recipients</Heading.Label>
                                      <Flex flexDirection={['column']}>
                                        {(
                                          values.shippingUpdates[i]
                                            .recipients || []
                                        ).map((r, ii) => (
                                          <Flex
                                            width={[1, 1 / 3]}
                                            key={`recipient_${g.id}_${ii}`}
                                            marginRight={3}
                                          >
                                            <FormField
                                              name={`shippingUpdates.${i}.recipients.${ii}`}
                                              placeholder=""
                                              disabled={isDelayed}
                                              component={
                                                Input.RendererComponent.Text
                                              }
                                              icon={faEnvelope}
                                            />
                                            <Flex marginLeft={2}>
                                              <Actions.Destructive
                                                onClick={handleRemoveRecipient(
                                                  i,
                                                  r || ''
                                                )}
                                              >
                                                <FontAwesomeIcon
                                                  icon={faTimes}
                                                />
                                              </Actions.Destructive>
                                            </Flex>
                                          </Flex>
                                        ))}
                                        <Flex width={[1, 1 / 3]}>
                                          <Form.Button
                                            type="button"
                                            disabled={isSubmitting}
                                            onClick={handleAddRecipient(i)}
                                          >
                                            <span>Add Recipient</span>
                                          </Form.Button>
                                        </Flex>
                                      </Flex>
                                      <FormField
                                        name={`shippingUpdates.${i}.message`}
                                        label="Customer Message"
                                        placeholder=""
                                        disabled={isDelayed || noRecipients}
                                        component={
                                          Input.RendererComponent.TextArea
                                        }
                                        required={true}
                                        icon={faStickyNote}
                                      />
                                      <Form.Small>
                                        You can utilize{' '}
                                        <strong>{'${NAME}'}</strong>,{' '}
                                        <strong>{'${TRACKING}'}</strong>,{' '}
                                        <strong>{'${TRACKING_URL}'}</strong>,{' '}
                                        <strong>{'${MODEL}'}</strong>,{' '}
                                        <strong>{'${SERIAL}'}</strong>,{' '}
                                        <strong>{'${RGA}'}</strong>, and{' '}
                                        <strong>{'${RMA}'}</strong> to embed
                                        values into your message.
                                      </Form.Small>
                                    </React.Fragment>
                                  ) : null}
                                </Flex>
                              )
                            })}
                        </Flex>
                      </Form.Form>
                    </Box>
                  </Flex>
                  <Divider.Light />
                  <Box py={2}>
                    <Form.GeneralError name="_" />
                  </Box>
                  <Flex
                    flexDirection={[
                      'column',
                      'column',
                      'column',
                      'row-reverse',
                      'row-reverse',
                    ]}
                  >
                    <Box
                      marginLeft={[0, 0, 0, 2]}
                      width={[1, 1, 1, 1 / 3, 1 / 4]}
                    >
                      <Form.Button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={submitForm}
                      >
                        <Flex flexDirection="row" as="p" m="auto">
                          <Text
                            as="span"
                            margin="auto"
                            width={1}
                            textAlign="center"
                          >
                            Save Changes
                          </Text>
                          {isSubmitting ? (
                            <Box as="span" marginLeft={2}>
                              <Indicators.Spinner size={'lg'} />
                            </Box>
                          ) : null}
                        </Flex>
                      </Form.Button>
                    </Box>
                    <Box
                      marginLeft={[0, 0, 0, 'auto']}
                      marginY={[2, 2, 2, 0, 0]}
                      width={[1, 1, 1, 1 / 4, 1 / 5]}
                    >
                      <Form.Button destructive={true} onClick={dismiss}>
                        <Flex flexDirection="row" as="p" m="auto">
                          <Text
                            as="span"
                            margin={0}
                            width={1}
                            textAlign="center"
                          >
                            Cancel
                          </Text>
                        </Flex>
                      </Form.Button>
                    </Box>
                  </Flex>
                </Flex>
              )
            }}
          </Formik>
        )}
      </Box>
    </Layout.FullScreen>
  )
}
/* eslint-enable no-template-curly-in-string */
