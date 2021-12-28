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
      <BreadCrumb.Container>
        <BreadCrumb.Link to="/medled" primary={true}>
          MedLED
        </BreadCrumb.Link>
      </BreadCrumb.Container>
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
