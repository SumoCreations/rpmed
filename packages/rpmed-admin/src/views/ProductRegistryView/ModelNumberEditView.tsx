import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { ErrorList } from 'rpmed-validation-schema'
import { Product } from '../../schema'
import {
  Actions,
  Card,
  Content,
  Indicators,
  Layout,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import { useModelNumber, useUpdateModelNumber } from './graphql'
import {
  ModelNumberForm,
  ModelNumberFormSubmitHandler,
} from './ModelNumberForm'

interface IModelNumberRouterProps {
  modelNumberId: string
}

export const ModelNumberEditView: React.FC<RouteComponentProps<
  IModelNumberRouterProps
>> = ({ match, history }) => {
  const handleBack = () =>
    history.push(`/admin/products/modelNumbers/${match.params.modelNumberId}`)
  const updateModelNumber = useUpdateModelNumber()
  const { loading, modelNumber } = useModelNumber(match.params.modelNumberId)
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
          actions.setFieldError(path, message)
        })
        return
      }
      history.push(`/admin/products/modelNumbers/${modelNumber.id}`)
    } catch (e) {
      actions.setSubmitting(false)
      actions.setFieldError('_', e.message)
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
              loading ? 'Loading Product' : modelNumber.id
            } - RPMed Service Admin`}
          />
          {loading ? (
            <Indicators.Spinner size="lg" />
          ) : (
            <h2>{modelNumber.id}</h2>
          )}
          <ModelNumberForm
            initialValues={{
              ...modelNumber,
              productList: ((modelNumber.products ||
                []) as Product[]).map(({ id, name }) => ({ id, name })),
            }}
            onSubmit={handleSubmit}
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
