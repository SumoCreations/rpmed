import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface IMenuItemData {
  title: string
  description?: string
  link?: string
  icon?: IconDefinition
  blank?: boolean
}

export interface IMenuSection {
  heading: string
  items: IMenuItemData[]
}
