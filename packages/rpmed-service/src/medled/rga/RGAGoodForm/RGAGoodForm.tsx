import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Flex } from 'rebass'
import * as Yup from 'yup'
import { ModelNumber } from 'rpmed-schema'
import { Form } from 'rpmed-ui/lib/V1'
import * as Validation from '../../../validations'
import { CustomerDetailsSection } from './CustomerDetailsSection'
import { ModelNumberGrid } from './ModelNumberGrid'
import { SymptomSelectGrid } from './SymptomSelectGrid'
import { ModelNumberSelectFn } from './ModelNumberSelectField'
import { PartnerDetailsSection } from './PartnerDetailsSection'
import { ProductSelectFn } from './ProductSelectField'
import { ProductSymptomSelectFn } from './ProductSymptomSelectField'
import { ShippingDetailsSection } from './ShippingDetailsSection'
import { SymptomDetailsSection } from './SymptomDetailsSection'
import { FormSection, IRGAGoodFormProps } from './types'

const validationSchema = Yup.object({
  customerEmail: Validation.OptionalEmail(),
  customerName: Validation.OptionalString(),
  modelNumber: Validation.OptionalString(),
  notes: Validation.OptionalString(),
  po: Validation.OptionalString(),
  rma: Validation.OptionalString(),
  symptomId: Validation.RequiredString(),
  warrantied: Yup.boolean().required(),
})

export const RGAGoodForm: React.FC<IRGAGoodFormProps> = ({
  initialValues,
  initialSection,
  onSubmit,
  editing,
  onSectionChange,
}) => {
  const [formSection, setSection] = useState(FormSection.ModelNumber)
  const [modelNumber, setModel] = useState(null as ModelNumber | null)

  const updateSection = (section: FormSection) => {
    if (onSectionChange) {
      onSectionChange(section)
    }
    console.log(`Updating section to ${section}`)
    setSection(section)
  }

  const handleReset = () => {
    // This handler isn't firing as expected so we're resetting the form via state in the parent.
    updateSection(FormSection.ModelNumber)
  }

  useEffect(() => {
    console.log(`The initial section: ${initialSection}`)
    if ((initialSection ?? 0) !== formSection) {
      updateSection(initialSection ?? 0)
    }
  }, [initialSection, updateSection, formSection])

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      onReset={handleReset}
    >
      {({
        handleSubmit,
        isSubmitting,
        setFieldTouched,
        setFieldValue,
        values,
      }) => {
        const resolutionForModelNumber = () =>
          modelNumber
            ? values.warrantied
              ? modelNumber?.resolutionWithWarranty
              : modelNumber?.resolutionWithoutWarranty
            : 'Contact us if you have questions regarding this issue.'

        const resolutionFeeForModelNumber = () =>
          modelNumber
            ? values.warrantied
              ? modelNumber?.feeWithWarranty?.distributor
              : modelNumber?.feeWithoutWarranty?.distributor
            : 'Contact us if you have questions on pricing regarding this issue.'

        const handleShippingSpeedSelect = (shippingSpeed: string) => {
          setFieldValue('shippingSpeed', shippingSpeed)
        }

        const handleSpecialtySelect = (specialty: string) => {
          setFieldValue('customerSpecialty', specialty)
        }

        const handleSelectProduct: ProductSelectFn = (p: any) => {
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
          console.log('SELECTED MODEL: ', m)
          setFieldValue('modelNumber', m.id)
          setFieldValue('lotted', m.lotted)
          setFieldValue('warrantyDescription', m.warrantyDescription)
          setFieldValue('warrantyTerm', m.warrantyTerm)
          setModel(m)
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

        const handleDismiss = (name: string) => () => setFieldTouched(name)

        const toggleWarranty = () =>
          setFieldValue('warrantied', !values.warrantied)

        const clickToSection = (
          section: FormSection
        ): React.MouseEventHandler => () => updateSection(section)

        return (
          <form onSubmit={handleSubmit} id="goodForm">
            <Flex flexDirection={['column-reverse', 'row-reverse']}>
              <Flex width={editing ? [1, 2 / 3] : 1}>
                {formSection !== FormSection.ModelNumber ? null : (
                  <ModelNumberGrid
                    values={values}
                    onDismiss={handleDismiss}
                    onSelectModel={handleSelectModel}
                    onSelectProduct={handleSelectProduct}
                    onSubmit={clickToSection(FormSection.Symptom)}
                  />
                )}

                {formSection !== FormSection.Symptom ? null : (
                  <SymptomSelectGrid
                    values={values}
                    onDismiss={handleDismiss}
                    onSelectSymptom={handleSelectSymptom}
                    onToggleWarranty={toggleWarranty}
                    onSubmit={clickToSection(FormSection.Synopsis)}
                  />
                )}

                {formSection !== FormSection.Synopsis ? null : (
                  <SymptomDetailsSection
                    values={values}
                    onDismiss={handleDismiss}
                    onSelectSymptom={handleSelectSymptom}
                    onToggleWarranty={toggleWarranty}
                    onSubmit={clickToSection(FormSection.Details)}
                  />
                )}

                {formSection !== FormSection.Details ? null : (
                  <PartnerDetailsSection
                    onSubmit={clickToSection(FormSection.Customer)}
                  />
                )}

                {formSection !== FormSection.Customer ? null : (
                  <CustomerDetailsSection
                    onCustomerSpecialtySelect={handleSpecialtySelect}
                    isSubmitting={isSubmitting}
                    values={values}
                    onSubmit={clickToSection(FormSection.Shipping)}
                  />
                )}

                {formSection !== FormSection.Shipping ? null : (
                  <ShippingDetailsSection
                    onShippingSpeedSelect={handleShippingSpeedSelect}
                    isSubmitting={isSubmitting}
                    values={values}
                    onSubmit={e => {
                      e.preventDefault()
                      handleSubmit(e as any)
                    }}
                  />
                )}
                <footer>
                  <Form.GeneralError name="_" />
                </footer>
              </Flex>
            </Flex>
          </form>
        )
      }}
    </Formik>
  )
}
