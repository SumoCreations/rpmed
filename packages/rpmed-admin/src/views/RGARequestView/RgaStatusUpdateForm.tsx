import { faStickyNote } from '@fortawesome/pro-regular-svg-icons'
import { Formik, FormikHelpers } from 'formik'
import React from 'react'
import { Box, Flex, Text } from 'rebass'
import { RgaStatus } from 'rpmed-schema'
import { Divider, Form, Heading, Indicators, Input } from 'rpmed-ui/lib/V1'
import { RGAStatusWidget } from './RGAStatusWidget'

export type RGAStatusFormSubmitHandler = (
  values: IRGAUpdateStatusFormValues,
  actions: FormikHelpers<IRGAUpdateStatusFormValues>
) => void

export interface IRGAUpdateStatusFormValues {
  status: RgaStatus
  notes: string
}

interface IRGAGoodFormProps {
  initialValues: IRGAUpdateStatusFormValues
  onSubmit: RGAStatusFormSubmitHandler
  onCancel: () => any
}

export const FormField = Input.Renderer<IRGAUpdateStatusFormValues>()

const StatusDescription: React.FC<{ status: RgaStatus }> = ({ status }) => {
  switch (status) {
    case RgaStatus.AwaitingArrival:
      return (
        <p>
          You are setting the status to <strong>awaiting arrival</strong>. This
          confirms the items for this RGA has shipped and we are waiting to
          receive the delivery at RPMED.
        </p>
      )
    case RgaStatus.Assessing:
      return (
        <p>
          You are setting the status to <strong>assessed</strong>. The goods
          associated to this RGA have been assessed and are ready for the repair
          team to handle.
        </p>
      )
    case RgaStatus.Repairing:
      return (
        <p>
          You are setting the status to <strong>repaired</strong>. The goods
          associated to this RGA have been repaired and are should now be
          returned to the associated partner.
        </p>
      )
    case RgaStatus.Shipping:
      return (
        <p>
          You are setting the status to <strong>shipping</strong>. The goods
          associated to this RGA have been returned to the associated partner.
        </p>
      )
    case RgaStatus.Closed:
      return (
        <p>
          You are setting the status to <strong>closed</strong>. The associated
          partner has received the repaired goods associated to this RGA.
        </p>
      )
  }
  return null
}

export const RgaStatusUpdateForm: React.FunctionComponent<IRGAGoodFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isSubmitting, submitForm }) => {
        return (
          <Flex flexDirection="column">
            <Flex flexDirection="row-reverse">
              <Box width={1}>
                <Form.Form disabled={isSubmitting} onSubmit={handleSubmit}>
                  <Flex flexDirection="column">
                    <Heading.Label>New Status</Heading.Label>
                    <StatusDescription status={initialValues.status} />
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
              <Box marginLeft={[0, 0, 0, 2]} width={[1, 1, 1, 1 / 3, 1 / 4]}>
                <Form.Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  <Flex flexDirection="row" as="p" m="auto">
                    <Text as="span" margin="auto" width={1} textAlign="center">
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
                <Form.Button destructive={true} onClick={onCancel}>
                  <Flex flexDirection="row" as="p" m="auto">
                    <Text as="span" margin={0} width={1} textAlign="center">
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
  )
}
