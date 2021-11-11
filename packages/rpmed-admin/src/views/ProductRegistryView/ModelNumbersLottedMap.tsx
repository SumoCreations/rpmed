import { faPlus, faSync } from '@fortawesome/pro-solid-svg-icons'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import { Card, Content, Layout, Toolbar } from 'rpmed-ui/lib/V1'
import {
  useModelNumbersLottedQuery,
  useUpdateModelNumberLottedMutation,
} from '../ProductSymptomsView/graphql'
import { ModelNumbersMap, ModelSelectHandlerFn } from '../ProductSymptomsView'

export const ModelNumbersLottedMap: React.FC = () => {
  const history = useHistory()
  const {
    loading,
    error,
    data,
    networkStatus,
    refetch,
  } = useModelNumbersLottedQuery({
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  })
  const lottedModels = data?.response?.modelNumbers ?? []
  const networkActive = loading || networkStatus === 4
  const handleRefresh = () => refetch()
  const onClickNew = () => history.push('/admin/products/modelNumbers/new')
  const [updateLotted] = useUpdateModelNumberLottedMutation()
  const handleSelectModel: ModelSelectHandlerFn = async ({
    modelNumber,
    active,
  }) => {
    await updateLotted({
      variables: {
        id: modelNumber,
        lotted: active,
      },
    })
  }
  const hasModel = (model: string) =>
    lottedModels
      .filter(m => m?.lotted)
      .map(m => m?.id)
      .includes(model)

  return (
    <Layout.Layout>
      <Helmet title="Product Lotted Map - RPMed Service Admin" />
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
        <Card.Standard loading={loading} error={error} title="Model Lotted Map">
          <ModelNumbersMap
            associatedId={'lottedMap'}
            hasModel={hasModel}
            onSelectModel={handleSelectModel}
          />
        </Card.Standard>
      </Content>
    </Layout.Layout>
  )
}
