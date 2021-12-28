import { faPlus, faTrash, faPencil } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Box, Flex } from 'rebass'
import { useQuery } from '../../routes'
import {
  Actions,
  Card,
  Form,
  Heading,
  Input,
  Modal,
  Para,
  TextFormContent,
  Indicators,
  Tags,
} from 'rpmed-ui'
import {
  OptionalEmail,
  OptionalString,
  validateArrayOf,
  validation,
} from '../../validations'
import { CreateRGAGoodWidget } from './CreateRgaGoodWidget'
import {
  useRgaQuery,
  useDestroyRgaGoodMutation,
  useSubmitRgaForReviewMutation,
} from './graphql'
import { RgaGood, ValidationError, RgaStatus } from 'rpmed-schema'

const validationSchema = validation({
  goods: validateArrayOf(
    validation({
      customerEmail: OptionalEmail(),
      customerName: OptionalString(),
    })
  ),
})

interface IRGADetailFormValues {
  [key: string]: any
  id: string
  notes: string
  goods: RgaGood[]
}

export const RgaDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [userToken, setUserToken] = useState('')

  const history = useHistory()
  const handleNavigation = (path: string) => () => history.replace(path)

  const handleCaptcha = (token: string | null): void =>
    setUserToken(token || '')

  const { loading, data, refetch } = useRgaQuery({
    variables: { rgaId: id },
    fetchPolicy: 'network-only',
  })

  const goods = (data?.response?.rga?.goods ?? []) as RgaGood[]
  const shippingSpeed = data?.response?.rga?.shippingSpeed
  const status = data?.response?.rga?.status
  const [destroyRGAGood] = useDestroyRgaGoodMutation()

  const [submitForReview] = useSubmitRgaForReviewMutation()

  const onSubmit = () => {
    refetch()
    dismissGood()
  }

  const query = useQuery<{
    goodId?: string | null
    deleteId?: string | null
  }>()

  const dismissGood = () => query.set({ goodId: null })

  const setGood = (goodId: string): React.MouseEventHandler => e => {
    e.preventDefault()
    query.set({ goodId })
  }

  const deleteGood = (deleteId: string): React.MouseEventHandler => e => {
    e.preventDefault()
    query.set({ deleteId })
  }

  const goodToDelete = goods
    .map(g => g as RgaGood)
    .filter(g => g.id === query.search.deleteId)[0]

  const handleDismissDelete = () => query.set({ deleteId: null })
  const handleConfirmDelete = async () => {
    if (!query.search.deleteId) {
      return
    }
    await destroyRGAGood({
      variables: { id: query.search.deleteId, rgaId: id },
    })
    handleDismissDelete()
    refetch()
  }

  const handleRequestSubmission = async (
    values: IRGADetailFormValues,
    actions: FormikHelpers<IRGADetailFormValues>
  ) => {
    actions.setSubmitting(true)
    const submission = await submitForReview({
      variables: { id, notes: values.notes },
    })
    const errors = submission?.data?.submitRGAForReview.errors
    if (errors) {
      errors
        .map(e => e as ValidationError)
        .forEach(({ path, message }) => {
          actions.setFieldError(path, message)
        })
      return
    }
    actions.setSubmitting(false)
  }

  const hasRequiredInfo = userToken.length > 0 && goods.length > 0
  return (
    <TextFormContent>
      <p>
        RGA Reference Number: <strong>{id.substr(0, 13)}</strong>
      </p>
      <p>
        Add all applicable units and any associated customer information to your
        Return Good Authorization request. Providing the optional customer
        information will help expedite any current or future requests related to
        product warranty.
      </p>
      <Formik
        initialValues={{ goods } as IRGADetailFormValues}
        onSubmit={handleRequestSubmission}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid, isSubmitting, submitCount }) => {
          return (
            <Form.Form onSubmit={handleSubmit}>
              {query.search.goodId ? (
                <CreateRGAGoodWidget
                  rgaId={id}
                  good={goods.find(g => g.id === query.search.goodId)}
                  shippingSpeed={shippingSpeed ?? 'Ground'}
                  onDismiss={dismissGood}
                  onSubmit={onSubmit}
                />
              ) : null}
              <Flex flexDirection={'column'} width={1}>
                {loading ? (
                  <Box marginX="auto" marginY={3} alignSelf="center">
                    <Indicators.Spinner size="2x" />
                  </Box>
                ) : null}
                {goods.map(good => {
                  return (
                    <Flex marginBottom={2} key={good.id}>
                      <Card.View>
                        <Flex flexDirection="column">
                          <Flex>
                            <Flex marginRight="auto">
                              <Flex as="strong" marginRight={2}>
                                {good.modelNumber}
                              </Flex>
                              <Tags.List>
                                {good.lotted ? (
                                  <Tags.Primary>{good.serial}</Tags.Primary>
                                ) : null}
                                <Tags.Secondary>
                                  {good.warrantied
                                    ? 'Warrantied'
                                    : 'Not Warrantied'}
                                </Tags.Secondary>
                              </Tags.List>
                            </Flex>
                            <Actions.Group>
                              <Actions.Primary onClick={setGood(good.id)}>
                                <FontAwesomeIcon icon={faPencil} />
                              </Actions.Primary>
                              <Actions.Destructive
                                onClick={deleteGood(good.id)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Actions.Destructive>
                            </Actions.Group>
                          </Flex>
                          {good.notes && good.notes.length > 0 ? (
                            <Flex as="p" marginTop={2} marginBottom={0}>
                              {good.notes}
                            </Flex>
                          ) : null}
                        </Flex>
                      </Card.View>
                    </Flex>
                  )
                })}
                <Flex marginBottom={2}>
                  <Card.View onClick={setGood('new')}>
                    <Flex>
                      <Actions.Group>
                        <Actions.Primary>
                          <FontAwesomeIcon icon={faPlus} />
                        </Actions.Primary>
                      </Actions.Group>
                      <Box as="strong" marginLeft={2} marginY="auto">
                        Add Good
                      </Box>
                    </Flex>
                  </Card.View>
                </Flex>
              </Flex>
              <Card.View>
                <Form.Row>
                  <Form.RowItem size={Form.ItemSize.Long}>
                    <Input.Field
                      name="notes"
                      label="Is there anything else you'd like to let us to know?"
                      required={false}
                      type="textarea"
                    />
                  </Form.RowItem>
                </Form.Row>
              </Card.View>
              <Card.View>
                <Form.GeneralError name="_" />
                <Form.Captcha onChange={handleCaptcha} test={true} />
                <Form.Button
                  type="submit"
                  disabled={!hasRequiredInfo || !isValid || isSubmitting}
                >
                  <span>Request RGA</span>
                </Form.Button>
              </Card.View>
              {isSubmitting || (status && status !== RgaStatus.Issued) ? (
                <Modal.Dialog size={Modal.Size.small}>
                  <Flex flexDirection="column" paddingTop={3}>
                    {isSubmitting ? (
                      <Flex margin="auto" paddingBottom={3}>
                        <Indicators.Spinner size="3x" />
                      </Flex>
                    ) : (
                      <React.Fragment>
                        <Heading.Three>RGA Submitted</Heading.Three>
                        <Para.Book>
                          Your request has successfully been submitted. We are
                          awaiting your items. Please use the supplied RGA
                          number with your shipment:
                        </Para.Book>
                        <Para.Book>
                          <strong>{id.substr(0, 13)}</strong>
                        </Para.Book>
                        <Flex width={1} marginBottom={2}>
                          <Form.Button
                            onClick={handleNavigation('/medled/rga')}
                          >
                            <span>Submit Another RGA</span>
                          </Form.Button>
                        </Flex>
                        <Form.Button onClick={handleNavigation('/medled')}>
                          <span>Return to Customer Center</span>
                        </Form.Button>
                      </React.Fragment>
                    )}
                  </Flex>
                </Modal.Dialog>
              ) : null}
            </Form.Form>
          )
        }}
      </Formik>
      {goodToDelete ? (
        <Modal.Confirm
          title={`Remove RGA Item?`}
          message={`Are you sure you want to delete '${goodToDelete.modelNumber}'? You can not undo this action.`}
          onDismiss={handleDismissDelete}
          onConfirm={handleConfirmDelete}
          destructive={true}
        />
      ) : null}
    </TextFormContent>
  )
}
