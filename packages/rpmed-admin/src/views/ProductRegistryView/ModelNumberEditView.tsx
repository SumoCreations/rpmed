import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import * as React from 'react'
import { Helmet } from 'react-helmet'

import { ErrorList } from 'rpmed-validation-schema'
import { ModelNumber, Product } from 'rpmed-schema'
import {
  Actions,
  Card,
  Content,
  Indicators,
  Layout,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import { useModelNumberQuery, useUpdateModelNumberMutation } from 'rpmed-schema'
import {
  ModelNumberForm,
  ModelNumberFormSubmitHandler,
} from './ModelNumberForm'
import { useNavigate, useParams } from 'react-router-dom'

export const ModelNumberEditView: React.FC = () => {
  const { modelNumberId = '' } = useParams()
  const navigate = useNavigate()
  const handleBack = () =>
    navigate(`/admin/products/modelNumbers/${modelNumberId}`)
  const [updateModelNumber] = useUpdateModelNumberMutation()
  const { loading, data } = useModelNumberQuery({
    variables: { modelNumberId: modelNumberId ?? '' },
  })
  const modelNumber = data?.response?.modelNumber
  const handleSubmit: ModelNumberFormSubmitHandler = async (
    values,
    actions
  ) => {
    const removeTypename = ({ __typename, ...o }: any) => o
    const {
      productName,
      productList,
      products,
      symptoms,
      ...submitValues
    } = values
    try {
      const result = await updateModelNumber({
        variables: {
          modelNumberInput: {
            ...removeTypename(submitValues),
            lotted: submitValues.lotted ?? false,
            feeWithWarranty: removeTypename(submitValues.feeWithWarranty),
            feeWithoutWarranty: removeTypename(submitValues.feeWithoutWarranty),
            pricing: removeTypename(submitValues.pricing),
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
      navigate(`/admin/products/modelNumbers/${modelNumber?.id}`)
    } catch (e) {
      actions.setSubmitting(false)
      actions.setFieldError('_', e?.message)
    }
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
              loading ? 'Loading Product' : modelNumber?.id
            } - RPMed Service Admin`}
          />
          {loading ? (
            <Indicators.Spinner size="lg" />
          ) : (
            <h2>{modelNumber?.id}</h2>
          )}
          <ModelNumberForm
            initialValues={{
              ...((modelNumber ?? {}) as ModelNumber),
              productList: ((modelNumber?.products ||
                []) as Product[]).map(({ id, name }) => ({ id, name })),
            }}
            onSubmit={handleSubmit}
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
