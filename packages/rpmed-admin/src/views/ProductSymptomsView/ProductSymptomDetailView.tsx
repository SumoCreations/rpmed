import { faChevronLeft, faPencil } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router'
import {
  ProductSymptom,
  AttachedImage,
  useAttachImagesToSymptomMutation,
  useLinkSymptomToModelNumberMutation,
  useProductSymptomQuery,
} from 'rpmed-schema'
import {
  Actions,
  Card,
  Content,
  Divider,
  Grid,
  Heading,
  Indicators,
  Layout,
  Tags,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import { ModelNumbersMap, ModelSelectHandlerFn } from './ModelNumbersMap'
import { AssociatedPhotos } from './AssociatedPhotosView'
import { FilePreview } from 'rpmed-ui'

interface IProductSymptomRouterProps {
  productSymptomId: string
}

/**
 * Converts a file preview from the file drop component into a type
 * useable by the GraphQL API for attached images.
 * @param preview A form file preview from the file drop component.
 */
const convertToAttachedFile = (preview: FilePreview): AttachedImage => ({
  id: preview.id,
  position: preview.position ?? 0,
  status: preview.status as any,
})

/**
 * Renders the high level summary details for the symptom.
 * @param param0 The props for the view.
 */
const SymptomDetailView: React.FC<{
  productSymptom: ProductSymptom
  loading: boolean
}> = ({ productSymptom, loading }) => {
  return (
    <Card.Flat>
      <Helmet
        title={`${productSymptom.name ||
          'Loading ProductSymptom'} - RPMed Service Admin`}
      />
      {loading ? (
        <Indicators.Spinner size="lg" />
      ) : (
        <React.Fragment>
          <Grid.Row>
            <Grid.Col span={16}>
              <Heading.Title>{productSymptom.name}</Heading.Title>
            </Grid.Col>
            <Grid.Col span={16}>
              <Tags.List>
                <Tags.Primary>Product Symptom</Tags.Primary>
                <Tags.Secondary>id: {productSymptom.id}</Tags.Secondary>
                <Tags.Secondary>
                  code: {productSymptom.faultCode}
                </Tags.Secondary>
                {productSymptom.fee && <Tags.Error>Has Fee</Tags.Error>}
                {productSymptom.preApproved ? (
                  <Tags.Actionable>Pre-Approved Repair</Tags.Actionable>
                ) : (
                  <Tags.Secondary>Warrantied Repair</Tags.Secondary>
                )}
              </Tags.List>
            </Grid.Col>
            <Grid.Col span={16}>
              <Divider.Light />
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col span={8}>
              <Heading.Label>Synopsis</Heading.Label>
              <p>{productSymptom.synopsis}</p>
            </Grid.Col>
            <Grid.Col span={8}>
              <Heading.Label>Solution</Heading.Label>
              <p>{productSymptom.solution}</p>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col span={8}>
              <Heading.Label>Care Tip</Heading.Label>
              <p>{productSymptom.careTip}</p>
            </Grid.Col>
          </Grid.Row>
        </React.Fragment>
      )}
    </Card.Flat>
  )
}

interface IAssociatedModelListProps {
  associatedModelNumbers: string[]
  productSymptomId: string
}

/**
 * Renders a tag list containing product model numbers associated
 * to the specific model.
 * @param param0 The props for the view.
 */
const AssociatedModelsList: React.FC<IAssociatedModelListProps> = ({
  productSymptomId,
  associatedModelNumbers,
}) => {
  const [linkSymptomToModelNumber] = useLinkSymptomToModelNumberMutation()
  const hasModel = (model: string) =>
    (associatedModelNumbers || ([] as string[])).includes(model)
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
    <Card.Flat>
      <Grid.Row>
        <Grid.Col span={16}>
          <Heading.Section>Associated Product Models</Heading.Section>
        </Grid.Col>
        <Grid.Col span={16}>
          <Divider.Light />
        </Grid.Col>
        <Grid.Col span={16}>
          <ModelNumbersMap
            associatedId={productSymptomId}
            hasModel={hasModel}
            onSelectModel={handleSelectModel}
          />
        </Grid.Col>
      </Grid.Row>
    </Card.Flat>
  )
}

interface ISymptomPhotoListProps {
  productSymptomId: string
}

/**
 * Renders an associated photos list connected to the graphQL
 * API.
 * @param param0 Props for the view.
 */
const SymptomPhotoList: React.FC<ISymptomPhotoListProps> = ({
  productSymptomId,
}) => {
  const { data } = useProductSymptomQuery({
    variables: { productSymptomId: productSymptomId ?? '' },
  })
  const productSymptom = data?.response.productSymptom
  const [attachImages] = useAttachImagesToSymptomMutation()
  const handleUpdate = async (filePreviews: FilePreview[]) => {
    await attachImages({
      variables: {
        attachedImages: filePreviews.map(convertToAttachedFile),
        symptomId: productSymptomId,
      },
    })
  }
  const previews = (productSymptom
    ? ((productSymptom.attachedImages as any) as FilePreview[])
    : []) as FilePreview[]
  return <AssociatedPhotos previews={previews} onUpdate={handleUpdate} />
}

/**
 * The primary summary view for a product symptom.
 * @param param0 The props for the view.
 */
const View: React.FunctionComponent<RouteComponentProps<
  IProductSymptomRouterProps
>> = ({ history, match }) => {
  const { loading, data } = useProductSymptomQuery({
    variables: { productSymptomId: match.params.productSymptomId ?? '' },
  })
  const productSymptom = data?.response.productSymptom
  const handleBack = () => history.push('/admin/products/symptoms')
  const onClickEdit = () =>
    history.push(
      `/admin/products/symptoms/edit/${match.params.productSymptomId}`
    )

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
            <SymptomDetailView
              productSymptom={(productSymptom || {}) as ProductSymptom}
              loading={loading}
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col span={16}>
            <Divider.Light />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col span={16}>
            <AssociatedModelsList
              associatedModelNumbers={
                (productSymptom
                  ? productSymptom.associatedModelNumbers
                  : []) as string[]
              }
              productSymptomId={match.params.productSymptomId}
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col span={16}>
            <Divider.Light />
          </Grid.Col>
        </Grid.Row>
        <SymptomPhotoList productSymptomId={match.params.productSymptomId} />
      </Content>
    </Layout.Layout>
  )
}

export const ProductSymptomDetailView = View
