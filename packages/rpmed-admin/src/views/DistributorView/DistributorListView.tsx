import {
  faCopy,
  faPencil,
  faPlus,
  faTrash,
} from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { History } from 'history'
import get from 'lodash.get'
import qs from 'query-string'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
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

const { useState } = React

const sendTo = (p: { history: History; url: string }) => () =>
  p.history.push(p.url)

interface IDistributorProps {
  history: History
  onDelete: (product: Distributor) => void
  filterText: string
}

const Distributors: React.FunctionComponent<IDistributorProps> = ({
  history,
  onDelete,
  filterText,
}) => {
  const { loading, error, data } = useDistributorsQuery()
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <Errors.LoadingError error={error} />
  }

  const filterDistributor = ({ name, domain, id }: Distributor) =>
    filterText.length > 0
      ? [id, name, domain]
        .map(val => (val?.toLowerCase().indexOf(filterText.toLowerCase()) ?? -1) >= 0)
        .includes(true)
      : true

  const onClickDelete = (product: Distributor) => () =>
    onDelete(product)
  const distributors = (get(data, 'response.distributors') ||
    []) as Distributor[]
  const rows = distributors.filter(filterDistributor).map(p => [
    <Link to={`/admin/distributors/${p.id}`} key={p.id}>
      {p.name}
    </Link>,
    p.domain,
    p.id,
    <Actions.Group key={`actions${p.id}`}>
      <Actions.Primary
        onClick={sendTo({ history, url: `/admin/distributors/${p.id}` })}
      >
        <FontAwesomeIcon icon={faPencil} />
      </Actions.Primary>
      <Actions.Primary
        onClick={sendTo({
          history,
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
      rows={rows}
      headings={['Name', 'Domain', 'ID', '']}
    />
  )
}

export const DistributorListView: React.FC<RouteComponentProps<{}>> = ({
  history,
}) => {
  const [productToDelete, setDistributorToDelete] = useState(
    null as Distributor | null
  )
  const [searchText, setSearchText] = useState('')
  const confirmDistributorToDelete = (product: Distributor) =>
    setDistributorToDelete(product)
  const onClickNew = () => history.push('/admin/distributors/new')
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
            history={history}
            onDelete={confirmDistributorToDelete}
            filterText={searchText}
          />
        </Card.Flat>
      </Content>
      {productToDelete ? (
        <DestroyDistributorButton id={productToDelete.id}>
          {deleteDistributor => {
            const onDismiss = () => setDistributorToDelete(null)
            const onConfirm = () => {
              deleteDistributor()
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
