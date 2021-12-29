import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { BreadCrumb } from 'rpmed-ui'
import surgicalMenu from './surgicalMenu'
import { GridMenu } from './GridMenu'

const SurgicalHomeView: React.FC = () => {
  const history = useHistory()
  const handleSelectedItem = (link?: string) => history.push(link ?? '#')
  return (
    <article>
      <BreadCrumb
        trail={[
          { label: 'Resource Center', url: '/' },
          { label: 'Surgical Fibers', to: '/surgical' },
        ]}
      />
      <h1>Surgical Fibers &amp; Devices</h1>
      <GridMenu
        sections={surgicalMenu}
        onItemSelect={handleSelectedItem}
        handleExternalUrls={true}
      />
    </article>
  )
}

export default SurgicalHomeView
