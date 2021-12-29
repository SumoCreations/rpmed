import React from 'react'
import { Box, Flex } from 'rebass'
import { Divider, Form, Heading, Indicators } from 'rpmed-ui/lib/V1'
import { FormField, IInteractiveSection, IRGAGoodFormValues } from './types'
import { ShippingSpeedSelect } from '../RgaShippingSpeedSelect'
import { faAddressCard } from '@fortawesome/pro-solid-svg-icons'

interface IShippingDetailsSectionProps extends IInteractiveSection {
  isSubmitting: boolean
  values: IRGAGoodFormValues
  hideSubmit?: boolean
  onShippingSpeedSelect: (shippingSpeed: string) => void
}

export const ShippingDetailsSection: React.FC<IShippingDetailsSectionProps> = ({
  hideSubmit,
  isSubmitting: submitting,
  onShippingSpeedSelect: handleShippingSpeed,
  values,
  onSubmit: handleSubmit,
}) => (
  <Flex flexDirection="column" width={1}>
    <Heading.Section>Customer Shipping Info (6/6)</Heading.Section>
    <Form.Small>
      How & where should we ship this back to the customer.
    </Form.Small>
    <Divider.Light />
    <ShippingSpeedSelect
      value={values.shippingSpeed as string}
      onSelect={handleShippingSpeed}
    />
    <Flex>
      <Flex width={[1]}>
        <FormField
          name="customerStreet"
          label="Street"
          placeholder=""
          type="text"
          required={false}
          icon={faAddressCard}
        />
      </Flex>
    </Flex>
    <Flex>
      <Flex width={[1]}>
        <FormField
          name="customerStreet2"
          label="Street2"
          placeholder=""
          type="text"
          required={false}
        />
      </Flex>
    </Flex>
    <Flex>
      <Flex width={[1, 1 / 3]} marginRight={[0, 2]}>
        <FormField
          name="customerCity"
          label="City"
          placeholder=""
          type="text"
          required={false}
        />
      </Flex>
      <Flex width={[1, 4 / 9]} marginRight={[0, 2]}>
        <FormField
          name="customerState"
          label="State"
          placeholder=""
          type="text"
          required={false}
        />
      </Flex>
      <Flex width={[1, 2 / 9]}>
        <FormField
          name="customerZip"
          label="Zip"
          placeholder=""
          type="text"
          required={false}
        />
      </Flex>
    </Flex>
    <Flex>
      <Flex width={[1]}>
        <FormField
          name="customerCountry"
          label="Country"
          placeholder=""
          type="text"
          required={false}
        />
      </Flex>
    </Flex>
    <Box py={2}>
      <Form.GeneralError name="_" />
    </Box>
    {!hideSubmit && (
      <Form.Button
        type="submit"
        onClick={handleSubmit}
        form="goodForm"
        disabled={submitting}
      >
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
