import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Modal } from 'rpmed-ui/lib/V1'

export const ModalView: React.FunctionComponent<RouteComponentProps<{}>> = ({
  history,
}) => {
  const back: React.MouseEventHandler = e => {
    e.stopPropagation()
    history.goBack()
  }

  return (
    <Modal.Container>
      <Modal.ContentRegion onClick={back} size={Modal.Size.default}>
        <Modal.Heading>Title</Modal.Heading>
        <p>Do something with a modal here...</p>
      </Modal.ContentRegion>
    </Modal.Container>
  )
}
