import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-regular-svg-icons'

export interface DrawerProps {
  open?: boolean
  title?: string
  onDismiss?: () => void
}

const styles = {
  container:
    'fixed left-0 top-0 w-96 bg-accent-default flex flex-col p-4 z-40 h-screen text-white',
  title: 'flex text-2xl font-display font-semibold mb-8',
  button: 'w-24 mr-2 flex hover:bg-accent-dark',
  icon: 'm-auto',
  overlay:
    'fixed top-0 left-0 w-screen h-screen z-30 bg-primary-default bg-opacity-10',
}

export const Drawer: React.FC<DrawerProps> = ({
  title,
  open,
  children,
  onDismiss,
}) => {
  const handleDismiss: React.MouseEventHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onDismiss?.()
  }

  const handleDrawerClick: React.MouseEventHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return open ? (
    <div className={styles.overlay} onClick={handleDismiss}>
      <nav className={styles.container} onClick={handleDrawerClick}>
        <h1 className={styles.title}>
          <button className={styles.button} onClick={handleDismiss}>
            <FontAwesomeIcon icon={faTimes} className={styles.icon} />
          </button>{' '}
          {title ? <span>{title}</span> : null}
        </h1>
        {children}
      </nav>
    </div>
  ) : null
}
