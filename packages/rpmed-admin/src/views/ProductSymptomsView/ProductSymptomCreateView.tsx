import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import qs from 'query-string'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { ErrorList } from 'rpmed-validation-schema'
import { Actions, Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import { useCreateProductSymptomMutation } from 'rpmed-schema'
import {
  ProductSymptomForm,
  ProductSymptomFormSubmitHandler,
} from './ProductSymptomForm'

export const ProductSymptomCreateView: React.FC<RouteComponentProps> = ({
  history,
}) => {
  const [createProductSymptom, _] = useCreateProductSymptomMutation()
  const handleBack = () => history.push('/admin/products/symptoms')
  const handleSubmit: ProductSymptomFormSubmitHandler = async (
    values,
    actions
  ) => {
    const result = await createProductSymptom({
      variables: {
        productSymptomInput: {
          careTip: values.careTip || '',
          faultCode: values.faultCode || '',
          fee: values.fee || false,
          name: values.name || '',
          preApproved: values.preApproved || false,
          solution: values.solution || '',
          synopsis: values.synopsis || '',
        },
      },
    })
    actions.setSubmitting(false)
    const errors = (get(result, 'data.response.errors') || []) as ErrorList
    if (errors.length > 0) {
      errors.forEach(({ path, message }) => {
        actions.setFieldError((path as any), message)
      })
      return
    }
    history.push('/admin/products/symptoms')
  }
  const defaultValues = qs.parse(window.location.search)
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
          <Helmet title="Create Product Symptom - RPMed Service Admin" />
          <h2>New Product Symptom</h2>
          <ProductSymptomForm
            initialValues={{
              careTip: (defaultValues.careTip as string) || '',
              faultCode: (defaultValues.faultCode as string) || '',
              fee: defaultValues.fee === 'true',
              name: (defaultValues.name as string) || '',
              preApproved: defaultValues.preApproved === 'true',
              solution: (defaultValues.solution as string) || '',
              synopsis: (defaultValues.synopsis as string) || '',
            }}
            onSubmit={handleSubmit}
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
