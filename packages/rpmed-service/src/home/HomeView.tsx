import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { BreadCrumb } from 'rpmed-ui'
import mainMenu from './mainMenu'
import { GridMenu } from './GridMenu'

const HomeView: React.FC = () => {
  const history = useHistory()
  const handleSelectedItem = (link?: string) => history.push(link ?? '#')
  return (
    <article>
      <BreadCrumb trail={[{ label: 'Resource Center', to: '/' }]} />
      <h1 className="text-xl font-bold mb-2">Resource Center</h1>
      <GridMenu
        sections={mainMenu}
        onItemSelect={handleSelectedItem}
        handleExternalUrls={true}
      />
    </article>
  )
}

export default HomeView
