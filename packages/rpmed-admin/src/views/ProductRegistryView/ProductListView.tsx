import {
  faCopy,
  faPencil,
  faPlus,
  faSync,
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
  Grid,
  Heading,
  Indicators,
  Layout,
  Modal,
  Toolbar,
} from 'rpmed-ui/lib/V1'

import { DestroyProductButton } from './DestroyProductButton'
import { Product, useProductsQuery } from 'rpmed-schema'

const { useState } = React

const sendTo = (p: { history: History; url: string }) => () =>
  p.history.push(p.url)

export const ProductListView: React.FC<RouteComponentProps<{}>> = ({
  history,
}) => {
  const {
    loading,
    error,
    data,
    refetch,
    networkStatus,
  } = useProductsQuery()
  const products = (data?.response?.products ?? []) as Product[]
  const pageSize = data?.response?.pageSize ?? 0
  const handleRefresh = () => refetch()
  const networkActive = loading || networkStatus === 4
  const [productToDelete, setProductToDelete] = useState(
    null as Product | null
  )
  const [searchText, setSearchText] = useState('')
  const onClickNew = () => history.push('/admin/products/new')
  const onSearchChange: React.ChangeEventHandler = event =>
    setSearchText((event.target as HTMLInputElement).value)

  const filterProduct = ({ name, description, id }: Product) =>
    searchText.length > 0
      ? [id, name, description]
        .map(val => val.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
        .includes(true)
      : true

  const onClickDelete = (product: Product) => () =>
    setProductToDelete(product)

  const rows = (products || []).filter(filterProduct).map(p => [
    <Link to={`/admin/products/${p.id}`} key={p.id}>
      {p.name}
    </Link>,
    p.description,
    p.id,
    <Actions.Group key={`actions${p.id}`}>
      <Actions.Primary
        onClick={sendTo({ history, url: `/admin/products/${p.id}` })}
      >
        <FontAwesomeIcon icon={faPencil} />
      </Actions.Primary>
      <Actions.Primary
        onClick={sendTo({
          history,
          url: `/admin/products/new?${qs.stringify({ ...p })}`,
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
    <Layout.Layout>
      <Helmet title="Product - RPMed Service Admin" />
      <Content>
        <Toolbar.View>
          <Toolbar.Item grow={true}>
            <Toolbar.Search
              placeholder={'Lookup Product'}
              value={searchText}
              onChange={onSearchChange}
            />
          </Toolbar.Item>
          <Toolbar.Item spreadLeft={true}>
            <Actions.Group>
              {networkActive ? (
                <Actions.Toolbar>
                  <Indicators.Spinner />
                </Actions.Toolbar>
              ) : (
                <Actions.Toolbar onClick={handleRefresh}>
                  <FontAwesomeIcon icon={faSync} />
                </Actions.Toolbar>
              )}
              <Actions.Toolbar onClick={onClickNew}>
                <FontAwesomeIcon icon={faPlus} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
        </Toolbar.View>
        <Card.Flat>
          <Card.Header>
            <Grid.Row>
              <Grid.Col span={7}>
                {networkActive ? (
                  <Heading.Title>Loading</Heading.Title>
                ) : (
                  <Heading.Title>
                    {pageSize ? pageSize : ''} Products
                  </Heading.Title>
                )}
              </Grid.Col>
            </Grid.Row>
          </Card.Header>
          {error ? <Errors.LoadingError error={error} /> : null}
          <Data.Table
            columnContentTypes={['text', 'text', 'text', 'numeric']}
            initialSortColumnIndex={0}
            sortable={[true, true, false, false]}
            rows={rows}
            headings={['Name', 'Description', 'ID', '']}
          />
        </Card.Flat>
      </Content>
      {productToDelete ? (
        <DestroyProductButton id={productToDelete.id}>
          {deleteProduct => {
            const onDismiss = () => setProductToDelete(null)
            const onConfirm = () => {
              deleteProduct()
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
        </DestroyProductButton>
      ) : null}
    </Layout.Layout>
  )
}
