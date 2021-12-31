import { faPencil } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Formik, FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { Box, Flex, Text } from 'rebass'
import * as Validation from 'rpmed-validation-schema'
import { ModelNumber, FeeStructure } from 'rpmed-schema'
import {
  Actions,
  Divider,
  Form,
  Heading,
  Indicators,
  media,
  styled,
} from 'rpmed-ui/lib/V1'
import {
  ModelNumberSelectFn,
  ProductSelectFn,
  ProductTypeSelectFn,
} from '../../../ProductRegistryView'
import { ProductSymptomSelectFn } from '../../../ProductSymptomsView'
import { IRGAGoodFormValues } from '../RGAGoodForm'
import { AdvancedSection } from './AdvancedSection'

const SummaryView = styled(Flex)<{ active?: boolean }>`
  border: 1px solid
    ${p =>
      p.active
        ? p.theme.colorContentAreaBorderSelected
        : p.theme.colorContentAreaBorder};
  border-radius: ${p => p.theme.borderRadius};
`

const SummaryContainer = styled(Box)`
  display: none;
  ${media.minMd`display: block;`}
`

enum FormSection {
  Advanced,
  ModelNumber,
  Symptom,
  Details,
  Customer,
}

export type RGAGoodFormSubmitHandler = (
  values: IRGAGoodFormValues,
  actions: FormikHelpers<any>
) => void

interface ISummaryProps {
  onEdit: React.MouseEventHandler
  hidden?: boolean
  active?: boolean
}

/**
 * Renders a short summary view of a completed section.
 * @param param0 Props for this component.
 */
const SectionSummary: React.FC<ISummaryProps> = ({
  active,
  children,
  hidden,
  onEdit: handleEdit,
}) => {
  if (hidden) {
    return <span />
  }
  return (
    <SummaryView
      flexDirection="column"
      active={active}
      onClick={handleEdit}
      px={2}
      my={2}
    >
      <Flex flexDirection="row" width={1}>
        <Box width={1}>{children}</Box>
        <Box marginTop={2}>
          {active ? (
            <Actions.PrimaryInverted>
              <FontAwesomeIcon icon={faPencil} />
            </Actions.PrimaryInverted>
          ) : (
            <Actions.Primary>
              <FontAwesomeIcon icon={faPencil} />
            </Actions.Primary>
          )}
        </Box>
      </Flex>
    </SummaryView>
  )
}

export interface IRGAEditGoodFormValues extends IRGAGoodFormValues {
  faultCode: string
  disposition: string
  datePurchased: string
  additionalComments?: string
  ssd: boolean
}

interface IRGAGoodFormProps {
  initialValues: IRGAEditGoodFormValues
  onSubmit: RGAGoodFormSubmitHandler
  onCancel: () => any
}

const ErrorSummary = Form.ErrorSummaryRenderer<IRGAEditGoodFormValues>()

export const RGAGoodEditForm: React.FC<IRGAGoodFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const [formSection, setSection] = useState(FormSection.Advanced)
  const [modelNumber, setModel] = useState(null as ModelNumber | null)
  const clickToSection = (
    section: FormSection
  ): React.MouseEventHandler => () => setSection(section)
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
        values,
        submitCount,
        submitForm,
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

        const handleDisposition = (value?: string) => {
          setFieldValue('disposition', value)
        }

        const handleSSD = (value?: boolean) => {
          setFieldValue('ssd', value)
        }

        const handleSelectProduct: ProductSelectFn = p => {
          setFieldValue('productId', p.id)
          setFieldValue('productName', p.name)
          setFieldValue('modelNumber', '')
          // setFieldValue('serial', '')
          // setFieldValue('symptomId', '')
          setFieldTouched('modelNumber', false)
          setFieldTouched('serial', false)
          setFieldValue('lotted', false)
        }

        const handleSelectModel: ModelNumberSelectFn = m => {
          setFieldValue('modelNumber', m.id)
          setFieldValue('lotted', m.lotted)
          setFieldValue('warrantyDescription', m.warrantyDescription)
          setFieldValue('warrantyTerm', m.warrantyTerm)
          setModel(m)
        }

        const handleSelectSymptom: ProductSymptomSelectFn = s => {
          setFieldValue('symptomId', s.id)
          setFieldValue('symptomDescription', s.name)
          setFieldValue('symptomSynopsis', s.synopsis ?? 'n/a')
          setFieldValue('symptomSolution', s.solution ?? 'n/a')
          setFieldValue('resolution', resolutionForModelNumber())
          setFieldValue('resolutionFee', resolutionFeeForModelNumber())
          setFieldValue('preApproved', s.preApproved)
          setFieldValue('warrantied', s.preApproved)
          setFieldValue('faultCode', s.faultCode)
        }
        const handleDismiss = (name: string) => () => setFieldTouched(name)

        const toggleWarranty = (newValue?: boolean) => {
          setFieldValue('warrantied', newValue ?? !values.warrantied)
          setFieldValue('ssd', false)
          setFieldValue(
            'resolution',
            resolutionForModelNumber(newValue ?? !values.warrantied)
          )
          setFieldValue(
            'resolutionFee',
            resolutionFeeForModelNumber(newValue ?? !values.warrantied)
          )
        }

        const handleShippingSpeed = (shippingSpeed: string) => {
          setFieldValue('shippingSpeed', shippingSpeed)
        }

        const handleSpecialty = (specialty: string) => {
          setFieldValue('customerSpecialty', specialty)
        }

        return (
          <Flex flexDirection="column">
            <Flex
              flexDirection={['column', 'column', 'row-reverse', 'row-reverse']}
            >
              <SummaryContainer
                width={[1, 1, 1 / 3, 1 / 4]}
                marginLeft={[0, 0, 2, 4]}
              >
                <SectionSummary
                  onEdit={clickToSection(FormSection.Advanced)}
                  active={formSection === FormSection.Advanced}
                >
                  <Heading.Label>Advanced</Heading.Label>
                  <Form.Small>Edit / Override Any Attribute</Form.Small>
                </SectionSummary>
              </SummaryContainer>
              <Box width={[1, 1, 2 / 3, 3 / 4]}>
                <Form.Form disabled={isSubmitting} onSubmit={handleSubmit}>
                  {formSection === FormSection.Advanced ? (
                    <AdvancedSection
                      values={values}
                      onSelectDisposition={handleDisposition}
                      onSelectSSD={handleSSD}
                      onDismiss={handleDismiss}
                      onSelectModel={handleSelectModel}
                      onSelectProduct={handleSelectProduct}
                      onSelectProductType={handleSelectProductType}
                      onSelectSymptom={handleSelectSymptom}
                      onToggleWarranty={toggleWarranty}
                      onSelectShipping={handleShippingSpeed}
                      onSelectSpecialty={handleSpecialty}
                      onSubmit={clickToSection(FormSection.Symptom)}
                      hideSubmit={true}
                    />
                  ) : null}
                </Form.Form>
              </Box>
            </Flex>
            <Divider.Light />
            <Box py={2}>
              {submitCount > 0 ? <ErrorSummary errors={errors} /> : null}
            </Box>
            <Flex
              flexDirection={[
                'column',
                'column',
                'column',
                'row-reverse',
                'row-reverse',
              ]}
            >
              <Box marginLeft={[0, 0, 0, 2]} width={[1, 1, 1, 1 / 3, 1 / 4]}>
                <Form.Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  <Flex flexDirection="row" as="p" m="auto">
                    <Text as="span" margin="auto" width={1} textAlign="center">
                      Save Changes
                    </Text>
                    {isSubmitting ? (
                      <Box as="span" marginLeft={2}>
                        <Indicators.Spinner size={'lg'} />
                      </Box>
                    ) : null}
                  </Flex>
                </Form.Button>
              </Box>
              <Box
                marginLeft={[0, 0, 0, 'auto']}
                marginY={[2, 2, 2, 0, 0]}
                width={[1, 1, 1, 1 / 4, 1 / 5]}
              >
                <Form.Button destructive={true} onClick={onCancel}>
                  <Flex flexDirection="row" as="p" m="auto">
                    <Text as="span" margin={0} width={1} textAlign="center">
                      Cancel
                    </Text>
                  </Flex>
                </Form.Button>
              </Box>
            </Flex>
          </Flex>
        )
      }}
    </Formik>
  )
}
