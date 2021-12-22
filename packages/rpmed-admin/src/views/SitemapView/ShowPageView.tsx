import { faChevronLeft, faPencil } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Actions, Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import { AbsoluteOverlay, Button } from 'rpmed-ui'
import { useHistory, useParams } from 'react-router-dom'
import { Page, usePageQuery } from 'rpmed-schema'
import { v4 as uuid } from 'uuid'
import { SectionDetail } from './SectionDetail'
import { Section, SectionItem } from './types'

export const ShowPageView: React.FC = ({}) => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const handleBack = () => {
    history.push('/admin/sitemap/pages')
  }
  const handleEdit = () => {
    history.push(`/admin/sitemap/pages/${id}/edit`)
  }

  const [initialSections, setInitialSections] = useState<Section[]>([])

  const { data: existingPageData, loading } = usePageQuery({
    variables: { id },
  })
  const page = existingPageData?.response.page ?? ({} as Page)

  const [sections, setSections] = useState([] as Section[])
  const handleNewSection: React.MouseEventHandler = e => {
    e.preventDefault()
    setSections([
      ...sections,
      { name: '', position: sections.length, uuid: uuid(), items: [] },
    ])
  }

  const handleDeleteSection = (uuid: string) => () => {
    setSections(
      sections
        .filter(s => s.uuid !== uuid)
        .sort((a, b) => a.position - b.position)
    )
  }

  const handleSectionEdit = (uuid: string) => (name: string) => {
    setSections(
      sections.map(s => {
        if (s.uuid === uuid) {
          return { ...s, name }
        }
        return s
      })
    )
  }

  const handlePositionChange = (
    currentPosition: number,
    newPosition: number
  ) => {
    console.log(currentPosition, newPosition)
    if (newPosition >= 0 && newPosition < sections.length) {
      setSections(
        sections.map(s => {
          if (s.position === currentPosition) {
            return { ...s, position: newPosition }
          } else if (s.position === newPosition) {
            return { ...s, position: currentPosition }
          }
          return s
        })
      )
    }
  }

  const handleSectionItemsChanged = (uuid: string, items: SectionItem[]) => {
    const update = sections.map(s => {
      if (s.uuid === uuid) {
        return { ...s, items }
      } else {
        return s
      }
    })
    if (JSON.stringify(update) !== JSON.stringify(sections)) {
      setSections(update)
    }
  }

  const handleSave = () => {
    setInitialSections(sections)
  }

  const hasChanged =
    JSON.stringify(sections) !== JSON.stringify(initialSections)

  console.log('ShowPageView', 'Rendered')
  return (
    <Layout.Layout>
      <Helmet title={`${page.title} - RPMed Service Admin`} />
      <Content>
        <Toolbar.View>
          <Toolbar.Item spreadLeft={false}>
            <Actions.Group>
              <Actions.Toolbar onClick={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
          <Toolbar.Item spreadLeft={true}>
            <Actions.Group>
              <Actions.Toolbar onClick={handleEdit}>
                <FontAwesomeIcon icon={faPencil} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
        </Toolbar.View>
        <Card.Flat>
          {loading ? <AbsoluteOverlay /> : null}
          <header className="flex flex-col-reverse">
            <h2 className="text-lg font-semibold">{page?.title}</h2>
            <h3 className="text-sm font-bold line-height-1">Viewing Page</h3>
          </header>
          <div className="mt-2 flex border-b mb-2 pb-2 border-gray-400">
            <div className="flex flex-col mr-2 w-1/2">
              <h3 className="font-semibold text-md mt-2">Description</h3>
              <p className="text-sm">{page.description}</p>
            </div>
            <div className="flex flex-col w-1/2">
              <h3 className="font-semibold text-md mt-2">Keywords</h3>
              <p className="text-sm">{page.keywords}</p>
            </div>
          </div>
          {sections
            .sort((a, b) => a.position - b.position)
            .map(section => (
              <SectionDetail
                key={section.uuid}
                {...section}
                onDelete={handleDeleteSection(section.uuid)}
                onNameChange={handleSectionEdit(section.uuid)}
                onPositionChange={handlePositionChange}
                onItemsChanged={handleSectionItemsChanged}
              />
            ))}
          <div className="fixed bottom-0 left-0 w-screen bg-white bg-opacity-50 flex px-4 py-2">
            <Button
              className="ml-auto mr-2"
              appearance="primary"
              onClick={handleNewSection}
            >
              Add Section{' '}
            </Button>
            <Button
              disabled={!hasChanged}
              appearance="primary"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
          <code>{JSON.stringify(sections)}</code>
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
