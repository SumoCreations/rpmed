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
import { DestroyProductRegistrationButton } from './DestroyProductRegistrationButton'
import {
  ProductRegistration,
  useProductRegistrationsQuery,
} from 'rpmed-schema'

const { useState } = React

const sendTo = (p: { history: History; url: string }) => () =>
  p.history.push(p.url)

interface IProductRegistrationProps {
  history: History
  onDelete: (registration: ProductRegistration) => void
  filterText: string
}

const ProductRegistrations: React.FunctionComponent<IProductRegistrationProps> = ({
  history,
  onDelete,
  filterText,
}) => {
  const { loading, error, data } = useProductRegistrationsQuery()
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <Errors.LoadingError error={error} />
  }
  const filterProductRegistration = ({
    customer,
    id,
  }: ProductRegistration) =>
    filterText.length > 0
      ? [id, customer.name, customer.email]
        .map(val => (val?.toLowerCase().indexOf(filterText.toLowerCase()) ?? -1) >= 0)
        .includes(true)
      : true

  const onClickDelete = (
    productRegistration: ProductRegistration
  ) => () => onDelete(productRegistration)
  const productRegistrations = (data?.response.productRegistrations ?? []) as ProductRegistration[]
  const rows = productRegistrations.filter(filterProductRegistration).map(p => [
    <Link to={`/admin/registrations/${p.id}`} key={p.id}>
      {p.id}
    </Link>,
    <Link to={`/admin/customers/${p.customerId}`} key={p.customerId}>
      {p.customer.name}
    </Link>,
    <Link
      to={`/admin/products/modelNumbers/${p.modelNumber}`}
      key={p.customerId}
    >
      {p.modelNumber}
    </Link>,
    <Actions.Group key={`actions${p.id}`}>
      <Actions.Primary
        onClick={sendTo({ history, url: `/admin/registrations/${p.id}` })}
      >
        <FontAwesomeIcon icon={faPencil} />
      </Actions.Primary>
      <Actions.Primary
        onClick={sendTo({
          history,
          url: `/admin/registrations/new?${qs.stringify({ ...p })}`,
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
      columnContentTypes={['text', 'text', 'text', 'text', 'numeric']}
      initialSortColumnIndex={0}
      sortable={[true, true, false, false]}
      rows={rows}
      headings={['Serial / ID', 'Customer', 'Model Number', 'Product', '']}
    />
  )
}

export const ProductRegistrationListView: React.FC<RouteComponentProps<{}>> = ({
  history,
}) => {
  const [registrationToDelete, setProductRegistrationToDelete] = useState(
    null as ProductRegistration | null
  )
  const [searchText, setSearchText] = useState('')
  const confirmProductRegistrationToDelete = (
    registration: ProductRegistration
  ) => setProductRegistrationToDelete(registration)
  const onClickNew = () => history.push('/admin/registrations/new')
  const onSearchChange: React.ChangeEventHandler = event =>
    setSearchText((event.target as HTMLInputElement).value)
  return (
    <Layout.Layout>
      <Helmet title="Product Registration - RPMed Service Admin" />
      <Content>
        <Toolbar.View>
          <Toolbar.Item grow={true}>
            <Toolbar.Search
              placeholder={'Lookup Registration'}
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
          <ProductRegistrations
            history={history}
            onDelete={confirmProductRegistrationToDelete}
            filterText={searchText}
          />
        </Card.Flat>
      </Content>
      {registrationToDelete ? (
        <DestroyProductRegistrationButton id={registrationToDelete.id}>
          {deleteProductRegistration => {
            const onDismiss = () => setProductRegistrationToDelete(null)
            const onConfirm = () => {
              deleteProductRegistration()
              onDismiss()
            }
            return (
              <Modal.Dialog
                title={`Delete ${registrationToDelete.id}?`}
                message={`Are you sure you want to delete '${registrationToDelete.id}'? You can not undo this action.`}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                destructive={true}
              />
            )
          }}
        </DestroyProductRegistrationButton>
      ) : null}
    </Layout.Layout>
  )
}
