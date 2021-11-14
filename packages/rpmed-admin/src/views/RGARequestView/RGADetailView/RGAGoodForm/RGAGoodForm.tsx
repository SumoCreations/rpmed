import { Formik } from 'formik'
import React, { useState } from 'react'
import * as Validation from 'rpmed-validation-schema'
import { FeeStructure, ModelNumber } from 'rpmed-schema'
import { Form, Heading } from 'rpmed-ui/lib/V1'
import {
  ModelNumberSelectFn,
  ProductSelectFn,
  ProductTypeSelectFn,
} from '../../../ProductRegistryView'
import { ProductSymptomSelectFn } from '../../../ProductSymptomsView'
import { CustomerDetailsSection } from './CustomerDetailsSection'
import { ModelNumberSection } from './ModelNumberSection'
import { PartnerDetailsSection } from './PartnerDetailsSection'
import { SectionSummary } from './SectionSummary'
import { SymptomDetailsSection } from './SymptomDetailsSection'
import { IRGAGoodFormValues, RGAGoodFormSubmitHandler } from './types'

enum FormSection {
  ModelNumber,
  Symptom,
  Details,
  Customer,
}

interface IRGAGoodFormProps {
  initialValues: IRGAGoodFormValues
  onSubmit: RGAGoodFormSubmitHandler
}

const ErrorSummary = Form.ErrorSummaryRenderer<IRGAGoodFormValues>()

export const RGAGoodForm: React.FunctionComponent<IRGAGoodFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const [formSection, setSection] = useState(FormSection.ModelNumber)
  const [modelNumber, setModel] = useState(null as ModelNumber | null)
  const handleReset = () => {
    // This handler isn't firing as expected so we're resetting the form via state in the parent.
    setSection(FormSection.ModelNumber)
  }
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={Validation.RGAGood.Default}
      onReset={handleReset}
    >
      {({
        errors,
        handleSubmit,
        isSubmitting,
        setFieldTouched,
        setFieldValue,
        submitCount,
        values,
      }) => {
        const resolutionForModelNumber = (warrantied?: boolean) =>
          modelNumber
            ? warrantied ?? values.warrantied
              ? modelNumber.resolutionWithWarranty
              : modelNumber.resolutionWithoutWarranty
            : 'Contact us if you have questions regarding this issue.'

        const resolutionFeeForModelNumber = (
          warrantied?: boolean
        ): FeeStructure | undefined | null => {
          if (modelNumber) {
            return warrantied ?? values.warrantied
              ? modelNumber.feeWithWarranty
              : modelNumber.feeWithoutWarranty
          }
          return { endUser: 'RFQ', distributor: 'RFQ' }
        }

        const handleSelectProductType: ProductTypeSelectFn = p => {
          setFieldValue('productType', p)
        }

        const handleSelectProduct: ProductSelectFn = p => {
          setFieldValue('productId', p.id)
          setFieldValue('productName', p.name)
          setFieldValue('modelNumber', '')
          setFieldValue('serial', '')
          setFieldValue('symptomId', '')
          setFieldTouched('modelNumber', false)
          setFieldTouched('serial', false)
          setFieldValue('lotted', '')
        }

        const handleSelectModel: ModelNumberSelectFn = m => {
          setFieldValue('modelNumber', m.id)
          setFieldValue('lotted', m.lotted)
          setFieldValue('warrantyDescription', m.warrantyDescription)
          setFieldValue('warrantyTerm', m.warrantyTerm)
          setModel(m)
          setTimeout(() => setFieldValue('modelNumber', m.id), 5)
          setFieldTouched('modelNumber', true)
        }

        const handleSelectSymptom: ProductSymptomSelectFn = s => {
          setFieldValue('symptomId', s.id)
          setFieldValue('symptomDescription', s.name)
          setFieldValue('symptomSynopsis', s.synopsis || 'n/a')
          setFieldValue('symptomSolution', s.solution || 'n/a')
          setFieldValue('resolution', resolutionForModelNumber())
          setFieldValue('resolutionFee', resolutionFeeForModelNumber())
          setFieldValue('preApproved', s.preApproved)
          setFieldValue('warrantied', s.preApproved)
        }

        const handleShippingSpeedSelect = (shippingSpeed: string) => {
          setFieldValue('shippingSpeed', shippingSpeed)
        }

        const handleSpecialtySelect = (specialty: string) => {
          setFieldValue('customerSpecialty', specialty)
        }

        const handleDismiss = (name: string) => () => setFieldTouched(name)

        const toggleWarranty = () => {
          setFieldValue('warrantied', !values.warrantied)
          setFieldValue(
            'resolution',
            resolutionForModelNumber(!values.warrantied)
          )
          setFieldValue(
            'resolutionFee',
            resolutionFeeForModelNumber(!values.warrantied)
          )
        }

        const clickToSection = (
          section: FormSection
        ): React.MouseEventHandler => () => setSection(section)

        const sectionIndex = [
          FormSection.ModelNumber,
          FormSection.Symptom,
          FormSection.Details,
          FormSection.Customer,
        ].indexOf(formSection)

        return (
          <Form.Form disabled={isSubmitting} onSubmit={handleSubmit}>
            {formSection !== FormSection.ModelNumber ? (
              <SectionSummary
                onEdit={clickToSection(FormSection.ModelNumber)}
                hidden={sectionIndex === 0}
              >
                <Heading.Label>Model:</Heading.Label>
                <Form.Small>{values.modelNumber}</Form.Small>
              </SectionSummary>
            ) : (
              <ModelNumberSection
                values={values}
                onDismiss={handleDismiss}
                onSelectModel={handleSelectModel}
                onSelectProduct={handleSelectProduct}
                onSelectProductType={handleSelectProductType}
                onSubmit={clickToSection(FormSection.Symptom)}
              />
            )}

            {formSection !== FormSection.Symptom ? (
              <SectionSummary
                onEdit={clickToSection(FormSection.Symptom)}
                hidden={sectionIndex < 1}
              >
                <Heading.Label>Warrantied:</Heading.Label>
                <Form.Small>
                  {values.warrantied ? 'Covered' : 'Not under Warranty'}
                </Form.Small>
              </SectionSummary>
            ) : (
              <SymptomDetailsSection
                values={values}
                onDismiss={handleDismiss}
                onSelectSymptom={handleSelectSymptom}
                onToggleWarranty={toggleWarranty}
                onSubmit={clickToSection(FormSection.Details)}
              />
            )}

            {formSection !== FormSection.Details ? (
              <SectionSummary
                onEdit={clickToSection(FormSection.Details)}
                hidden={sectionIndex < 2}
              >
                <Heading.Label>RMA / PO: (Customer)</Heading.Label>
                <Form.Small>
                  {values.rma || 'n/a'} / {values.po || 'n/a'}
                </Form.Small>
              </SectionSummary>
            ) : (
              <PartnerDetailsSection
                onSubmit={clickToSection(FormSection.Customer)}
              />
            )}

            {formSection !== FormSection.Customer ? (
              <SectionSummary
                onEdit={clickToSection(FormSection.Customer)}
                hidden={sectionIndex < 3}
              >
                <Heading.Label>Customer:</Heading.Label>
                <Form.Small>{values.customerName}</Form.Small>
              </SectionSummary>
            ) : (
              <CustomerDetailsSection
                isSubmitting={isSubmitting}
                values={values}
                onShippingSpeedSelect={handleShippingSpeedSelect}
                onCustomerSpecialtySelect={handleSpecialtySelect}
              />
            )}
            {submitCount > 0 ? <ErrorSummary errors={errors} /> : null}
          </Form.Form>
        )
      }}
    </Formik>
  )
}
