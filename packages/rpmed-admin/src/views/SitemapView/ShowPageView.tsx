import { faChevronLeft, faPencil } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Actions, Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import { AbsoluteOverlay, Button } from 'rpmed-ui'
import { useHistory, useParams } from 'react-router-dom'
import { Page, usePageQuery } from 'rpmed-schema'

export const ShowPageView: React.FC = ({}) => {
  const history = useHistory()
  const { id } = useParams<{ id: string }>()
  const handleBack = () => {
    history.push('/admin/sitemap/pages')
  }
  const handleEdit = () => {
    history.push(`/admin/sitemap/pages/${id}/edit`)
  }

  const { data: existingPageData, loading } = usePageQuery({
    variables: { id },
  })
  const page = existingPageData?.response.page ?? ({} as Page)

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
          <h2 className="font-bold text-lg">Viewing Page: {page.title}</h2>
          <div className="mt-4 flex border-b mb-2 pb-2 border-gray-400">
            <div className="flex flex-col mr-2 w-1/2">
              <h3 className="font-semibold text-md mt-2">Description</h3>
              <p className="text-sm">{page.description}</p>
            </div>
            <div className="flex flex-col w-1/2">
              <h3 className="font-semibold text-md mt-2">Keywords</h3>
              <p className="text-sm">{page.keywords}</p>
            </div>
          </div>
          <div className="flex border-b mb-2 pb-2 border-gray-400">
            <Button className="mr-2" appearance="primary">
              Add Item{' '}
            </Button>
            <Button className="mr-2" appearance="primary">
              Add Section{' '}
            </Button>
          </div>
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
