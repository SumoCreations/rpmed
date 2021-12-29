import { faFilePdf } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { BreadCrumb } from 'rpmed-ui'
import { GridNav } from 'rpmed-ui/lib/V1'
import { documents } from './documents'

const DownloadsView: React.FC = () => {
  const history = useHistory()
  const { category } = useParams<{ category: string }>()
  const handleDocumentSelection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    history.push(`/d/${category}/${id}`)
  }
  var tag: string
  var title: string | null = null
  switch (category) {
    case 'vet':
      tag = 'Vetrinary'
      title = 'Vet'
      break
    case 'stryker':
      tag = 'Stryker'
      title = 'Stryker'
      break
    case 'zimmerbiomet':
      tag = 'ZimmerBiomet'
      title = 'Zimmer Biomet'
      break
    case 'future':
      tag = 'Future'
      title = 'Future'
      break
    default:
      tag = 'n/a'
  }

  console.log(tag)
  const results = documents.filter(d => (tag ? d.tags.includes(tag) : true))
  return (
    <article>
      <BreadCrumb
        trail={[
          { to: '/', label: 'Resource Center' },
          { to: '/downloads', label: 'Downloads' },
        ]}
      />
      <h1>Downloads {title ? `(${title})` : <span />}</h1>
      <GridNav.SectionTitle>
        {results.length} Matching Documents
      </GridNav.SectionTitle>
      <GridNav.Container>
        {results.map(document => {
          return (
            <GridNav.Item key={`${document}Item`}>
              <GridNav.OverlayButton
                onClick={handleDocumentSelection(document.id)}
              />
              <GridNav.IconWrap>
                <FontAwesomeIcon icon={faFilePdf} size="3x" />
              </GridNav.IconWrap>
              <GridNav.ItemContent>
                <GridNav.ItemTitle>
                  <GridNav.ItemLink to="/troubleshoot">
                    {document.title}
                  </GridNav.ItemLink>
                </GridNav.ItemTitle>
                <GridNav.ItemDescription>
                  Click here for more information.
                </GridNav.ItemDescription>
              </GridNav.ItemContent>
            </GridNav.Item>
          )
        })}
      </GridNav.Container>
    </article>
  )
}

export default DownloadsView
