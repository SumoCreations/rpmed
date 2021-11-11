import { faPlus, faSync } from '@fortawesome/pro-solid-svg-icons'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import {
  useModelNumbersViewableQuery,
  useUpdateModelNumberViewableMutation,
} from './graphql'
import { ModelNumbersMap, ModelSelectHandlerFn } from '../ProductSymptomsView'

export const ModelNumbersViewableMap: React.FC = () => {
  const history = useHistory()
  const {
    loading,
    error,
    data,
    networkStatus,
    refetch,
  } = useModelNumbersViewableQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  })
  const viewableModels = data?.response?.modelNumbers ?? []
  const networkActive = loading || networkStatus === 4
  const handleRefresh = () => refetch()
  const onClickNew = () => history.push('/admin/products/modelNumbers/new')
  const [updateLotted] = useUpdateModelNumberViewableMutation()
  const handleSelectModel: ModelSelectHandlerFn = async ({
    modelNumber,
    active,
  }) => {
    await updateLotted({
      variables: {
        id: modelNumber,
        publiclyViewable: active,
      },
    })
  }
  const hasModel = (model: string) =>
    viewableModels
      .filter(m => m?.publiclyViewable)
      .map(m => m?.id)
      .includes(model)

  return (
    <Layout.Layout>
      <Helmet title="Product Viewable Map - RPMed Service Admin" />
      <Content>
        <Toolbar.Renderer
          rightActions={[
            {
              loading: networkActive,
              onClick: handleRefresh,
              icon: faSync,
              name: 'Refresh',
            },
            {
              onClick: onClickNew,
              icon: faPlus,
              name: 'New',
            },
          ]}
        />
        <Card.Standard
          loading={loading}
          error={error}
          title="Model Viewable Map"
        >
          <ModelNumbersMap
            associatedId={'viewableMap'}
            hasModel={hasModel}
            onSelectModel={handleSelectModel}
          />
        </Card.Standard>
      </Content>
    </Layout.Layout>
  )
}
