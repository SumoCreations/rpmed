import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { BreadCrumb } from 'rpmed-ui'
import sutureMenu from './sutureMenu'
import { GridMenu } from './GridMenu'

const SutureHomeView: React.FC = () => {
  const history = useHistory()
  const handleSelectedItem = (link?: string) => history.push(link ?? '#')
  return (
    <article>
      <BreadCrumb
        trail={[
          { label: 'Resource Center', url: '/' },
          { label: 'Sutures', to: '/sutures' },
        ]}
      />
      <h1>Surgical Sutures</h1>
      <GridMenu
        sections={sutureMenu}
        onItemSelect={handleSelectedItem}
        handleExternalUrls={true}
      />
    </article>
  )
}

export default SutureHomeView
