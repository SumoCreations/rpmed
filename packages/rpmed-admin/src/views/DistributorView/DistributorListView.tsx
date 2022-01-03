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
import { Link } from 'react-router-dom'
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
import { DestroyDistributorButton } from './DestroyDistributorButton'
import { Distributor, useDistributorsQuery } from 'rpmed-schema'
import { useNavigate } from 'react-router-dom'

const { useState } = React

interface IDistributorProps {
  onDelete: (product: Distributor) => void
  filterText: string
  loading?: boolean
  distributors?: Distributor[]
  error: any
}

const Distributors: React.FC<IDistributorProps> = ({
  onDelete,
  filterText,
  loading,
  distributors,
  error,
}) => {
  const navigate = useNavigate()
  const sendTo = (p: { url: string }) => () => navigate(p.url)

  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <Errors.LoadingError error={error} />
  }

  const filterDistributor = ({ name, domain, id }: Distributor) =>
    filterText.length > 0
      ? [id, name, domain]
          .map(
            val =>
              (val?.toLowerCase().indexOf(filterText.toLowerCase()) ?? -1) >= 0
          )
          .includes(true)
      : true

  const onClickDelete = (product: Distributor) => () => onDelete(product)

  const rows = distributors?.filter(filterDistributor).map(p => [
    <Link to={`/admin/distributors/${p.id}`} key={p.id}>
      {p.name}
    </Link>,
    p.domain,
    p.id,
    <Actions.Group key={`actions${p.id}`}>
      <Actions.Primary onClick={sendTo({ url: `/admin/distributors/${p.id}` })}>
        <FontAwesomeIcon icon={faPencil} />
      </Actions.Primary>
      <Actions.Primary
        onClick={sendTo({
          url: `/admin/distributors/new?${qs.stringify({ ...p })}`,
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
      columnContentTypes={['text', 'text', 'text', 'numeric']}
      initialSortColumnIndex={0}
      sortable={[true, true, false, false]}
      rows={rows ?? []}
      headings={['Name', 'Domain', 'ID', '']}
    />
  )
}

export const DistributorListView: React.FC = () => {
  const navigate = useNavigate()
  const { loading, error, data, refetch } = useDistributorsQuery()
  const distributors = (data?.response.distributors ?? []) as Distributor[]
  const [productToDelete, setDistributorToDelete] = useState(
    null as Distributor | null
  )
  const [searchText, setSearchText] = useState('')
  const confirmDistributorToDelete = (product: Distributor) =>
    setDistributorToDelete(product)
  const onClickNew = () => navigate('/admin/distributors/new')
  const onSearchChange: React.ChangeEventHandler = event =>
    setSearchText((event.target as HTMLInputElement).value)
  return (
    <Layout.Layout>
      <Helmet title="Distributor - RPMed Service Admin" />
      <Content>
        <Toolbar.View>
          <Toolbar.Item grow={true}>
            <Toolbar.Search
              placeholder={'Lookup Distributor'}
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
          <Distributors
            onDelete={confirmDistributorToDelete}
            filterText={searchText}
            loading={loading}
            distributors={distributors}
            error={error}
          />
        </Card.Flat>
      </Content>
      {productToDelete ? (
        <DestroyDistributorButton id={productToDelete.id}>
          {deleteDistributor => {
            const onDismiss = () => setDistributorToDelete(null)
            const onConfirm = async () => {
              await deleteDistributor()
              await refetch()
              onDismiss()
            }
            return (
              <Modal.Dialog
                title={`Delete ${productToDelete.name}?`}
                message={`Are you sure you want to delete '${productToDelete.name}'? You can not undo this action.`}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                destructive={true}
              />
            )
          }}
        </DestroyDistributorButton>
      ) : null}
    </Layout.Layout>
  )
}
