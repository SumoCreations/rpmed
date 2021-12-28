import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/pro-regular-svg-icons'
import React from 'react'
import { IMenuSection } from './types'
import { GridNav } from 'rpmed-ui'

export const GridMenu: React.FC<{
  sections: IMenuSection[]
  onItemSelect: (link?: string) => void
  handleExternalUrls?: boolean
}> = ({ onItemSelect, sections, handleExternalUrls }) => {
  const handleClick: (link?: string) => React.MouseEventHandler = link => e => {
    e.preventDefault()
    if (handleExternalUrls && link?.match(/^http/)) {
      window.open(link, '_blank')
    } else {
      onItemSelect(link)
    }
  }
  return (
    <React.Fragment>
      {sections.map(({ heading, items }) => [
        <GridNav.SectionTitle key={`sectionHeading${heading}`}>
          {heading}
        </GridNav.SectionTitle>,
        <GridNav.Container key={`sectionItems${heading}`}>
          {items.map(item =>
            item.blank ? (
              <GridNav.Blank key={`${heading}Item${item.title}`} />
            ) : (
              <GridNav.Item key={`${heading}Item${item.title}`}>
                <GridNav.OverlayButton onClick={handleClick(item.link)} />
                <GridNav.IconWrap>
                  <FontAwesomeIcon icon={item.icon || faLightbulb} size="3x" />
                </GridNav.IconWrap>
                <GridNav.ItemContent>
                  <GridNav.ItemTitle>
                    <GridNav.ItemLink to={item.link ?? ''}>
                      {item.title}
                    </GridNav.ItemLink>
                  </GridNav.ItemTitle>
                  <GridNav.ItemDescription>
                    {item.description}
                  </GridNav.ItemDescription>
                </GridNav.ItemContent>
              </GridNav.Item>
            )
          )}
        </GridNav.Container>,
      ])}
    </React.Fragment>
  )
}
