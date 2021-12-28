import * as React from 'react'
import * as Card from '../Card'
import * as Form from '../Form'
import * as Heading from '../Heading'
import * as Para from '../Para'
import * as Modal from './Modal'

interface IDialogProps {
  title: string
  message: string
  onDismiss: () => void
  onConfirm: () => void
  destructive?: boolean
}

export const Confirm: React.FunctionComponent<IDialogProps> = (p: any) => (
  <Modal.Container onClick={p.onDismiss} transparent={true}>
    <Modal.ContentRegion size={Modal.Size.small}>
      <Card.View>
        <Heading.Three>{p.title}</Heading.Three>
        <Para.Book>{p.message}</Para.Book>
        <Form.ButtonGroup>
          <Form.Button onClick={p.onDismiss}>
            <span>Cancel</span>
          </Form.Button>
          <Form.Button onClick={p.onConfirm} destructive={p.destructive}>
            <span>Confirm</span>
          </Form.Button>
        </Form.ButtonGroup>
      </Card.View>
    </Modal.ContentRegion>
  </Modal.Container>
)
