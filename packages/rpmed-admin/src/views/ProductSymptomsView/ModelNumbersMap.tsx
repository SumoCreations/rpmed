import React, { useState } from 'react'
import { Card, Heading, Indicators, Tags } from 'rpmed-ui/lib/V1'
import { useModelNumbersSimpleQuery } from './graphql'
import { Box, Flex } from 'rebass'
import { ModelNumber } from '../../schema'

export type ModelSelectHandlerFn = (params: {
  modelNumber: string
  active: boolean
  associatedId: string
}) => void | Promise<void>

const ModelIndicator: React.FC<{
  associatedId: string
  modelNumber: string
  active?: boolean
  onSelect?: ModelSelectHandlerFn
}> = ({ active, modelNumber, associatedId, onSelect: handleSelect }) => {
  const [loading, setLoading] = useState(false)
  const handleToggle: React.MouseEventHandler = async e => {
    e.preventDefault()
    setLoading(true)
    await (handleSelect
      ? handleSelect({ modelNumber, active: !active, associatedId })
      : Promise.resolve())
    setLoading(false)
  }

  const Tag = active ? Tags.Actionable : Tags.ActionableSecondary
  return (
    <Tag
      as="button"
      size={Tags.Size.Small}
      onClick={handleToggle}
      style={{
        opacity: loading ? 0.5 : 1,
        pointerEvents: loading ? 'none' : 'all',
      }}
    >
      {modelNumber}
      {loading ? (
        <Box as="span" paddingLeft={2}>
          <Indicators.Spinner />
        </Box>
      ) : null}
    </Tag>
  )
}

interface IModelNumbersMapProps {
  associatedId: string
  hasModel: (model: string) => boolean
  onSelectModel?: ModelSelectHandlerFn
}

export const ModelNumbersMap: React.FC<IModelNumbersMapProps> = ({
  associatedId,
  hasModel,
  onSelectModel: handleSelectModel,
}) => {
  const { data } = useModelNumbersSimpleQuery()
  const modelNumbers = ((data && data.response && data.response.modelNumbers) ||
    []) as ModelNumber[]
  const modelNumbersMap = modelNumbers.reduce((groups, model) => {
    const prefix = model.id.split('-')[0]
    return {
      ...groups,
      [prefix]: [model.id, ...(groups[prefix] || [])],
    }
  }, {} as { [key: string]: string[] })
  return (
    <Flex style={{ overflowX: 'auto' }} width={1} flexWrap="wrap">
      {Object.keys(modelNumbersMap || {})
        .sort()
        .map(prefix => (
          <Flex key={`${associatedId}_${prefix}`} p={1}>
            <Card.Border>
              <Heading.Title>{prefix}</Heading.Title>
              <Tags.List>
                {modelNumbersMap[prefix].sort().map(model => (
                  <ModelIndicator
                    key={`${associatedId}_${model}`}
                    associatedId={associatedId}
                    modelNumber={model}
                    active={hasModel(model)}
                    onSelect={handleSelectModel}
                  />
                ))}
              </Tags.List>
            </Card.Border>
          </Flex>
        ))}
    </Flex>
  )
}
