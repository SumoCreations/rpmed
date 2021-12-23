import { faBarcode, faCalendar } from '@fortawesome/pro-regular-svg-icons'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import * as React from 'react'
import * as Validation from 'rpmed-validation-schema'
import { Form, Indicators, Input } from 'rpmed-ui/lib/V1'
import { CustomerSelectField, CustomerSelectFn } from '../CustomerView'
import {
  ModelNumberSelectField,
  ModelNumberSelectFn,
} from '../ProductRegistryView'

import 'react-day-picker/lib/style.css'

export interface IProductRegistrationFormValues {
  [key: string]: string | boolean | undefined
  id?: string | undefined
  customerId?: string | undefined
  customerName?: string | undefined
  modelNumber?: string | undefined
  lotted?: boolean | undefined
  registeredOn?: string | undefined
  registeredOnDisplayDate?: string | undefined
  displayDate?: string | undefined
}

export type ProductRegistrationFormSubmitHandler = (
  values: IProductRegistrationFormValues,
  actions: FormikHelpers<IProductRegistrationFormValues>
) => void

interface IProductRegistrationFormProps {
  initialValues: IProductRegistrationFormValues
  onSubmit: ProductRegistrationFormSubmitHandler
}

const FormField = Input.Renderer<IProductRegistrationFormValues>()

const renderForm = ({
  handleSubmit,
  isSubmitting,
  setFieldValue,
  setFieldTouched,
  values,
}: FormikProps<IProductRegistrationFormValues>) => {
  const cannotSubmit = isSubmitting
  const onSelectCustomer: CustomerSelectFn = p => {
    setFieldValue('customerId', p.id)
    setFieldValue('customerName', p.name)
  }
  const onSelectModel: ModelNumberSelectFn = p => {
    setFieldValue('modelNumber', p.id)
    setFieldValue('lotted', p.lotted)
  }
  const onDismiss = (name: string) => () => setFieldTouched(name)
  const onSelectDate = (date: Date) => {
    setFieldValue('registeredOn', date.toISOString())
    setFieldValue('registeredOnDisplayDate', date.toLocaleDateString())
  }
  const selectedDate = new Date(values.registeredOn || '')
  return (
    <Form.Form disabled={isSubmitting} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.RowItem size={Form.ItemSize.Short}>
          <Input.DateSelect
            onSelectDate={onSelectDate}
            selectedDate={selectedDate}
            onDismiss={onDismiss('registeredOn')}
          >
            <FormField
              name="registeredOnDisplayDate"
              nameForError="registeredOn"
              label="Date Registered"
              type="text"
              icon={faCalendar}
              placeholder="mm/dd/yyyy"
            />
          </Input.DateSelect>
        </Form.RowItem>
        <Form.RowItem size={Form.ItemSize.Medium}>
          <CustomerSelectField
            onDismiss={onDismiss('customerId')}
            onSelect={onSelectCustomer}
            value={values.customerName || ''}
            label="Customer"
            placeholder="Select a Customer"
            name="customerId"
          />
        </Form.RowItem>
        <Form.RowItem size={Form.ItemSize.Medium}>
          <ModelNumberSelectField
            onDismiss={onDismiss('modelNumber')}
            onSelect={onSelectModel}
            value={values.modelNumber || ''}
            label="Model Number"
            placeholder="Select a Model"
            name="modelNumber"
          />
        </Form.RowItem>
      </Form.Row>
      {values.lotted ? (
        <Form.Row>
          <Form.RowItem size={Form.ItemSize.Long}>
            <FormField
              name="serial"
              label="Serial"
              type="text"
              icon={faBarcode}
              placeholder=""
            />
          </Form.RowItem>
        </Form.Row>
      ) : null}
      <Form.GeneralError name="_" />
      <Form.Button type="submit" disabled={cannotSubmit}>
        <span>
          {isSubmitting ? (
            <Indicators.Spinner size={'lg'} />
          ) : values.id ? (
            'Update Registration'
          ) : (
            'Register Product'
          )}
        </span>
      </Form.Button>
    </Form.Form>
  )
}

export const ProductRegistrationForm: React.FunctionComponent<IProductRegistrationFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      render={renderForm}
      validationSchema={Validation.ProductRegistration.Default}
    />
  )
}
