import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { BreadCrumb } from 'rpmed-ui'
import oncologyMenu from './oncologyMenu'
import { GridMenu } from './GridMenu'

const OncologyHomeView: React.FC = () => {
  const history = useHistory()
  const handleSelectedItem = (url?: string) => {
    history.push(url ?? '#')
  }

  return (
    <article>
      <BreadCrumb
        trail={[
          { label: 'Resource Center', to: '/' },
          { label: 'Oncology', to: '/oncology' },
        ]}
      />
      <h1>Brachytherapy Needles &amp; Devices</h1>
      <GridMenu
        sections={oncologyMenu}
        onItemSelect={handleSelectedItem}
        handleExternalUrls={true}
      />
    </article>
  )
}

export default OncologyHomeView
