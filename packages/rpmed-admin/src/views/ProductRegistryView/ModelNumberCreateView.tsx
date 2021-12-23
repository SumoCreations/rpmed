import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import get from 'lodash.get'
import qs from 'query-string'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { ErrorList } from 'rpmed-validation-schema'
import { ProductType } from 'rpmed-schema'
import { Actions, Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import { mapDefaultValues } from '../../validations'
import { useCreateModelNumberMutation } from 'rpmed-schema'
import {
  IModelNumberFormValues,
  ModelNumberForm,
  ModelNumberFormSubmitHandler,
} from './ModelNumberForm'

export const ModelNumberCreateView: React.FC<RouteComponentProps> = ({
  history,
  location,
}) => {
  const [createModelNumber] = useCreateModelNumberMutation()
  const handleBack = () => history.push('/admin/products/modelNumbers')
  const queryValues = qs.parse(location.search) as IModelNumberFormValues
  const handleSubmit: ModelNumberFormSubmitHandler = async (
    values,
    actions
  ) => {
    const { productName, productList, ...submitValues } = values
    const result = await createModelNumber({
      variables: {
        modelNumberInput: {
          ...submitValues,
        },
      },
    })
    actions.setSubmitting(false)
    const errors = (get(result, 'data.response.errors') || []) as ErrorList
    if (errors.length > 0) {
      errors.forEach(({ path, message }) => {
        actions.setFieldError(path as any, message)
      })
      console.log(errors)
      return
    }
    console.log('Lets push to the next view...')
    history.push(`/admin/products/modelNumbers/${values.id}`)
  }
  const initialValues = mapDefaultValues<IModelNumberFormValues>(queryValues, {
    description: '',
    feeWithWarranty: { distributor: '', endUser: '' },
    feeWithoutWarranty: { distributor: '', endUser: '' },
    id: '',
    lotted: false,
    pricing: { cost: '', retail: '' },
    productIds: [],
    productList: [],
    productType: ProductType.Headlight,
    warrantyTerm: 0,
  })
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
          <Helmet title="Create Model Number - RPMed Service Admin" />
          <h2>New Model Number</h2>
          <ModelNumberForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
