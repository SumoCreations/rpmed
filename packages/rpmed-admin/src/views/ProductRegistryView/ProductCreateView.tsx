import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import qs from 'query-string'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { ErrorList } from 'rpmed-validation-schema'
import { Actions, Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import { useCreateProductMutation } from 'rpmed-schema'
import { ProductForm, ProductFormSubmitHandler } from './ProductForm'

export const ProductCreateView: React.FC = () => {
  const navigate = useNavigate()
  const handleBack = () => navigate('/admin/products')
  const defaultValues = qs.parse(window.location.search)
  const [createProduct] = useCreateProductMutation()
  const handleSubmit: ProductFormSubmitHandler = async (values, actions) => {
    const result = await createProduct({
      variables: {
        productInput: {
          description: values.description || '',
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
    navigate('/admin/products')
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
          <Helmet title="Create Product - RPMed Service Admin" />
          <h2>New Product</h2>
          <ProductForm
            initialValues={{
              description: (defaultValues.description as string) || '',
              name: '',
            }}
            onSubmit={handleSubmit}
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
