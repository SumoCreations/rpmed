import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { Box, Flex } from 'rebass'
import { useQuery } from '../../../routes'
import { Rga, RgaGood, RgaStatus } from '../../../schema'
import {
  Actions,
  Content,
  Divider,
  Layout,
  Modal,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import { useDestroyRGAGood, useRGA } from '../graphql'
import { CreateRGAGoodWidget } from './CreateRgaGoodWidget'
import { EditRGAGoodView } from './EditRgaGoodView'
import { RGADetails } from './RGADetails'
import { RGAGoodsList } from './RgaGoodsList'

interface IRGARouterProps {
  rgaId: string
}

const statusesWithEditableGoods = [
  RgaStatus.Issued,
  RgaStatus.AwaitingArrival,
  RgaStatus.Repairing,
  RgaStatus.Assessing,
  RgaStatus.Shipping,
]

const View: React.FunctionComponent<RouteComponentProps<IRGARouterProps>> = ({
  history,
  match,
}) => {
  const { search, set: setSearch } = useQuery<{
    editId?: string | null
    deleteId?: string | null
  }>()
  const destroyRGAGood = useDestroyRGAGood()
  const { loading, rga, refetch } = useRGA(match.params.rgaId)
  const handleBack = () => history.push(`/admin/rga/${rga ? rga.status : ''}`)
  const handleServiceForm = (good: RgaGood) => {
    if (good.serviceFormUrl) {
      window.location.href = good.serviceFormUrl
    } else {
      refetch()
    }
  }
  const handleCustomerLetter = (good: RgaGood) => {
    if (good.customerLetterUrl) {
      window.location.href = good.customerLetterUrl
    } else {
      refetch()
    }
  }
  const handleUpdatedGood = () => {
    refetch()
  }

  const handleEdit = (good: RgaGood) => {
    setSearch({ editId: good.id }, true)
  }
  const handleDismissEdit = () => setSearch({ editId: null }, true)
  const handleDelete = (good: RgaGood) => {
    setSearch({ deleteId: good.id }, true)
  }
  const handleDismissDelete = () => setSearch({ deleteId: null })
  const handleConfirmDelete = () => {
    if (!search.deleteId) {
      return
    }
    destroyRGAGood({
      variables: { id: search.deleteId, rgaId: match.params.rgaId },
    })
    handleDismissDelete()
  }
  const handleStatusUpdate = (status: RgaStatus) => {
    history.push(`/admin/rga/update/${rga ? rga.id : ''}/${status}`)
  }
  const canEdit = statusesWithEditableGoods.includes(
    rga ? rga.status : RgaStatus.Closed
  )
  const goodToDelete =
    rga && search.deleteId
      ? rga.goods
          .map(g => g as RgaGood)
          .filter(g => g.id === search.deleteId)[0]
      : null
  const goodToEdit =
    rga && search.editId
      ? rga.goods.map(g => g as RgaGood).filter(g => g.id === search.editId)[0]
      : null
  return (
    <Layout.Layout>
      <Helmet title={`${rga ? rga.id : 'Loading RGA'} - RPMed Service Admin`} />
      <Content>
        <Toolbar.View>
          <Toolbar.Item spreadLeft={false}>
            <Actions.Group>
              <Actions.Toolbar onClick={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
        </Toolbar.View>

        <Flex flexDirection={['column', 'column', 'column', 'row']}>
          <Box width={[1, 1, 1, 2 / 3]} marginRight={[0, 0, 0, 2]}>
            <Flex flexDirection="column">
              <RGADetails
                rga={(rga || {}) as Rga}
                loading={loading}
                onUpdate={handleStatusUpdate}
              />
              <Divider.Light />
              {rga ? (
                <RGAGoodsList
                  canEdit={canEdit}
                  goods={(rga.goods || []) as RgaGood[]}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onRequestServiceForm={handleServiceForm}
                  onRequestCustomerLetter={handleCustomerLetter}
                />
              ) : null}
            </Flex>
          </Box>
          {canEdit ? (
            <Box width={[1, 1, 1, 1 / 3]}>
              <CreateRGAGoodWidget
                rgaId={rga?.id ?? ''}
                shippingSpeed={rga?.shippingSpeed ?? ''}
                onCreate={handleUpdatedGood}
              />
            </Box>
          ) : null}
        </Flex>
      </Content>
      {goodToDelete && canEdit ? (
        <Modal.Dialog
          title={`Remove RGA Item?`}
          message={`Are you sure you want to delete '${goodToDelete.modelNumber}'? You can not undo this action.`}
          onDismiss={handleDismissDelete}
          onConfirm={handleConfirmDelete}
          destructive={true}
        />
      ) : null}
      {goodToEdit && rga && canEdit ? (
        <EditRGAGoodView
          good={goodToEdit}
          onDismiss={handleDismissEdit}
          rgaId={rga.id}
          onUpdate={handleUpdatedGood}
        />
      ) : null}
    </Layout.Layout>
  )
}

export const RGADetailView = View
