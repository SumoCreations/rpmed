import * as React from 'react'
import * as Card from '../Card'
import * as Modal from './Modal'

interface IDialogProps {
  onDismiss?: () => void
  size?: Modal.Size
  dismissViaBackground?: boolean
}

export const Dialog: React.FunctionComponent<IDialogProps> = ({
  onDismiss,
  size,
  children,
  dismissViaBackground,
}) => {
  const handleRegionClick: React.MouseEventHandler = e => {
    e.stopPropagation()
  }
  return (
    <Modal.Container
      onClick={dismissViaBackground ? onDismiss : undefined}
      transparent={true}
    >
      <Modal.ContentRegion
        size={size || Modal.Size.small}
        onClick={handleRegionClick}
      >
        <Card.View>{children}</Card.View>
      </Modal.ContentRegion>
    </Modal.Container>
  )
}
