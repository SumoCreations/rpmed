import { faStickyNote, faTag } from '@fortawesome/pro-regular-svg-icons'
import { Formik, FormikHelpers, FormikProps } from 'formik'

import * as React from 'react'
import * as Validation from 'rpmed-validation-schema'
import { Form, Indicators, Input } from 'rpmed-ui/lib/V1'

interface IDistributorFormValues {
  [key: string]: string | undefined
  id?: string | undefined
  name?: string | undefined
  domain?: string | undefined
}

export type DistributorFormSubmitHandler = (
  values: IDistributorFormValues,
  actions: FormikHelpers<IDistributorFormValues>
) => void

interface IDistributorFormProps {
  initialValues: IDistributorFormValues
  onSubmit: DistributorFormSubmitHandler
}

const FormField = Input.Renderer<IDistributorFormValues>()

const renderForm = ({
  handleSubmit,
  isSubmitting,
  values,
}: FormikProps<IDistributorFormValues>) => {
  const cannotSubmit = isSubmitting
  return (
    <Form.Form disabled={isSubmitting} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.RowItem size={Form.ItemSize.Long}>
          <FormField
            name="name"
            label="Name"
            placeholder="i.e. 'KLS Martin'"
            type="text"
            required={true}
            icon={faTag}
          />
        </Form.RowItem>
      </Form.Row>
      <Form.Row>
        <Form.RowItem size={Form.ItemSize.Long}>
          <FormField
            name="domain"
            label={'Domain'}
            type="text"
            required={true}
            icon={faStickyNote}
            placeholder="i.e. 'klsmartin.com'"
          />
        </Form.RowItem>
      </Form.Row>
      <Form.GeneralError name="_" />
      <Form.Button type="submit" disabled={cannotSubmit}>
        <span>
          {isSubmitting ? (
            <Indicators.Spinner size={'lg'} />
          ) : values.id ? (
            'Update Distributor'
          ) : (
            'Create Distributor'
          )}
        </span>
      </Form.Button>
    </Form.Form>
  )
}

export const DistributorForm: React.FunctionComponent<IDistributorFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      render={renderForm}
      validationSchema={Validation.Distributor.Default}
    />
  )
}
