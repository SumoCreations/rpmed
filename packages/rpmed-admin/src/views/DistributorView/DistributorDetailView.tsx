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
  DistributorForm,
  DistributorFormSubmitHandler,
  IDistributorFormValues,
} from './DistributorForm'
import { useDistributorQuery, useUpdateDistributorMutation } from 'rpmed-schema'

interface IDistributorRouterProps {
  distributorId: string
}

const View: React.FunctionComponent<RouteComponentProps<
  IDistributorRouterProps
>> = ({ history, match }) => {
  const handleBack = () => history.push('/admin/distributors')
  const { data, loading } = useDistributorQuery({ variables: { distributorId: match.params.distributorId } })
  const distributor = data?.response.distributor
  const [updateDistributor, _] = useUpdateDistributorMutation()
  const handleSubmit: DistributorFormSubmitHandler = async (
    values,
    actions
  ) => {
    const result = await updateDistributor({
      variables: {
        distributorInput: {
          domain: values.domain ?? '',
          id: distributor?.id ?? '',
          name: values.name ?? '',
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
    history.push('/admin/distributors')
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
            title={`${distributor?.name ||
              'Loading Distributor'} - RPMed Service Admin`}
          />
          {loading ? (
            <Indicators.Spinner size="lg" />
          ) : (
            <h2>{distributor?.name}</h2>
          )}
          <DistributorForm
            initialValues={(distributor ?? {}) as IDistributorFormValues}
            onSubmit={handleSubmit}
          />
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}

export const DistributorDetailView = View
