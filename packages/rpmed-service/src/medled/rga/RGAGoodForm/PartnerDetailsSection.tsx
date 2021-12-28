import React from 'react'
import { Flex } from 'rebass'
import { Divider, Form, Heading, Input } from 'rpmed-ui'

import { IRgaGoodFormSection } from './types'

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
    <Heading.Section>Partner Info (4/6)</Heading.Section>
    <Divider.Light />
    <Flex flexDirection={['column', 'row']} marginBottom={2}>
      <Flex marginRight={[0, 2]} width={[1, 1 / 2]}>
        <Input.Field
          name="po"
          label="PO (Customer)"
          placeholder=""
          type="text"
          required={false}
        />
      </Flex>
      <Input.Field
        name="rma"
        label="RMA (Customer / Optional)"
        placeholder=""
        type="text"
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
