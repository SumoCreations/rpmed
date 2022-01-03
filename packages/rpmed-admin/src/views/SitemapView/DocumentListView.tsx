import {
  faCopy,
  faPencil,
  faPlus,
  faTrash,
} from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import qs from 'query-string'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
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
import { AbsoluteOverlay } from 'rpmed-ui'
import { Document, useDocumentsQuery } from 'rpmed-schema'
import { DestroyDocumentButton } from './DestroyDocumentButton'
import { faEye } from '@fortawesome/pro-regular-svg-icons'

const { useState } = React

interface IDocumentProps {
  onDelete: (page: Document) => void
  filterText: string
  documents?: Document[]
  error: any
}

const Documents: React.FC<IDocumentProps> = ({
  onDelete,
  filterText,
  documents,
  error,
}) => {
  const navigate = useNavigate()
  const sendTo = (p: { url: string }) => () => navigate(p.url)

  if (error) {
    return <Errors.LoadingError error={error} />
  }

  const filterDocument = ({ title, slug }: Document) =>
    filterText.length > 0
      ? [title, slug]
          .map(
            val =>
              (val?.toLowerCase().indexOf(filterText.toLowerCase()) ?? -1) >= 0
          )
          .includes(true)
      : true

  const onClickDelete = (product: Document) => () => onDelete(product)

  const rows = documents?.filter(filterDocument).map(p => [
    <Link to={`/admin/sitemap/documents/${p.id}`} key={p.id}>
      {p.title}
    </Link>,
    p.slug,
    <Actions.Group key={`actions${p.id}`}>
      <Actions.Primary
        onClick={sendTo({
          url: `/admin/sitemap/documents/${p.id}`,
        })}
      >
        <FontAwesomeIcon icon={faEye} />
      </Actions.Primary>
      <Actions.Primary
        onClick={sendTo({
          url: `/admin/sitemap/documents/${p.id}/edit`,
        })}
      >
        <FontAwesomeIcon icon={faPencil} />
      </Actions.Primary>
      <Actions.Primary
        onClick={sendTo({
          url: `/admin/sitemap/documents/new?${qs.stringify({ ...p })}`,
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

export const DocumentListView: React.FC = () => {
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()
  const { loading, error, data, refetch } = useDocumentsQuery({
    fetchPolicy: 'network-only',
  })
  const documents = (data?.response.documents ?? []) as Document[]
  const [pageToDelete, setDocumentToDelete] = useState(null as Document | null)
  const [searchText, setSearchText] = useState('')
  const confirmDocumentToDelete = (product: Document) =>
    setDocumentToDelete(product)
  const onClickNew = () => navigate('/admin/sitemap/documents/new')
  const onSearchChange: React.ChangeEventHandler = event =>
    setSearchText((event.target as HTMLInputElement).value)
  return (
    <Layout.Layout>
      <Helmet title="Document - RPMed Service Admin" />
      <Content>
        <Toolbar.View>
          <Toolbar.Item grow={true}>
            <Toolbar.Search
              placeholder={'Lookup Document'}
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
          <Documents
            onDelete={confirmDocumentToDelete}
            filterText={searchText}
            documents={documents}
            error={error}
          />
        </Card.Flat>
      </Content>
      {pageToDelete ? (
        <DestroyDocumentButton id={pageToDelete.id}>
          {deleteDocument => {
            const onDismiss = () => setDocumentToDelete(null)
            const onConfirm = async () => {
              setDeleting(true)
              onDismiss()
              await deleteDocument()
              await refetch()
              setDeleting(false)
            }
            return (
              <Modal.Dialog
                title={`Delete Document?`}
                message={`Are you sure you want to delete '${pageToDelete.title}'? You can not undo this action.`}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                destructive={true}
              />
            )
          }}
        </DestroyDocumentButton>
      ) : null}
    </Layout.Layout>
  )
}
