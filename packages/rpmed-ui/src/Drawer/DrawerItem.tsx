import React from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface DrawerItemProps {
  name: string
  icon: IconDefinition
  onClick?: () => void
}

const styles = {
  button:
    'flex text-white text-lg font-semibold p-2 font-display w-full m-0 hover:bg-black hover:bg-opacity-5',
  icon: 'mx-auto',
  iconWrap: 'flex w-24 p-0 mx-0 my-auto',
  text: 'ml-3 mr-auto',
}

export const DrawerItem: React.FC<DrawerItemProps> = ({
  name,
  icon,
  onClick,
}) => {
  const handleClick: React.MouseEventHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onClick?.()
  }

  return (
    <button onClick={handleClick} disabled={!onClick} className={styles.button}>
      <p className={styles.iconWrap}>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
      </p>
      <span className={styles.text}>{name}</span>
    </button>
  )
}
