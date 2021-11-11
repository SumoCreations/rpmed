import {
  faCopy,
  faEye,
  faPencil,
  faPlus,
  faSync,
  faTrash,
} from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik } from 'formik'
import { History } from 'history'
import qs from 'query-string'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { ModelNumber, ProductType } from '../../schema'
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
import { DestroyModelNumberButton } from './DestroyModelNumberButton'
import { useModelNumbers } from './graphql'
import { ProductSelectField, ProductSelectFn } from './ProductSelectField'
import {
  ProductTypeSelectField,
  ProductTypeSelectFn,
} from './ProductTypeSelectField'

const sendTo = (p: { history: History; url: string }) => () =>
  p.history.push(p.url)

interface IModelNumberProps {
  history: History
  onDelete: (modelNumber: ModelNumber) => void
  filterText: string
  modelNumbers: ModelNumber[]
}

const ModelNumbersList: React.FunctionComponent<IModelNumberProps> = ({
  history,
  onDelete,
  filterText,
  modelNumbers,
}) => {
  const filterModelNumber = ({ description, id }: ModelNumber) =>
    filterText.length > 0
      ? [id, description]
          .map(
            val =>
              val?.toLowerCase().indexOf(filterText.toLowerCase()) ?? -1 >= 0
          )
          .includes(true)
      : true

  const onClickDelete = (modelNumber: ModelNumber) => () =>
    onDelete(modelNumber)

  const rows = modelNumbers
    ? modelNumbers.filter(filterModelNumber).map(model => [
        <Link to={`/admin/products/modelNumbers/${model.id}`} key={model.id}>
          {model.id}
        </Link>,
        model.description,
        model.lotted ? 'YES' : 'NO',
        `${model.warrantyTerm} mo`,
        <Actions.Group key={`actions${model.id}`}>
          <Actions.Primary
            onClick={sendTo({
              history,
              url: `/admin/products/modelNumbers/${model.id}`,
            })}
          >
            <FontAwesomeIcon icon={faEye} />
          </Actions.Primary>
          <Actions.Primary
            onClick={sendTo({
              history,
              url: `/admin/products/modelNumbers/edit/${model.id}`,
            })}
          >
            <FontAwesomeIcon icon={faPencil} />
          </Actions.Primary>
          <Actions.Primary
            onClick={sendTo({
              history,
              url: `/admin/products/modelNumbers/new?${qs.stringify({
                ...model,
              })}`,
            })}
          >
            <FontAwesomeIcon icon={faCopy} />
          </Actions.Primary>
          <Actions.Destructive onClick={onClickDelete(model)}>
            <FontAwesomeIcon icon={faTrash} />
          </Actions.Destructive>
        </Actions.Group>,
      ])
    : []

  return (
    <Data.Table
      columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text']}
      widths={['20%', '50%', '5%', '5%', '20%']}
      initialSortColumnIndex={0}
      sortable={[false, false, false, false]}
      rows={rows}
      headings={['ID', 'Description', 'Lotted', 'Warranty', '']}
    />
  )
}

export const ModelNumberListView: React.FC<RouteComponentProps<{}>> = ({
  history,
}) => {
  const [modelNumberToDelete, setModelNumberToDelete] = useState(
    null as ModelNumber | null
  )
  const [productId, setProductId] = useState('')
  const [productName, setProductName] = useState('')
  const [productType, setProductType] = useState(null as ProductType | null)
  const [searchText, setSearchText] = useState('')
  const confirmModelNumberToDelete = (modelNumber: ModelNumber) =>
    setModelNumberToDelete(modelNumber)
  const onClickNew = () => history.push('/admin/products/modelNumbers/new')
  const onSearchChange: React.ChangeEventHandler = event =>
    setSearchText((event.target as HTMLInputElement).value)
  const {
    loading,
    error,
    networkStatus,
    modelNumbers,
    pageSize,
    refetch,
  } = useModelNumbers({ productId, productType })
  const handleRefresh = () => refetch()
  const networkActive = loading || networkStatus === 4
  const handleSelectProduct: ProductSelectFn = p => {
    setProductId(p.id)
    setProductName(p.name)
  }
  const handleSelectProductType: ProductTypeSelectFn = pt => {
    setProductType(pt)
  }

  if (error) {
    return <Errors.LoadingError error={error} />
  }

  const handleSubmit = () => {
    return
  }

  return (
    <Layout.Layout>
      <Helmet title="Model Numbers - RPMed Service Admin" />
      <Content>
        <Toolbar.View>
          <Toolbar.Item grow={true}>
            <Toolbar.Search
              placeholder={'Lookup Model'}
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
                    {pageSize ? pageSize : ''} Model Numbers
                  </Heading.Title>
                )}
              </Grid.Col>
              <Formik
                initialValues={{ productType: '', productName: '' }}
                onSubmit={handleSubmit}
              >
                {() => (
                  <React.Fragment>
                    <Grid.Col span={4}>
                      <ProductTypeSelectField
                        onSelect={handleSelectProductType}
                        value={productType || ''}
                        placeholder="Filter by Type"
                        name="productType"
                        margin="0 0 1rem 0"
                        height="auto"
                        clearable="All Products"
                      />
                    </Grid.Col>
                    <Grid.Col span={5}>
                      <ProductSelectField
                        onSelect={handleSelectProduct}
                        value={productName || ''}
                        placeholder="Filter by Product"
                        name="productName"
                        margin="0 0 1rem 0"
                        height="auto"
                        clearable="All Products"
                      />
                    </Grid.Col>
                  </React.Fragment>
                )}
              </Formik>
            </Grid.Row>
          </Card.Header>
          <Grid.Row>
            <Grid.Col span={16}>
              {error ? (
                <Errors.LoadingError error={error} />
              ) : (
                <ModelNumbersList
                  history={history}
                  onDelete={confirmModelNumberToDelete}
                  filterText={searchText}
                  modelNumbers={modelNumbers}
                />
              )}
            </Grid.Col>
          </Grid.Row>
        </Card.Flat>
      </Content>
      {modelNumberToDelete ? (
        <DestroyModelNumberButton
          id={modelNumberToDelete.id}
          productId={productId}
          productType={productType}
        >
          {deleteModelNumber => {
            const onDismiss = () => setModelNumberToDelete(null)
            const onConfirm = () => {
              deleteModelNumber()
              onDismiss()
            }
            return (
              <Modal.Dialog
                title={`Delete ${modelNumberToDelete.id}?`}
                message={`Are you sure you want to delete '${modelNumberToDelete.id}'? You can not undo this action.`}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                destructive={true}
              />
            )
          }}
        </DestroyModelNumberButton>
      ) : null}
    </Layout.Layout>
  )
}
