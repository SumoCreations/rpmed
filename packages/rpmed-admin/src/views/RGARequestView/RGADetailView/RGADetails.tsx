import { faPencil } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateTime } from 'luxon'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Flex } from 'rebass'
import { Maybe, Rga, RgaStatus, RgaStatusUpdate } from 'rpmed-schema'
import {
  Actions,
  Card,
  Divider,
  Form,
  Heading,
  Indicators,
  Tags,
} from 'rpmed-ui/lib/V1'
import { RGAStatusWidget } from '../RGAStatusWidget'

type StatusUpdateHandler = (status: RgaStatus) => any

interface IDetailViewProps {
  rga?: Rga
  loading: boolean
  onUpdate?: StatusUpdateHandler
}

const RgaStatusLog: React.FunctionComponent<{
  statusLog?: Array<Maybe<RgaStatusUpdate>>
}> = ({ statusLog }) => (
  <React.Fragment>
    {(statusLog || [])
      .map(l => l as RgaStatusUpdate)
      .map((l, i) => (
        <React.Fragment key={l.updatedOn || `update${i}`}>
          <Heading.Label>
            {l.status} by {l.updatedBy ? l.updatedBy.name : 'unknown'} on{' '}
            {DateTime.fromISO(l.updatedOn || '').toFormat('LLL, dd h:mm a')}
          </Heading.Label>
          <p>{l.notes}</p>
        </React.Fragment>
      ))}
  </React.Fragment>
)

const StatusForRga: React.FunctionComponent<{
  rga?: Rga
  onUpdate?: StatusUpdateHandler
}> = ({ rga, onUpdate: handleUpdate }) => {
  if (!rga) {
    return null
  }
  const clickHandler = (status: RgaStatus) => () =>
    handleUpdate && handleUpdate(status)
  switch (rga.status) {
    case RgaStatus.Issued:
      return (
        <React.Fragment>
          <p>
            If you know the partner has shipped the package you can update its
            status:
          </p>
          <Form.ButtonGroup>
            <Form.Button onClick={clickHandler(RgaStatus.AwaitingArrival)}>
              <span>Awaiting Arrival</span>
            </Form.Button>
            <Form.Button onClick={clickHandler(RgaStatus.Repairing)}>
              <span>Repairs Completed</span>
            </Form.Button>
          </Form.ButtonGroup>
        </React.Fragment>
      )
    case RgaStatus.Assessing:
      return (
        <React.Fragment>
          <p>
            If you have confirmed receipt of the goods for this RGA you should
            update its status:
          </p>
          <Form.ButtonGroup>
            <Form.Button onClick={clickHandler(RgaStatus.Repairing)}>
              <span>Repairs Completed</span>
            </Form.Button>
          </Form.ButtonGroup>
        </React.Fragment>
      )
    case RgaStatus.AwaitingArrival:
      return (
        <React.Fragment>
          <p>
            If you have confirmed the contents and issues regarding the RGA you
            should update its status:
          </p>
          <Form.ButtonGroup>
            <Form.Button onClick={clickHandler(RgaStatus.Assessing)}>
              <span>Assessment Completed</span>
            </Form.Button>
          </Form.ButtonGroup>
        </React.Fragment>
      )
    case RgaStatus.Repairing:
      return (
        <React.Fragment>
          <p>
            If all repairs have been completed the contents and issues regarding
            the RGA you should update its status:
          </p>
          <Form.ButtonGroup>
            <Form.Button onClick={clickHandler(RgaStatus.Shipping)}>
              <span>Ready for Shipping</span>
            </Form.Button>
          </Form.ButtonGroup>
        </React.Fragment>
      )
    case RgaStatus.Shipping:
      return (
        <React.Fragment>
          <p>
            This RGA has been shipped to the customer. No further action is
            necessary.
          </p>
          {/* <Form.ButtonGroup>
            <Form.Button onClick={clickHandler(RgaStatus.Closed)}>
              <span>Close this RGA</span>
            </Form.Button>
          </Form.ButtonGroup> */}
        </React.Fragment>
      )
    case RgaStatus.Closed:
      return <p>This RGA is now closed.</p>
    default:
      return null
  }
}

export const RGADetails: React.FunctionComponent<IDetailViewProps> = ({
  rga,
  loading,
  onUpdate: handleUpdate,
}) => {
  const history = useHistory()
  const handleEditClick = () =>
    rga ? history.push(`/admin/rga/update/${rga.id}/details`) : null
  return (
    <Card.Flat>
      <Flex>
        <Box width={1}>
          <Heading.Title>
            {loading ? <Indicators.Spinner size="lg" /> : rga ? rga.id : '----'}
          </Heading.Title>
        </Box>
        <Box width={1 / 4}>
          <Actions.Group>
            <Actions.Primary onClick={handleEditClick}>
              <FontAwesomeIcon icon={faPencil} />
            </Actions.Primary>
          </Actions.Group>
        </Box>
      </Flex>
      {rga ? (
        <Flex flexDirection="column">
          <Tags.List>
            <Tags.Primary>RGA</Tags.Primary>
            <Tags.Secondary>{rga.status}</Tags.Secondary>
            <Tags.Secondary>
              {DateTime.fromISO(rga.submittedOn).toFormat('yyyy-MM-dd')}
            </Tags.Secondary>
          </Tags.List>
          <Divider.Light />
          <Flex>
            <Box width={1 / 2}>
              <Heading.Label>Submitted By</Heading.Label>
              <p>{rga.submittedBy}</p>
            </Box>
            <Box width={1 / 2}>
              <Heading.Label>Item Count</Heading.Label>
              <p>{(rga.goods || []).length}</p>
            </Box>
          </Flex>
          <Flex>
            <Box width={1 / 2}>
              <Heading.Label>Shipping Speed </Heading.Label>
              <p>{rga.shippingSpeed}</p>
            </Box>
          </Flex>
          {(rga.goods || []).length > 0 ? (
            <React.Fragment>
              <Divider.Light />
              <Box marginTop={2}>
                <RGAStatusWidget status={rga.status} />
                <RgaStatusLog statusLog={rga.statusLog || []} />
                <Heading.Label>Next Steps</Heading.Label>
                <StatusForRga rga={rga} onUpdate={handleUpdate} />
              </Box>
            </React.Fragment>
          ) : null}
        </Flex>
      ) : null}
    </Card.Flat>
  )
}
