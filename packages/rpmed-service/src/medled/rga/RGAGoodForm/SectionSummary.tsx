import { faPencil } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Box, Flex } from 'rebass'
import { Actions, Divider } from 'rpmed-ui/lib/V1'

interface ISummaryProps {
  onEdit: React.MouseEventHandler
  hidden?: boolean
  disabled?: boolean
}

/**
 * Renders a short summary view of a completed section.
 * @param param0 Props for this component.
 */
export const SectionSummary: React.FC<ISummaryProps> = ({
  children,
  hidden,
  disabled,
  onEdit: handleEdit,
}) => {
  if (hidden) {
    return <span />
  }
  return (
    <Flex width={1} paddingRight={[0, 2]} flexDirection="column">
      <Flex flexDirection="row" width={1}>
        <Box width={1}>{children}</Box>
        {!disabled ? (
          <Box my="auto">
            <Actions.Primary onClick={handleEdit}>
              <FontAwesomeIcon icon={faPencil} />
            </Actions.Primary>
          </Box>
        ) : null}
      </Flex>
      <Divider.Light />
    </Flex>
  )
}
