import { faChevronLeft, faPencil } from '@fortawesome/pro-regular-svg-icons'
import { faTrash } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik } from 'formik'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Flex } from 'rebass'
import {
  ProductSymptom,
  useLinkSymptomToModelNumberMutation,
} from 'rpmed-schema'
import {
  Actions,
  Card,
  Content,
  Data,
  Divider,
  Errors,
  Form,
  Grid,
  Heading,
  Indicators,
  Layout,
  Modal,
  Tags,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import {
  ProductSymptomSelectField,
  ProductSymptomSelectFn,
} from '../ProductSymptomsView'
import { useModelNumberQuery } from 'rpmed-schema'

const { useState } = React

interface IModelNumberRouterProps {
  modelNumberId: string
}

const View: React.FunctionComponent<RouteComponentProps<
  IModelNumberRouterProps
>> = ({ history, match }) => {
  const [associatedSymptoms, setAssociatedSymptoms] = useState([] as string[])
  const [symptomToRemove, setSymptomToRemove] = useState(null as string | null)
  const [linkSymptomToModelNumber] = useLinkSymptomToModelNumberMutation()
  const onSelectSymptom: ProductSymptomSelectFn = async symptom => {
    setAssociatedSymptoms([...associatedSymptoms, symptom.id])
    await linkSymptomToModelNumber({
      variables: {
        linked: true,
        modelNumber: match.params.modelNumberId,
        symptomId: symptom.id,
      },
    })
    refetch()
  }
  const onDismiss = (name: string) => () => null
  const handleBack = () => history.push('/admin/products/modelNumbers')
  const onClickEdit = () =>
    history.push(
      `/admin/products/modelNumbers/edit/${match.params.modelNumberId}`
    )
  const handleDeleteSymptom = (symptom: string) => () =>
    setSymptomToRemove(symptom)

  const { loading, refetch, data, error } = useModelNumberQuery({
    variables: { modelNumberId: match.params.modelNumberId },
  })
  const modelNumber = data?.response?.modelNumber
  if (error) {
    return (
      <Card.Flat>
        <Errors.LoadingError error={error} />
      </Card.Flat>
    )
  }
  const rows = ((modelNumber?.symptoms as ProductSymptom[]) || []).map(
    symptom => [
      <Link to={`/admin/products/symptoms/${symptom.id}`} key={symptom.id}>
        {symptom.faultCode}
      </Link>,
      symptom.name,
      <Actions.Group key={`actions${symptom.id}`}>
        <Actions.Destructive onClick={handleDeleteSymptom(symptom.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </Actions.Destructive>
      </Actions.Group>,
    ]
  )

  const dismissModal = () => setSymptomToRemove(null)
  const deleteSymptom = async () => {
    setAssociatedSymptoms(associatedSymptoms.filter(i => i !== symptomToRemove))
    await linkSymptomToModelNumber({
      variables: {
        linked: false,
        modelNumber: match.params.modelNumberId,
        symptomId: symptomToRemove || '',
      },
    })
    refetch()
  }
  const onConfirm = () => {
    deleteSymptom()
    dismissModal()
  }
  const handleSubmit = () => {
    return
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
          <Toolbar.Item spreadLeft={true}>
            <Actions.Group>
              <Actions.Toolbar onClick={onClickEdit}>
                <FontAwesomeIcon icon={faPencil} />
              </Actions.Toolbar>
            </Actions.Group>
          </Toolbar.Item>
        </Toolbar.View>
        <Grid.Row>
          <Grid.Col span={16}>
            <Card.Flat>
              <Helmet
                title={`${
                  loading ? 'Loading Model Number' : modelNumber?.id
                } - RPMed Service Admin`}
              />
              {loading ? (
                <Indicators.Spinner size="lg" />
              ) : (
                <React.Fragment>
                  <Grid.Row>
                    <Grid.Col span={16}>
                      <Heading.Title>{modelNumber?.id}</Heading.Title>
                    </Grid.Col>
                    <Grid.Col span={16}>
                      <Tags.List>
                        <Tags.Primary>{modelNumber?.productType}</Tags.Primary>
                        {modelNumber?.products?.map(p =>
                          p ? (
                            <Tags.Secondary key={p.id}>{p.name}</Tags.Secondary>
                          ) : null
                        )}
                        {modelNumber?.lotted ? (
                          <Tags.Secondary>Lotted</Tags.Secondary>
                        ) : null}
                      </Tags.List>
                    </Grid.Col>
                    <Grid.Col span={16}>
                      <Divider.Light />
                    </Grid.Col>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Col span={8}>
                      <Heading.Label>Description</Heading.Label>
                      <p>{modelNumber?.description}</p>
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Heading.Label>Warranty</Heading.Label>
                      <p>
                        {modelNumber?.warrantyTerm} months /{' '}
                        {modelNumber?.warrantyDescription}
                      </p>
                    </Grid.Col>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Col span={8}>
                      <Heading.Label>Public Notes</Heading.Label>
                      <p>{modelNumber?.publicNotes}</p>
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Heading.Label>Warranty Resolution</Heading.Label>
                      <p>
                        <strong>
                          {modelNumber?.feeWithWarranty?.distributor ?? 'RFQ'}/
                          {modelNumber?.feeWithWarranty?.endUser ?? 'RFQ'}
                        </strong>{' '}
                        - {modelNumber?.resolutionWithWarranty}
                      </p>
                    </Grid.Col>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Col span={8}>
                      <Heading.Label>Private Notes</Heading.Label>
                      <p>{modelNumber?.privateNotes}</p>
                    </Grid.Col>
                    <Grid.Col span={8}>
                      <Heading.Label>Resolution w/o Warranty</Heading.Label>
                      <p>
                        <strong>
                          {modelNumber?.feeWithoutWarranty?.distributor ??
                            'RFQ'}
                          /{modelNumber?.feeWithoutWarranty?.endUser ?? 'RFQ'}
                        </strong>{' '}
                        - {modelNumber?.resolutionWithoutWarranty}
                      </p>
                    </Grid.Col>
                  </Grid.Row>
                </React.Fragment>
              )}
            </Card.Flat>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col span={16}>
            <Divider.Light />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col span={6}>
            <Card.Flat style={{ marginBottom: 'auto' }}>
              <Grid.Row>
                <Grid.Col span={16}>
                  <Heading.Section>Add Symptom</Heading.Section>
                </Grid.Col>
                <Grid.Col span={16}>
                  <Form.Form>
                    <Form.Row>
                      <Form.RowItem size={Form.ItemSize.Long}>
                        <Formik
                          initialValues={{ productSymptom: '' }}
                          onSubmit={handleSubmit}
                        >
                          {() => (
                            <ProductSymptomSelectField
                              onDismiss={onDismiss('productSymptom')}
                              onSelect={onSelectSymptom}
                              value={''}
                              label="Troubleshooting Symptom"
                              placeholder="Select a Symptom"
                              name="productSymptom"
                              ignoreIds={(modelNumber?.symptoms || []).map(
                                s => (s as ProductSymptom).id
                              )}
                            />
                          )}
                        </Formik>
                      </Form.RowItem>
                    </Form.Row>
                  </Form.Form>
                </Grid.Col>
              </Grid.Row>
            </Card.Flat>
            <Flex marginBottom="auto" flex={1}>
              &nbsp;
            </Flex>
          </Grid.Col>
          <Grid.Col span={10}>
            <Card.Flat>
              <Grid.Row>
                <Grid.Col span={16}>
                  <Heading.Section>Troubleshooting Symptoms</Heading.Section>
                </Grid.Col>
                <Grid.Col span={16}>
                  <Divider.Light />
                </Grid.Col>
                <Grid.Col span={16}>
                  {(modelNumber?.symptoms || []).length > 0 ? (
                    <Data.Table
                      columnContentTypes={['text', 'text', 'numeric']}
                      initialSortColumnIndex={0}
                      sortable={[false, false, false]}
                      rows={rows}
                      headings={['Code', 'Description', '']}
                    />
                  ) : (
                    <p>
                      No symptoms are currently associated to this model number.
                    </p>
                  )}
                </Grid.Col>
              </Grid.Row>
            </Card.Flat>
          </Grid.Col>
        </Grid.Row>
      </Content>

      {symptomToRemove ? (
        <Modal.Dialog
          title={`Remove Associated Symptom?`}
          message={`Are you sure you want to remove this symptom from this model?`}
          onDismiss={dismissModal}
          onConfirm={onConfirm}
          destructive={true}
        />
      ) : null}
    </Layout.Layout>
  )
}

export const ModelNumberDetailView = View
