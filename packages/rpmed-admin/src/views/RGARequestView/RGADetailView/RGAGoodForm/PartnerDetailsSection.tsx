import {
  faFileInvoice,
  faFileInvoiceDollar,
} from '@fortawesome/pro-regular-svg-icons'
import React from 'react'
import { Flex } from 'rebass'
import { Form, Heading } from 'rpmed-ui/lib/V1'

import { FormField, IRgaGoodFormSection } from './types'

/**
 * Presents any optional fields for partner related data and
 * correspondence with our own records.
 * @param param0 Props for this component.
 */
export const PartnerDetailsSection: React.FC<IRgaGoodFormSection> = ({
  hideSubmit,
  onSubmit: handleSubmit,
}) => (
  <Flex flexDirection="column">
    <Heading.Label>Partner Details</Heading.Label>
    <FormField
      name="rma"
      label="RMA (Customer / Optional)"
      placeholder=""
      type="text"
      required={false}
      icon={faFileInvoice}
    />
    <FormField
      name="po"
      label="PO (Customer)"
      placeholder=""
      type="text"
      required={false}
      icon={faFileInvoiceDollar}
    />
    {!hideSubmit && (
      <Form.Button onClick={handleSubmit}>
        <span>Save Details</span>
      </Form.Button>
    )}
  </Flex>
)
