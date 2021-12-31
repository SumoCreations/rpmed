import {
  faCopy,
  faEye,
  faPencil,
  faPlus,
  faSync,
  faTrash,
} from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import qs from 'query-string'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'

import { Link } from 'react-router-dom'
import { ProductSymptom } from 'rpmed-schema'
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
import { DestroyProductSymptomButton } from './DestroyProductSymptomButton'
import { useProductFilters } from './useProductFilters'

import { useNavigate } from 'react-router-dom'

interface IProductSymptomsProps {
  onDelete: (product: ProductSymptom) => void
  productSymptoms: ProductSymptom[]
}

const ProductSymptoms: React.FC<IProductSymptomsProps> = ({
  onDelete,
  productSymptoms,
}) => {
  const navigate = useNavigate()
  const sendTo = (p: { url: string }) => () => navigate(p.url)

  const onClickDelete = (productSymptom: ProductSymptom) => () =>
    onDelete(productSymptom)

  const rows = productSymptoms.map(p => [
    <Link to={`/admin/products/symptoms/${p.id}`} key={p.id}>
      {p.name}
    </Link>,
    p.faultCode || '',
    p.preApproved ? 'Yes' : 'No',
    p.fee ? 'Yes' : 'No',
    <Actions.Group key={`actions${p.id}`}>
      <Actions.Primary
        onClick={sendTo({
          url: `/admin/products/symptoms/${p.id}`,
        })}
      >
        <FontAwesomeIcon icon={faEye} />
      </Actions.Primary>
      <Actions.Primary
        onClick={sendTo({
          url: `/admin/products/symptoms/edit/${p.id}`,
        })}
      >
        <FontAwesomeIcon icon={faPencil} />
      </Actions.Primary>
      <Actions.Primary
        onClick={sendTo({
          url: `/admin/products/symptoms/new?${qs.stringify({ ...p })}`,
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
        columnContentTypes={['text', 'text', 'text', 'numeric', 'numeric']}
        initialSortColumnIndex={0}
        sortable={[true, true, true, false, false]}
        rows={rows}
        headings={['Name', 'Fault', 'Approved', 'Fee', '']}
        widths={['50%', '10%', '10%', '10%', '20%']}
      />
    </React.Fragment>
  )
}

export const ProductSymptomListView: React.FC = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const {
    loading,
    error,
    productSymptoms,
    pageSize,
    networkStatus,
    refetch,
    ProductFilters,
  } = useProductFilters({ searchText })

  const networkActive = loading || networkStatus === 4
  const handleRefresh = () => refetch()
  const [productToDelete, setProductSymptomToDelete] = useState(
    null as ProductSymptom | null
  )
  const confirmProductSymptomToDelete = (product: ProductSymptom) =>
    setProductSymptomToDelete(product)
  const onClickNew = () => navigate('/admin/products/symptoms/new')
  const onSearchChange: React.ChangeEventHandler = event =>
    setSearchText((event.target as HTMLInputElement).value)

  return (
    <Layout.Layout>
      <Helmet title="Product Symptom - RPMed Service Admin" />
      <Content>
        <Toolbar.View>
          <Toolbar.Item grow={true}>
            <Toolbar.Search
              placeholder={'Lookup Symptom'}
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
              <Grid.Col span={4}>
                {networkActive ? (
                  <Heading.Title>Loading</Heading.Title>
                ) : (
                  <Heading.Title>
                    {pageSize ? pageSize : ''} Symptoms
                  </Heading.Title>
                )}
              </Grid.Col>
              <ProductFilters />
            </Grid.Row>
          </Card.Header>
          <Grid.Row>
            <Grid.Col span={16}>
              {loading ? (
                <Indicators.Spinner />
              ) : error ? (
                <Errors.LoadingError error={error} />
              ) : (
                <ProductSymptoms
                  onDelete={confirmProductSymptomToDelete}
                  productSymptoms={(productSymptoms || []) as ProductSymptom[]}
                />
              )}
            </Grid.Col>
          </Grid.Row>
        </Card.Flat>
      </Content>
      {productToDelete ? (
        <DestroyProductSymptomButton id={productToDelete.id}>
          {deleteProductSymptom => {
            const onDismiss = () => setProductSymptomToDelete(null)
            const onConfirm = () => {
              deleteProductSymptom()
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
        </DestroyProductSymptomButton>
      ) : null}
    </Layout.Layout>
  )
}
