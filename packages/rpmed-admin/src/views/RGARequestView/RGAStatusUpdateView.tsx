import { faTimes } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Box, Flex } from 'rebass'
import { RgaStatus, ValidationError } from '../../schema'
import { Actions, Heading, Indicators, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import { useRGA, useUpdateRGAStatus } from './graphql'
import {
  RGAStatusFormSubmitHandler,
  RgaStatusUpdateForm,
} from './RgaStatusUpdateForm'

interface IRGARouterProps {
  rgaId: string
  status: RgaStatus
}

export const RGAStatusUpdateView: React.FC<RouteComponentProps<
  IRGARouterProps
>> = ({ history, match }) => {
  const { loading, rga } = useRGA(match.params.rgaId)
  const updateRgaStatus = useUpdateRGAStatus(
    rga ? rga.status : RgaStatus.Issued
  )
  const handleSubmit: RGAStatusFormSubmitHandler = async (values, actions) => {
    const result = await updateRgaStatus({
      variables: {
        id: match.params.rgaId,
        notes: values.notes,
        status: match.params.status,
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
    history.replace(`/admin/rga/${match.params.status}/${match.params.rgaId}`)
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
              <Heading.ToolBarOne>Update RGA Status</Heading.ToolBarOne>
              <Heading.ToolBarTwo>{match.params.rgaId}</Heading.ToolBarTwo>
            </Flex>
          </Box>
        </Toolbar.View>
        {loading || !rga ? (
          <Indicators.Spinner />
        ) : (
          <RgaStatusUpdateForm
            initialValues={{
              notes: '',
              status: match.params.status,
            }}
            onSubmit={handleSubmit}
            onCancel={dismiss}
          />
        )}
      </Box>
    </Layout.FullScreen>
  )
}
