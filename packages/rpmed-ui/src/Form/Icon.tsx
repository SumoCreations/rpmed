import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type IconRendererMode = 'default' | 'primary' | 'secondary' | 'negative'

export interface IconProps {
  /**
   * The FontAwesome icon definition to be utilized.
   */
  icon: IconDefinition
  /**
   * The determines the color of the icon.
   */
  mode: IconRendererMode
}

const BASE_ICON = 'flex m-auto'
const DEFAULT_ICON = `${BASE_ICON} text-current`
const PRIMARY_ICON = `${BASE_ICON} text-accent-default`
const SECONDARY_ICON = `${BASE_ICON} text-primary-default hover:text-primary-dark`
const NEGATIVE_ICON = `${BASE_ICON} text-white`

const classForMode = (mode?: IconRendererMode) => {
  switch (mode) {
    case 'primary':
      return PRIMARY_ICON
    case 'secondary':
      return SECONDARY_ICON
    case 'negative':
      return NEGATIVE_ICON
    default:
      return DEFAULT_ICON
  }
}
export const Icon: FC<IconProps> = ({ icon, mode }) => {
  return <FontAwesomeIcon className={classForMode(mode)} icon={icon} />
}
