import { faEnvelope, faUserAlt } from '@fortawesome/pro-regular-svg-icons'
import React from 'react'
import { Box, Flex } from 'rebass'
import { Divider, Form, Heading, Indicators } from 'rpmed-ui/lib/V1'
import { FormField, IRGAGoodFormValues } from './types'
import { CustomerSpecialtySelect } from '../RgaCustomerSpecialtySelect'
import { faPhone } from '@fortawesome/pro-solid-svg-icons'

interface ICustomerDetailsSectionProps {
  isSubmitting: boolean
  values: IRGAGoodFormValues
  hideSubmit?: boolean
  onSubmit?: React.MouseEventHandler
  onCustomerSpecialtySelect: (specialty: string) => void
}

export const CustomerDetailsSection: React.FC<ICustomerDetailsSectionProps> = ({
  hideSubmit,
  isSubmitting: submitting,
  onCustomerSpecialtySelect: handleSpecialty,
  values,
  onSubmit: handleSubmit,
}) => {
  return (
    <Flex flexDirection="column" width={1}>
      <Form.Small>
        Automatically register this product for the customer.
      </Form.Small>
      <Divider.Light />
      <Flex>
        <Flex width={[1, 1, 1 / 3]} marginRight={[0, 0, 2]}>
          <FormField
            name="customerName"
            label="Customer Name"
            placeholder=""
            type="text"
            required={false}
            icon={faUserAlt}
          />
        </Flex>
        <Flex width={[1, 1, 1 / 3]} marginRight={[0, 0, 2]}>
          <FormField
            name="customerEmail"
            label="Customer Email"
            placeholder=""
            type="text"
            required={false}
            icon={faEnvelope}
          />
        </Flex>
        <Flex width={[1, 1, 1 / 3]}>
          <FormField
            name="customerPhone"
            label="Customer Phone"
            placeholder=""
            type="text"
            required={false}
            icon={faPhone}
          />
        </Flex>
      </Flex>
      <CustomerSpecialtySelect
        value={values.customerSpecialty as string}
        onSelect={handleSpecialty}
      />
      <Box py={2}>
        <Form.GeneralError name="_" />
      </Box>
      {!hideSubmit && (
        <Form.Button type="submit" disabled={submitting} onClick={handleSubmit}>
          <span>
            {submitting ? (
              <Indicators.Spinner size={'lg'} />
            ) : (
              'Confirm Customer Info'
            )}
          </span>
        </Form.Button>
      )}
    </Flex>
  )
}
