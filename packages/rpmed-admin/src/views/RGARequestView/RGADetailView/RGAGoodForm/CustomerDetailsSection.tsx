import { faEnvelope, faUserAlt } from '@fortawesome/pro-regular-svg-icons'
import React from 'react'
import { Box, Flex } from 'rebass'
import { Form, Heading, Indicators } from 'rpmed-ui/lib/V1'
import { FormField, IRGAGoodFormValues } from './types'
import { ShippingSpeedSelect } from '../../RgaShippingSpeedSelect'
import { CustomerSpecialtySelect } from '../../RgaCustomerSpecialitySelect'

interface ICustomerDetailsSectionProps {
  isSubmitting: boolean
  values: IRGAGoodFormValues
  hideSubmit?: boolean
  onShippingSpeedSelect: (shippingSpeed: string) => void
  onCustomerSpecialtySelect: (specialty: string) => void
}

export const CustomerDetailsSection: React.FC<ICustomerDetailsSectionProps> = ({
  hideSubmit,
  isSubmitting: submitting,
  onShippingSpeedSelect: handleShippingSpeed,
  onCustomerSpecialtySelect: handleSpecialty,
  values,
}) => (
  <Flex flexDirection="column">
    <Heading.Label>Customer Details</Heading.Label>
    <Form.Small>Automatically registers product for customer.</Form.Small>
    <FormField
      name="customerName"
      label="Customer Name"
      placeholder=""
      type="text"
      required={false}
      icon={faUserAlt}
    />
    <FormField
      name="customerEmail"
      label="Customer Email"
      placeholder=""
      type="text"
      required={false}
      icon={faEnvelope}
    />
    <CustomerSpecialtySelect
      value={values.customerSpecialty as string}
      onSelect={handleSpecialty}
    />
    <ShippingSpeedSelect
      value={values.shippingSpeed as string}
      onSelect={handleShippingSpeed}
    />
    <Box py={2}>
      <Form.GeneralError name="_" />
    </Box>
    {!hideSubmit && (
      <Form.Button type="submit" disabled={submitting}>
        <span>
          {submitting ? (
            <Indicators.Spinner size={'lg'} />
          ) : values.id ? (
            'Update Good'
          ) : (
            'Add Good'
          )}
        </span>
      </Form.Button>
    )}
  </Flex>
)
