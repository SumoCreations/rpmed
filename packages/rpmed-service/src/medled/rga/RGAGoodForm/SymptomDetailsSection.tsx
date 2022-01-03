import React from 'react'
import { Box, Flex } from 'rebass'
import { Divider, Form, Heading, Input, Switch } from 'rpmed-ui/lib/V1'
import {
  ProductSymptomSelectField,
  ProductSymptomSelectFn,
} from './ProductSymptomSelectField'
import { IInteractiveSection } from './types'

const FormField = Input.Renderer<any>()

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
    <Flex flexDirection="column" width={1}>
      <Heading.Section>Warranty Info (3/6)</Heading.Section>
      <Divider.Light />
      <ProductSymptomSelectField
        onDismiss={handleDismiss?.('modelNumber')}
        onSelect={handleSymptom}
        value={values.symptomDescription || ''}
        label="Symptom / Issue"
        placeholder="Select a Symptom"
        name="symptomId"
        modelNumber={values.modelNumber}
      />
      {sectionValid ? (
        <Flex flexDirection="column">
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
          <Flex flexDirection={['column', 'row']}>
            {values.symptomSynopsis ? (
              <Flex
                width={[1, 1 / 2]}
                marginRight={[0, 3]}
                flexDirection="column"
              >
                <Heading.Label>Synopsis</Heading.Label>
                <Form.Small>{values.symptomSynopsis}</Form.Small>
              </Flex>
            ) : null}
            {values.symptomSolution ? (
              <Flex width={[1, 1 / 2]} flexDirection="column">
                <Heading.Label>Solution</Heading.Label>
                <Form.Small>
                  <strong>{values.symptomSolution}</strong>
                </Form.Small>
              </Flex>
            ) : null}
          </Flex>
          <Heading.Label>Repair Terms</Heading.Label>
          <Flex flexDirection={['column', 'row']} flexWrap="wrap">
            {values.warrantyDescription ? (
              <Flex width={[1, 1 / 2]} marginRight={[0, 2]}>
                <Form.Small>
                  <strong>Warranty:</strong> {values.warrantyDescription}
                </Form.Small>
              </Flex>
            ) : null}
            {values.resolution ? (
              <Flex width={[1, 1 / 2]} marginRight={[0, 2]}>
                <Form.Small>
                  <strong>Resolution:</strong> {values.resolution}
                </Form.Small>
              </Flex>
            ) : null}
            {values.resolutionFee ? (
              <Flex width={[1, 1 / 2]} marginRight={[0, 2]}>
                <Form.Small>
                  <strong>Fee:</strong> {values.resolutionFee}
                </Form.Small>
              </Flex>
            ) : null}
          </Flex>
          <FormField
            name="notes"
            label="Any specific notes?"
            required={false}
          />
        </Flex>
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
