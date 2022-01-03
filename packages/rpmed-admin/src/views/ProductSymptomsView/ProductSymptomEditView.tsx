import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { Helmet } from 'react-helmet'

import { ValidationError } from 'rpmed-schema'
import {
  Actions,
  Card,
  Content,
  Indicators,
  Layout,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import {
  useProductSymptomQuery,
  useUpdateProductSymptomMutation,
} from 'rpmed-schema'
import {
  ProductSymptomForm,
  ProductSymptomFormSubmitHandler,
} from './ProductSymptomForm'
import { useNavigate, useParams } from 'react-router-dom'

const View: React.FC = () => {
  const navigate = useNavigate()
  const { productSymptomId = '' } = useParams()
  const [updateProductSymptom] = useUpdateProductSymptomMutation()
  const { loading, data } = useProductSymptomQuery({
    variables: { productSymptomId },
  })
  const productSymptom = data?.response.productSymptom

  const handleBack = () =>
    navigate(`/admin/products/symptoms/${productSymptomId}`)

  const handleSubmit: ProductSymptomFormSubmitHandler = async (
    values,
    actions
  ) => {
    const result = await updateProductSymptom({
      variables: {
        productSymptomInput: {
          careTip: values.careTip || '',
          faultCode: values.faultCode || '',
          fee: values.fee || false,
          id: productSymptomId,
          name: values.name || '',
          preApproved: values.preApproved || false,
          solution: values.solution || '',
          synopsis: values.synopsis || '',
        },
      },
    })
    actions.setSubmitting(false)
    const errors = ((result &&
      result.data &&
      result.data.response &&
      result.data.response.errors) ||
      []) as ValidationError[]
    if (errors.length > 0) {
      errors.forEach(({ path, message }) => {
        actions.setFieldError(path as any, message)
      })
      return
    }
    navigate(`/admin/products/symptoms/${productSymptomId}`)
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
              productSymptom ? productSymptom.name : 'Loading ProductSymptom'
            } - RPMed Service Admin`}
          />
          {loading ? (
            <Indicators.Spinner size="lg" />
          ) : (
            <h2>{productSymptom ? productSymptom.name : ''}</h2>
          )}
          <ProductSymptomForm
            initialValues={{
              ...(productSymptom as any),
            }}
            onSubmit={handleSubmit}
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}

export const ProductSymptomEditView = View
