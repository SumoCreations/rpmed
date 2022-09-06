import React from 'react'
import { Flex } from 'rebass'
import { Form, Input } from 'rpmed-ui/lib/V1'

import { IRgaGoodFormSection } from './types'

const FormField = Input.Renderer<any>()

/**
 * Presents any optional fields for partner related data and
 * correspondence with our own records.
 * @param param0 Props for this component.
 */
export const PartnerDetailsSection: React.FC<IRgaGoodFormSection> = ({
  hideSubmit,
  onSubmit: handleSubmit,
}) => (
  <Flex flexDirection="column" width={1}>
    <Flex flexDirection={['column', 'row']} marginBottom={2}>
      <Flex marginRight={[0, 2]} width={[1, 1 / 2]}>
        <FormField name="po" label="PO (Customer)" required={false} />
      </Flex>
      <FormField
        name="rma"
        label="RMA (Customer / Optional)"
        required={false}
      />
    </Flex>
    {!hideSubmit && (
      <Form.Button onClick={handleSubmit}>
        <span>Save Details</span>
      </Form.Button>
    )}
  </Flex>
)
