import { faEye, faPlus, faSync } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import {
  Actions,
  Card,
  Content,
  Errors,
  Grid,
  Heading,
  Indicators,
  Layout,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import { useLinkSymptomToModelNumber } from './graphql'
import { useProductFilters } from './useProductFilters'
import { Flex } from 'rebass'
import { ModelNumbersMap, ModelSelectHandlerFn } from './ModelNumbersMap'

export const ProductSymptomMapView: React.FC = () => {
  const history = useHistory()
  const [searchText, setSearchText] = useState('')
  const {
    loading,
    error,
    productSymptoms,
    pageSize,
    networkStatus,
    refetch,
    ProductFilters,
  } = useProductFilters({ searchText })
  const linkSymptomToModelNumber = useLinkSymptomToModelNumber()
  const networkActive = loading || networkStatus === 4
  const handleRefresh = () => refetch()
  const onClickNew = () => history.push('/admin/products/symptoms/new')
  const onSearchChange: React.ChangeEventHandler = event =>
    setSearchText((event.target as HTMLInputElement).value)
  const navigateTo = (url: string) => () => history.push(url)
  return (
    <Layout.Layout>
      <Helmet title="Product Symptom - RPMed Service Admin" />
      <Content>
        <Toolbar.View>
          <Toolbar.Item grow={true}>
            <Toolbar.Search
              placeholder={'Lookup Symptom'}
              value={searchText}
              onChange={onSearchChange}
            />
          </Toolbar.Item>
          <Toolbar.Item spreadLeft={true}>
            <Actions.Group>
              {networkActive ? (
                <Actions.Toolbar>
                  <Indicators.Spinner />
                </Actions.Toolbar>
              ) : (
                <Actions.Toolbar onClick={handleRefresh}>
                  <FontAwesomeIcon icon={faSync} />
                </Actions.Toolbar>
              )}
              <Actions.Toolbar onClick={onClickNew}>
                <FontAwesomeIcon icon={faPlus} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
        </Toolbar.View>
        <Card.Flat>
          <Card.Header>
            <Grid.Row>
              <Grid.Col span={4}>
                {networkActive ? (
                  <Heading.Title>Loading</Heading.Title>
                ) : (
                  <Heading.Title>
                    {pageSize ? pageSize : ''} Symptoms
                  </Heading.Title>
                )}
              </Grid.Col>
              <ProductFilters />
            </Grid.Row>
          </Card.Header>
          <Grid.Row>
            <Grid.Col span={16}>
              {loading ? (
                <Indicators.Spinner />
              ) : error ? (
                <Errors.LoadingError error={error} />
              ) : (
                productSymptoms.map(s => {
                  const hasModel = (model: string) =>
                    (s.associatedModelNumbers || []).includes(model)
                  const handleSelectModel: ModelSelectHandlerFn = async ({
                    active,
                    associatedId,
                    modelNumber,
                  }) => {
                    await linkSymptomToModelNumber({
                      variables: {
                        linked: active,
                        modelNumber,
                        symptomId: associatedId,
                      },
                    })
                  }
                  return (
                    <Flex key={s.id} flexDirection="column">
                      <Flex
                        style={{ position: 'sticky', top: '4rem', zIndex: 9 }}
                        backgroundColor="rgba(255,255,255,0.8)"
                        py={2}
                        marginTop={3}
                        marginBottom={-1}
                      >
                        <Heading.Section>
                          {s.name} (<strong>{s.faultCode}</strong>)
                        </Heading.Section>
                        <Flex marginLeft="auto" marginY="auto">
                          <Actions.Group key={`actions${s.id}`}>
                            <Actions.Primary
                              onClick={navigateTo(
                                `/admin/products/symptoms/${s.id}`
                              )}
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </Actions.Primary>
                          </Actions.Group>
                        </Flex>
                      </Flex>
                      <ModelNumbersMap
                        associatedId={s.id}
                        hasModel={hasModel}
                        onSelectModel={handleSelectModel}
                      />
                    </Flex>
                  )
                })
              )}
            </Grid.Col>
          </Grid.Row>
        </Card.Flat>
      </Content>
    </Layout.Layout>
  )
}
