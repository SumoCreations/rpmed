import {
  faCalendarCheck,
  faDollarSign,
  faLock,
  faLockOpen,
  faStickyNote,
  faTag,
  faTrashAlt,
} from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'
import { ModelNumberInput, Product } from 'rpmed-schema'
import { Form, Indicators, Input, Switch, Tags } from 'rpmed-ui/lib/V1'
import { mapDefaultValues } from '../../validations'
import { ProductSelectField, ProductSelectFn } from './ProductSelectField'
import {
  ProductTypeSelectField,
  ProductTypeSelectFn,
} from './ProductTypeSelectField'

interface IProductName {
  id: string
  name: string
}

export interface IModelNumberFormValues extends ModelNumberInput {
  [key: string]: any
  productList: IProductName[]
}

export type ModelNumberFormSubmitHandler = (
  values: IModelNumberFormValues,
  actions: FormikHelpers<IModelNumberFormValues>
) => void

interface IModelNumberFormProps {
  initialValues: IModelNumberFormValues
  onSubmit: ModelNumberFormSubmitHandler
}

const FormField = Input.Renderer<IModelNumberFormValues>()
const ErrorSummary = Form.ErrorSummaryRenderer<IModelNumberFormValues>()

const validationSchema = Yup.object({
  description: Yup.string().required('Cannot be blank'),
  feeWithWarranty: Yup.object().shape({
    distributor: Yup.string().required('Cannot be blank'),
    endUser: Yup.string().required('Cannot be blank'),
  }),
  feeWithoutWarranty: Yup.object().shape({
    distributor: Yup.string().required('Cannot be blank'),
    endUser: Yup.string().required('Cannot be blank'),
  }),
  id: Yup.string().required('Cannot be blank'),
  lotted: Yup.boolean().required('Cannot be blank'),
  pricing: Yup.object().shape({
    cost: Yup.string().required('Cannot be blank'),
    retail: Yup.string().required('Cannot be blank'),
  }),
  privateNotes: Yup.string(),
  productIds: Yup.array(Yup.string().required('Cannot be blank')),
  publicNotes: Yup.string(),
  resolutionWithWarranty: Yup.string(),
  resolutionWithoutWarranty: Yup.string(),
  warrantyDescription: Yup.string().required('Cannot be blank'),
  warrantyTerm: Yup.number().required('Cannot be blank'),
})

export const ModelNumberForm: React.FunctionComponent<IModelNumberFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const isNew =
    typeof initialValues.id === 'string' && initialValues.id.length > 0
  const defaults: IModelNumberFormValues = {
    ...initialValues,
    lotted: false,
    feeWithWarranty: { distributor: '', endUser: '' },
    feeWithoutWarranty: { distributor: '', endUser: '' },
    pricing: { cost: '', retail: '' },
    productName: '',
  }
  const mappedValues = mapDefaultValues<IModelNumberFormValues>(
    initialValues,
    defaults
  )
  return (
    <Formik
      initialValues={mappedValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        errors,
        handleSubmit,
        isSubmitting,
        submitCount,
        values,
        setFieldValue,
        setFieldTouched,
      }: FormikProps<IModelNumberFormValues>) => {
        const cannotSubmit = isSubmitting
        const toggleLotted = () => setFieldValue('lotted', !values.lotted)
        const productDismissed = () => setFieldTouched('productId')
        const onSelectProduct: ProductSelectFn = p => {
          setFieldValue('productIds', [...(values.productIds ?? []), p.id])
          setFieldValue('productList', [...(values.productList || []), p])
        }
        const handleDeleteProduct = (
          id: string
        ): React.MouseEventHandler => () => {
          setFieldValue('productIds', [
            ...(values.productIds?.filter(c => c !== id) ?? []),
          ])
          setFieldValue('productList', [
            ...(values.productList || []).filter(c => c.id !== id),
          ])
        }
        const onSelectProductType: ProductTypeSelectFn = p =>
          setFieldValue('productType', p)

        return (
          <Form.Form disabled={isSubmitting} onSubmit={handleSubmit}>
            <Form.Row>
              <Form.RowItem size={Form.ItemSize.Medium}>
                <FormField
                  name="id"
                  label={`ID ${isNew ? '(cannot be renamed)' : ''}`}
                  disabled={isNew}
                  placeholder="MC7-ST-SK"
                  type="text"
                  required={true}
                  icon={faTag}
                />
              </Form.RowItem>
              <Form.RowItem size={Form.ItemSize.Medium}>
                <ProductTypeSelectField
                  onDismiss={productDismissed}
                  onSelect={onSelectProductType}
                  value={values.productType || ''}
                  label="Type"
                  placeholder="Select a Type"
                  name="productType"
                />
              </Form.RowItem>
              <Form.RowItem size={Form.ItemSize.Short}>
                <Input.FieldContainer>
                  <Form.Label>Lotted</Form.Label>
                  <Switch.View on={values.lotted} onClick={toggleLotted} />
                </Input.FieldContainer>
              </Form.RowItem>
            </Form.Row>
            <Form.Row>
              <Form.RowItem size={Form.ItemSize.Long}>
                <FormField
                  name="description"
                  label={'Description'}
                  type="text"
                  required={true}
                  icon={faStickyNote}
                  placeholder="MedLED Chrome MC7 PRO Soft Top; Standard Kit"
                />
              </Form.RowItem>
            </Form.Row>
            <Form.Row>
              <Form.RowItem size={Form.ItemSize.Short}>
                <ProductSelectField
                  onDismiss={productDismissed}
                  onSelect={onSelectProduct}
                  value={''}
                  ignoreIds={(values.productIds || []) as string[]}
                  label="Associated Product"
                  placeholder="Select a Product"
                  name="associatedProduct"
                />
              </Form.RowItem>
              <Form.RowItem size={Form.ItemSize.Long}>
                {values.productList.length > 0 ? (
                  <Tags.List>
                    {(values.productList as Product[]).map(p => (
                      <Tags.Primary key={p.id} size={Tags.Size.Large}>
                        {p.name}
                        <Tags.Action onClick={handleDeleteProduct(p.id)}>
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Tags.Action>
                      </Tags.Primary>
                    ))}
                  </Tags.List>
                ) : (
                  <p>No products are currently associated to this model.</p>
                )}
              </Form.RowItem>
            </Form.Row>
            <h3>Pricing</h3>
            <Form.Row>
              <Form.RowItem size={Form.ItemSize.Short}>
                <FormField
                  name="pricing.cost"
                  label={'Cost'}
                  type="text"
                  required={true}
                  icon={faDollarSign}
                  placeholder="0"
                />
              </Form.RowItem>
              <Form.RowItem size={Form.ItemSize.Short}>
                <FormField
                  name="pricing.retail"
                  label={'Retail'}
                  type="text"
                  required={true}
                  icon={faDollarSign}
                  placeholder="0"
                />
              </Form.RowItem>
            </Form.Row>
            <h2>Warranty</h2>
            <Form.Row>
              <Form.RowItem size={Form.ItemSize.Short}>
                <FormField
                  name="warrantyTerm"
                  label={'Term'}
                  type="number"
                  required={true}
                  icon={faCalendarCheck}
                  placeholder="months"
                />
              </Form.RowItem>
              <Form.RowItem size={Form.ItemSize.Long}>
                <FormField
                  name="warrantyDescription"
                  label={'Description'}
                  type="text"
                  required={true}
                  icon={faStickyNote}
                  placeholder="i.e. 'Headlight covered under warranty'"
                />
              </Form.RowItem>
            </Form.Row>
            <h3>In Warranty</h3>
            <Form.Row>
              <Form.RowItem size={Form.ItemSize.Short}>
                <FormField
                  name="feeWithWarranty.distributor"
                  label={'Fee (Distributor)'}
                  type="text"
                  required={true}
                  icon={faDollarSign}
                  placeholder="0"
                />
              </Form.RowItem>
              <Form.RowItem size={Form.ItemSize.Short}>
                <FormField
                  name="feeWithWarranty.endUser"
                  label={'Fee (End User)'}
                  type="text"
                  required={true}
                  icon={faDollarSign}
                  placeholder="0"
                />
              </Form.RowItem>
              <Form.RowItem size={Form.ItemSize.Long}>
                <FormField
                  name="resolutionWithWarranty"
                  label={'Resolution w/ Warranty'}
                  type="text"
                  icon={faStickyNote}
                  placeholder="i.e. 'Send in for servicing'"
                />
              </Form.RowItem>
            </Form.Row>
            <h3>Without Warranty</h3>
            <Form.Row>
              <Form.RowItem size={Form.ItemSize.Short}>
                <FormField
                  name="feeWithoutWarranty.distributor"
                  label={'Fee w/o Warranty'}
                  type="text"
                  required={true}
                  icon={faDollarSign}
                  placeholder="250"
                />
              </Form.RowItem>
              <Form.RowItem size={Form.ItemSize.Short}>
                <FormField
                  name="feeWithoutWarranty.endUser"
                  label={'Fee w/o Warranty'}
                  type="text"
                  required={true}
                  icon={faDollarSign}
                  placeholder="250"
                />
              </Form.RowItem>
              <Form.RowItem size={Form.ItemSize.Long}>
                <FormField
                  name="resolutionWithoutWarranty"
                  label={'Resolution w/o Warranty'}
                  type="text"
                  icon={faStickyNote}
                  placeholder="i.e. 'Purchase a newer model'"
                />
              </Form.RowItem>
            </Form.Row>
            <h2>Notes</h2>
            <Form.Row>
              <Form.RowItem size={Form.ItemSize.Long}>
                <FormField
                  name="publicNotes"
                  label={'Public Notes'}
                  type="text"
                  icon={faLockOpen}
                  placeholder="i.e. 'Sales for this product have been discontinued.'"
                />
              </Form.RowItem>
            </Form.Row>
            <Form.Row>
              <Form.RowItem size={Form.ItemSize.Long}>
                <FormField
                  name="privateNotes"
                  label={'Private Notes'}
                  type="text"
                  icon={faLock}
                  placeholder="i.e. 'Sales are being discontinued 07/01/19, service being discontinued 07/01/20'"
                />
              </Form.RowItem>
            </Form.Row>
            <Form.GeneralError name="_" />
            {submitCount > 0 ? <ErrorSummary errors={errors} /> : null}
            <Form.Button type="submit" disabled={cannotSubmit}>
              <span>
                {isSubmitting ? (
                  <Indicators.Spinner size={'lg'} />
                ) : isNew ? (
                  'Update Model Number'
                ) : (
                  'Create Model Number'
                )}
              </span>
            </Form.Button>
          </Form.Form>
        )
      }}
    </Formik>
  )
}
