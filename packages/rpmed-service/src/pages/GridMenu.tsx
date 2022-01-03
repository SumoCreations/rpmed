import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icons from '@fortawesome/pro-regular-svg-icons'
import React from 'react'
import { Section } from 'rpmed-schema'
import { GridNav } from 'rpmed-ui/lib/V1'

const iconOptions = Object.keys(icons).map(i => ({
  id: i,
  name: i,
  icon: (icons as any)[i],
}))

export const GridMenu: React.FC<{
  currentPage: string
  sections: Section[]
  onItemSelect: (link?: string) => void
  handleExternalUrls?: boolean
}> = ({ onItemSelect, sections, handleExternalUrls, currentPage }) => {
  const handleClick = (target: string, type: string) => (
    e: React.MouseEvent
  ) => {
    e.preventDefault()
    let link = target
    switch (type) {
      case 'document':
        link = `/${currentPage}/d/${target}`
        break
      case 'tool':
        link = `/${currentPage}/${target}`
        break
      case 'page':
        link = `/${target}`
        break
      default:
        break
    }
    console.log('link', link, 'type', type, 'target', target)
    if (handleExternalUrls && link?.match(/^http/)) {
      window.open(link, '_blank')
    } else {
      onItemSelect(link)
    }
  }

  return (
    <React.Fragment>
      {sections
        .slice()
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map(({ id, name, items }) => {
          return (
            <React.Fragment key={`section${id}`}>
              <GridNav.SectionTitle>{name}</GridNav.SectionTitle>
              <GridNav.Container>
                {items
                  ?.slice()
                  .sort((a, b) => (a?.position ?? 0) - (b?.position ?? 0))
                  .map(item => (
                    <GridNav.Item key={`${item?.id}`}>
                      <GridNav.OverlayButton
                        onClick={handleClick(
                          item?.target ?? '',
                          item?.type ?? ''
                        )}
                      />
                      <GridNav.IconWrap>
                        <FontAwesomeIcon
                          icon={
                            iconOptions.find(i => i.id === item?.icon)?.icon ??
                            icons.faLightbulb
                          }
                          size="3x"
                        />
                      </GridNav.IconWrap>
                      <GridNav.ItemContent>
                        <GridNav.ItemTitle>
                          <GridNav.ItemLink to={item?.target ?? ''}>
                            {item?.name}
                          </GridNav.ItemLink>
                        </GridNav.ItemTitle>
                        <GridNav.ItemDescription>
                          {item?.description}
                        </GridNav.ItemDescription>
                      </GridNav.ItemContent>
                    </GridNav.Item>
                  ))}
                {(items?.length ?? 0) % 3
                  ? new Array(3 - ((items?.length ?? 0) % 3))
                      .fill(null)
                      .map((_, i) => <GridNav.Blank key={`${id}Blank${i}`} />)
                  : null}
              </GridNav.Container>
            </React.Fragment>
          )
        })}
    </React.Fragment>
  )
}
