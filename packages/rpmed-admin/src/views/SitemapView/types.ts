interface Entity {
  name: string
  position: number
  uuid: string
}

export interface Section extends Entity {
  items: SectionItem[]
}

export interface SectionItem extends Entity {
  target: string
  description: string
  type: 'url' | 'document' | 'tool' | 'page'
  icon: string
}
