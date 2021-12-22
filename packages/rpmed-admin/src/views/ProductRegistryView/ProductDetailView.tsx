import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { ErrorList } from 'rpmed-validation-schema'
import {
  Actions,
  Card,
  Content,
  Indicators,
  Layout,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import {
  Product,
  ProductInput,
  useProductQuery,
  useUpdateProductMutation,
} from 'rpmed-schema'
import { ProductForm, ProductFormSubmitHandler } from './ProductForm'

interface IProductRouterProps {
  productId: string
}

const View: React.FunctionComponent<RouteComponentProps<
  IProductRouterProps
>> = ({ history, match }) => {
  const [updateProduct] = useUpdateProductMutation()
  const { loading, data } = useProductQuery({
    variables: {
      productId: match.params.productId,
    },
  })
  const extendedProduct = (data?.response?.product ?? {}) as Product
  const { modelNumbers, ...product } = extendedProduct
  const handleBack = () => history.push('/admin/products')
  const handleSubmit: ProductFormSubmitHandler = async (values, actions) => {
    const result = await updateProduct({
      variables: {
        productInput: {
          description: values.description || '',
          id: product.id,
          name: values.name || '',
        },
      },
    })
    actions.setSubmitting(false)
    const errors = (get(result, 'data.response.errors') || []) as ErrorList
    if (errors.length > 0) {
      errors.forEach(({ path, message }) => {
        actions.setFieldError(path as any, message)
      })
      return
    }
    history.push('/admin/products')
  }
  return (
    <Layout.Layout>
      <Content>
        <Toolbar.View>
          <Toolbar.Item spreadLeft={false}>
            <Actions.Group>
              <Actions.Toolbar onClick={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
        </Toolbar.View>
        <Card.Flat>
          <Helmet
            title={`${
              loading ? 'Loading Product' : product.name
            } - RPMed Service Admin`}
          />
          {loading ? <Indicators.Spinner size="lg" /> : <h2>{product.name}</h2>}
          <ProductForm
            initialValues={product as ProductInput}
            onSubmit={handleSubmit}
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}

export const ProductDetailView = View
