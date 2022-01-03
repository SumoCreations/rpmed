import { faStickyNote } from '@fortawesome/pro-regular-svg-icons'
import React from 'react'
import { Box, Flex } from 'rebass'
import { Divider, Form, Heading, Input, Switch } from 'rpmed-ui/lib/V1'
import {
  ProductSymptomSelectField,
  ProductSymptomSelectFn,
} from '../../../ProductSymptomsView'
import { FormField, IInteractiveSection } from './types'

interface ISymptomDetailsSectionProps extends IInteractiveSection {
  onSelectSymptom: ProductSymptomSelectFn
  onToggleWarranty: () => any
}

/**
 * Presents any details regarding selecting a symptom and determining
 * warranty coverage.
 * @param param0 Props for this component.
 */
export const SymptomDetailsSection: React.FC<ISymptomDetailsSectionProps> = ({
  hideSubmit,
  onDismiss: handleDismiss,
  onSelectSymptom: handleSymptom,
  onSubmit: handleSubmit,
  onToggleWarranty: handleWarranty,
  values,
}) => {
  const sectionValid = (values.symptomId || '').length > 0
  return (
    <Flex flexDirection="column">
      <ProductSymptomSelectField
        onDismiss={handleDismiss('modelNumber')}
        onSelect={handleSymptom}
        value={values.symptomDescription || ''}
        label="Symptom / Issue"
        placeholder="Select a Symptom"
        name="symptomId"
        modelNumber={values.modelNumber}
      />
      {sectionValid ? (
        <React.Fragment>
          {!values.preApproved ? (
            values.warrantyTerm ? (
              <Input.FieldContainer>
                <Form.Label>
                  Was this item purchased within the last {values.warrantyTerm}{' '}
                  months?
                </Form.Label>
                <Switch.View
                  on={values.warrantied}
                  onClick={handleWarranty}
                  labels={['yes', 'no']}
                />
              </Input.FieldContainer>
            ) : (
              <Form.Small>
                Could not determine warranty details for this item.
              </Form.Small>
            )
          ) : null}
          {values.symptomSynopsis ? (
            <React.Fragment>
              <Heading.Label>Synopsis / Solution</Heading.Label>
              <Form.Small>{values.symptomSynopsis}</Form.Small>
            </React.Fragment>
          ) : null}
          {values.symptomSolution ? (
            <React.Fragment>
              <Divider.Light />
              <Form.Small>
                <strong>{values.symptomSolution}</strong>
              </Form.Small>
            </React.Fragment>
          ) : null}
          <Heading.Label>Repair Terms</Heading.Label>
          {
            <React.Fragment>
              {values.warrantyDescription ? (
                <Form.Small>
                  <strong>Warranty:</strong> {values.warrantyDescription}
                </Form.Small>
              ) : null}
              {values.resolution ? (
                <Form.Small>
                  <strong>Resolution:</strong> {values.resolution}
                </Form.Small>
              ) : null}
              {values.resolutionFee ? (
                <Form.Small>
                  <strong>Fee (cost/retail):</strong>{' '}
                  {values.resolutionFee?.distributor} /{' '}
                  {values.resolutionFee?.endUser}
                </Form.Small>
              ) : null}
            </React.Fragment>
          }
          <FormField
            name="notes"
            label="Any specific notes?"
            placeholder=""
            type="text"
            required={false}
            icon={faStickyNote}
          />
        </React.Fragment>
      ) : null}
      {!hideSubmit && (
        <Box paddingTop={2} width={1}>
          <Form.Button disabled={!sectionValid} onClick={handleSubmit}>
            <span>Confirm Symptom / Resolution</span>
          </Form.Button>
        </Box>
      )}
    </Flex>
  )
}
