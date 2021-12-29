import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { BreadCrumb } from 'rpmed-ui'
import medledMenu from './medledMenu'
import { GridMenu } from './GridMenu'

const MedledHomeView: React.FC = () => {
  const history = useHistory()
  const handleSelectedItem = (url?: string) => {
    history.push(url ?? '#')
  }

  return (
    <article>
      <BreadCrumb
        trail={[
          { label: 'Resource Center', to: '/' },
          { label: 'MedLed', to: '/medled' },
        ]}
      />
      <h1>MedLED® Surgical Headlights</h1>
      <GridMenu
        sections={medledMenu}
        onItemSelect={handleSelectedItem}
        handleExternalUrls={true}
      />
    </article>
  )
}

export default MedledHomeView
