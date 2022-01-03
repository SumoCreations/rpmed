import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'rpmed-ui/lib/V1'

export const ModalView: React.FC = () => {
  const navigate = useNavigate()
  const back: React.MouseEventHandler = e => {
    e.stopPropagation()
    navigate(-1)
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
