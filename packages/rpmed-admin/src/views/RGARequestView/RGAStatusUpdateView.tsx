import { faTimes } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Box, Flex } from 'rebass'
import { RgaStatus, ValidationError } from 'rpmed-schema'
import { Actions, Heading, Indicators, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import { useRGA, useUpdateRGAStatus } from './graphql'
import {
  RGAStatusFormSubmitHandler,
  RgaStatusUpdateForm,
} from './RgaStatusUpdateForm'

export const RGAStatusUpdateView: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()

  const { loading, rga } = useRGA(params.rgaId ?? '')
  const updateRgaStatus = useUpdateRGAStatus(
    rga ? rga.status : RgaStatus.Issued
  )
  const handleSubmit: RGAStatusFormSubmitHandler = async (values, actions) => {
    const result = await updateRgaStatus({
      variables: {
        id: params.rgaId ?? '',
        notes: values.notes,
        status: params.status as RgaStatus,
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
    navigate(`/admin/rga/${params.status}/${params.rgaId}`, { replace: true })
  }

  const dismiss = () => {
    navigate(-1)
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
              <Heading.ToolBarOne>Update RGA Status</Heading.ToolBarOne>
              <Heading.ToolBarTwo>{params.rgaId}</Heading.ToolBarTwo>
            </Flex>
          </Box>
        </Toolbar.View>
        {loading || !rga ? (
          <Indicators.Spinner />
        ) : (
          <RgaStatusUpdateForm
            initialValues={{
              notes: '',
              status: params.status as RgaStatus,
            }}
            onSubmit={handleSubmit}
            onCancel={dismiss}
          />
        )}
      </Box>
    </Layout.FullScreen>
  )
}
