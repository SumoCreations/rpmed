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
import { DestroyProductRegistrationButton } from './DestroyProductRegistrationButton'
import { ProductRegistration, useProductRegistrationsQuery } from 'rpmed-schema'
import { useNavigate } from 'react-router-dom'

const { useState } = React

interface IProductRegistrationProps {
  onDelete: (registration: ProductRegistration) => void
  filterText: string
  registrations: ProductRegistration[]
  loading?: boolean
  error?: any
}

const ProductRegistrations: React.FC<IProductRegistrationProps> = ({
  onDelete,
  filterText,
  registrations,
  loading,
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
  const filterProductRegistration = ({ customer, id }: ProductRegistration) =>
    filterText.length > 0
      ? [id, customer?.name, customer?.email]
          .map(
            val =>
              (val?.toLowerCase().indexOf(filterText.toLowerCase()) ?? -1) >= 0
          )
          .includes(true)
      : true

  const onClickDelete = (productRegistration: ProductRegistration) => () =>
    onDelete(productRegistration)
  const rows = registrations.filter(filterProductRegistration).map(p => [
    <Link to={`/admin/registrations/${p.id}`} key={p.id}>
      {p.id}
    </Link>,
    <Link
      to={`/admin/customers/${p.customerId}`}
      key={p.customerId ?? `customerFor${p.id}`}
    >
      {p.customer?.name}
    </Link>,
    <Link
      to={`/admin/products/modelNumbers/${p.modelNumber}`}
      key={p.customerId}
    >
      {p.modelNumber}
    </Link>,
    p.registeredOn,
    <Actions.Group key={`actions${p.id}`}>
      <Actions.Primary
        onClick={sendTo({ url: `/admin/registrations/${p.id}` })}
      >
        <FontAwesomeIcon icon={faPencil} />
      </Actions.Primary>
      <Actions.Primary
        onClick={sendTo({
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
      headings={[
        'Serial / ID',
        'Customer',
        'Model Number',
        'Registered On',
        '',
      ]}
    />
  )
}

export const ProductRegistrationListView: React.FC = () => {
  const navigate = useNavigate()
  const { loading, error, data, refetch } = useProductRegistrationsQuery({
    fetchPolicy: 'network-only',
  })
  const registrations = (data?.response.productRegistrations ??
    []) as ProductRegistration[]
  const [registrationToDelete, setProductRegistrationToDelete] = useState(
    null as ProductRegistration | null
  )
  const [searchText, setSearchText] = useState('')
  const confirmProductRegistrationToDelete = (
    registration: ProductRegistration
  ) => setProductRegistrationToDelete(registration)
  const onClickNew = () => navigate('/admin/registrations/new')
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
            onDelete={confirmProductRegistrationToDelete}
            filterText={searchText}
            loading={loading}
            error={error}
            registrations={registrations}
          />
        </Card.Flat>
      </Content>
      {registrationToDelete ? (
        <DestroyProductRegistrationButton id={registrationToDelete.id}>
          {deleteProductRegistration => {
            const onDismiss = () => setProductRegistrationToDelete(null)
            const onConfirm = async () => {
              await deleteProductRegistration()
              refetch()
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
