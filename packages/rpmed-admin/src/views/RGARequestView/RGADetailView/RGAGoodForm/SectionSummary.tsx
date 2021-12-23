import { faPencil } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Box, Flex } from 'rebass'
import { Actions, Divider } from 'rpmed-ui/lib/V1'

interface ISummaryProps {
  onEdit: React.MouseEventHandler
  hidden: boolean
}

/**
 * Renders a short summary view of a completed section.
 * @param param0 Props for this component.
 */
export const SectionSummary: React.FC<ISummaryProps> = ({
  children,
  hidden,
  onEdit: handleEdit,
}) => {
  if (hidden) {
    return <span />
  }
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row" width={1}>
        <Box width={1}>{children}</Box>
        <Box my="auto">
          <Actions.Primary onClick={handleEdit}>
            <FontAwesomeIcon icon={faPencil} />
          </Actions.Primary>
        </Box>
      </Flex>
      <Divider.Light />
    </Flex>
  )
}
