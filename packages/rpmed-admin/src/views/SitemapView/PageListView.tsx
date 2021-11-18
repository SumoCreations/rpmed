import {
  faCopy,
  faPencil,
  faPlus,
  faTrash,
} from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { History } from 'history'
import qs from 'query-string'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Link, useHistory } from 'react-router-dom'
import {
  Actions,
  Card,
  Content,
  Data,
  Errors,
  Layout,
  Modal,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import { AbsoluteOverlay } from "rpmed-ui"
import { Page, usePagesQuery } from 'rpmed-schema'
import { DestroyPageButton } from "./DestroyPageButton"

const { useState } = React

interface IPageProps {
  onDelete: (page: Page) => void
  filterText: string
  pages?: Page[]
  error: any
}

const sendTo = (p: { history: History; url: string }) => () =>
  p.history.push(p.url)


const Pages: React.FunctionComponent<IPageProps> = ({
  onDelete,
  filterText,
  pages,
  error
}) => {
  const history = useHistory()

  if (error) {
    return <Errors.LoadingError error={error} />
  }

  const filterPage = ({ title, slug }: Page) =>
    filterText.length > 0
      ? [title, slug]
        .map(val => (val?.toLowerCase().indexOf(filterText.toLowerCase()) ?? -1) >= 0)
        .includes(true)
      : true

  const onClickDelete = (product: Page) => () =>
    onDelete(product)

  const rows = pages?.filter(filterPage).map(p => [
    <Link to={`/admin/sitemap/pages/${p.id}`} key={p.id}>
      {p.title}
    </Link>,
    p.slug,
    <Actions.Group key={`actions${p.id}`}>
      <Actions.Primary
        onClick={sendTo({ history, url: `/admin/sitemap/pages/${p.id}` })}
      >
        <FontAwesomeIcon icon={faPencil} />
      </Actions.Primary>
      <Actions.Primary
        onClick={sendTo({
          history,
          url: `/admin/sitemap/pages/new?${qs.stringify({ ...p })}`,
        })}
      >
        <FontAwesomeIcon icon={faCopy} />
      </Actions.Primary>
      <Actions.Destructive onClick={onClickDelete(p)}>
        <FontAwesomeIcon icon={faTrash} />
      </Actions.Destructive>
    </Actions.Group>,
  ])

  return (
    <Data.Table
      columnContentTypes={['text', 'text', 'numeric']}
      initialSortColumnIndex={0}
      sortable={[true, true, false, false]}
      rows={rows ?? []}
      headings={['Name', 'Slug', '']}
    />
  )
}

export const PageListView: React.FC = () => {
  const [deleting, setDeleting] = useState(false)
  const history = useHistory()
  const { loading, error, data, refetch } = usePagesQuery({ fetchPolicy: "network-only" })
  const pages = (data?.response.pages ?? []) as Page[]
  const [pageToDelete, setPageToDelete] = useState(
    null as Page | null
  )
  const [searchText, setSearchText] = useState('')
  const confirmPageToDelete = (product: Page) =>
    setPageToDelete(product)
  const onClickNew = () => history.push('/admin/sitemap/pages/new')
  const onSearchChange: React.ChangeEventHandler = event =>
    setSearchText((event.target as HTMLInputElement).value)
  return (
    <Layout.Layout>
      <Helmet title="Page - RPMed Service Admin" />
      <Content>
        <Toolbar.View>
          <Toolbar.Item grow={true}>
            <Toolbar.Search
              placeholder={'Lookup Page'}
              value={searchText}
              onChange={onSearchChange}
            />
          </Toolbar.Item>
          <Toolbar.Item spreadLeft={true}>
            <Actions.Group>
              <Actions.Toolbar onClick={onClickNew}>
                <FontAwesomeIcon icon={faPlus} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
        </Toolbar.View>
        <Card.Flat>
          {loading || deleting ? <AbsoluteOverlay /> : null}
          <Pages
            onDelete={confirmPageToDelete}
            filterText={searchText}
            pages={pages}
            error={error}

          />
        </Card.Flat>
      </Content>
      {pageToDelete ? (
        <DestroyPageButton id={pageToDelete.id}>
          {deletePage => {
            const onDismiss = () => setPageToDelete(null)
            const onConfirm = async () => {
              setDeleting(true)
              onDismiss()
              await deletePage()
              await refetch()
              setDeleting(false)
            }
            return (
              <Modal.Dialog
                title={`Delete Page?`}
                message={`Are you sure you want to delete '${pageToDelete.title}'? You can not undo this action.`}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                destructive={true}
              />
            )
          }}
        </DestroyPageButton>
      ) : null}
    </Layout.Layout>
  )
}
