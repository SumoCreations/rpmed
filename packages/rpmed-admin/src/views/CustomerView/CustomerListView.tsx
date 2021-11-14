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
import { DestroyCustomerButton } from './DestroyCustomerButton'
import { useCustomersQuery, Customer } from 'rpmed-schema'

const { useState } = React

const sendTo = (p: { history: History; url: string }) => () =>
  p.history.push(p.url)

interface ICustomerProps {
  history: History
  onDelete: (customer: Customer) => void
  filterText: string
}

const Customers: React.FunctionComponent<ICustomerProps> = ({
  history,
  onDelete,
  filterText,
}) => {
  const { data, loading, error } = useCustomersQuery()
  const customers = data?.response.customers ?? []
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <Errors.LoadingError error={error} />
  }
  const filterCustomer = ({ name, email, id }: Customer) =>
    filterText.length > 0
      ? [id, name, email]
        .map(val => (val?.toLowerCase().indexOf(filterText.toLowerCase()) ?? -1) >= 0)
        .includes(true)
      : true
  const onClickDelete = (customer: Customer) => () =>
    onDelete(customer)
  const rows = (customers as Customer[]).filter(filterCustomer).map(p => [
    <Link to={`/admin/customers/${p.id}`} key={p.id}>
      {p.name}
    </Link>,
    p.email,
    p.id,
    <Actions.Group key={`actions${p.id}`}>
      <Actions.Primary
        onClick={sendTo({ history, url: `/admin/customers/${p.id}` })}
      >
        <FontAwesomeIcon icon={faPencil} />
      </Actions.Primary>
      <Actions.Primary
        onClick={sendTo({
          history,
          url: `/admin/customers/new?${qs.stringify({ ...p })}`,
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
    <React.Fragment>
      <Data.Table
        columnContentTypes={['text', 'text', 'text', 'numeric']}
        initialSortColumnIndex={0}
        sortable={[true, true, false, false]}
        rows={rows}
        headings={['Name', 'Email', 'ID', '']}
      />
    </React.Fragment>
  )
}

export const CustomerListView: React.FC<RouteComponentProps<{}>> = ({
  history,
}) => {
  const [productToDelete, setCustomerToDelete] = useState<Customer | null>(
    null
  )
  const [searchText, setSearchText] = useState('')
  const confirmCustomerToDelete = (customer: Customer) =>
    setCustomerToDelete(customer)
  const onClickNew = () => history.push('/admin/customers/new')
  const onSearchChange: React.ChangeEventHandler = event =>
    setSearchText((event.target as HTMLInputElement).value)
  return (
    <Layout.Layout>
      <Helmet title="Customer - RPMed Service Admin" />
      <Content>
        <Toolbar.View>
          <Toolbar.Item grow={true}>
            <Toolbar.Search
              placeholder={'Lookup Customer'}
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
          <Customers
            history={history}
            onDelete={confirmCustomerToDelete}
            filterText={searchText}
          />
        </Card.Flat>
      </Content>
      {productToDelete ? (
        <DestroyCustomerButton id={productToDelete.id}>
          {deleteCustomer => {
            const onDismiss = () => setCustomerToDelete(null)
            const onConfirm = () => {
              deleteCustomer()
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
        </DestroyCustomerButton>
      ) : null}
    </Layout.Layout>
  )
}
