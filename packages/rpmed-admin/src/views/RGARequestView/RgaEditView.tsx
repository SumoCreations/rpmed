import { faTimes } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Flex, Text } from 'rebass'
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
import { useRGA, useUpdateRgaMutation } from './graphql'
import { ShippingSpeedSelect } from './RgaShippingSpeedSelect'

interface IRGAUpdateValues {
  shippingSpeed: string
  submittedBy: string
  submittedOn: string
}

export const RGAEditView: React.FC = () => {
  const { rgaId } = useParams<{ rgaId: string }>()
  const [updateRga] = useUpdateRgaMutation()
  const { loading, rga } = useRGA(rgaId ?? '')
  const formik = useFormik<IRGAUpdateValues>({
    enableReinitialize: true,
    initialValues: rga
      ? {
          shippingSpeed: rga.shippingSpeed || 'Ground',
          submittedBy: rga.submittedBy,
          submittedOn: rga.submittedOn,
        }
      : {
          shippingSpeed: 'Ground',
          submittedBy: '',
          submittedOn: '',
        },
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      await updateRga({
        variables: {
          rgaInput: {
            id: rga ? rga.id : '',
            shippingSpeed: values.shippingSpeed,
          },
        },
      })
      setSubmitting(false)
      handleDismiss()
    },
  })
  const handleShippingSpeed = (value: string) =>
    formik.setFieldValue('shippingSpeed', value)
  const navigate = useNavigate()
  const handleDismiss = () => navigate(-1)
  return (
    <Layout.FullScreen>
      <Box my={[1, 1, 1, 4]} mx="auto" width={[1, 1, 1, 3 / 4]}>
        <Toolbar.View>
          <Toolbar.Item spreadLeft={false}>
            <Actions.Group>
              <Actions.Toolbar onClick={handleDismiss}>
                <FontAwesomeIcon icon={faTimes} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
          <Box width={1} my="auto" mx={3}>
            <Flex flexDirection="column">
              <Heading.ToolBarOne>Update RGA Details</Heading.ToolBarOne>
              <Heading.ToolBarTwo>{rgaId}</Heading.ToolBarTwo>
            </Flex>
          </Box>
        </Toolbar.View>

        <Flex flexDirection="column">
          <Flex flexDirection="row-reverse">
            <Box width={1}>
              <Form.Form
                disabled={formik.isSubmitting || loading}
                onSubmit={formik.handleSubmit}
              >
                <Flex flexDirection="column">
                  <Flex flexDirection={['column', 'row']}>
                    <Flex
                      flexDirection="column"
                      width={[1, 1 / 2]}
                      marginRight={[0, 3]}
                    >
                      <Input.Field name="submittedBy" label="Submitted By">
                        <Input.Text
                          name="submittedBy"
                          value={formik.values.submittedBy}
                          disabled={true}
                        />
                      </Input.Field>
                    </Flex>
                    <Flex flexDirection="column" width={[1, 1 / 2]}>
                      <Input.Field name="submittedOn" label="Submitted On">
                        <Input.Text
                          name="submittedOn"
                          value={formik.values.submittedOn}
                          disabled={true}
                        />
                      </Input.Field>
                    </Flex>
                  </Flex>
                  <Flex flexDirection="column" width={[1, 3 / 4, 1 / 3]}>
                    <ShippingSpeedSelect
                      value={formik.values.shippingSpeed || 'Ground'}
                      onSelect={handleShippingSpeed}
                    />
                  </Flex>
                </Flex>
              </Form.Form>
            </Box>
          </Flex>
          <Divider.Light />
          <Box py={2}>
            <Form.GeneralError formik={formik} name="_" />
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
                disabled={formik.isSubmitting}
                onClick={formik.submitForm}
              >
                <Flex flexDirection="row" as="p" m="auto">
                  <Text as="span" margin="auto" width={1} textAlign="center">
                    Save Changes
                  </Text>
                  {formik.isSubmitting ? (
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
              <Form.Button destructive={true} onClick={handleDismiss}>
                <Flex flexDirection="row" as="p" m="auto">
                  <Text as="span" margin={0} width={1} textAlign="center">
                    Cancel
                  </Text>
                </Flex>
              </Form.Button>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Layout.FullScreen>
  )
}
