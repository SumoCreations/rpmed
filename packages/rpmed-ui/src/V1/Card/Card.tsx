import React from 'react'
import { transparentize } from 'polished'
import { Flex } from 'rebass'
import * as Errors from '../Errors'
import * as Grid from '../Grid'
import * as Heading from '../Heading'
import * as Indicators from '../Indicators'
import styled from '../styled-components'

export const View = styled.article`
  background: ${(p) => p.theme.colorContentAreaBackground};
  border: 1px solid ${(p) => p.theme.colorContentAreaBorder};
  border-radius: ${(p) => p.theme.borderRadius};
  display: flex;
  flex-direction: column;
  padding: 18px;
  width: auto;
  flex-grow: 1;
  box-shadow: 0 0 36px rgba(0, 0, 0, 0.3);
  position: relative;

  & + & {
    margin-top: 18px;
  }
`

export const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  margin-top: -1rem;
  padding-top: 1rem;
  background: ${(p) => transparentize(0.2)(p.theme.colorContentAreaBackground)};
  z-index: 10;
`

export const Flat = styled(View as any)`
  box-shadow: none;
  border: 2px solid ${(p) => p.theme.colorContentAreaBorder};
`

export const Border = styled(View as any)`
  box-shadow: none;
  border: 1px solid ${(p) => p.theme.colorContentAreaBorder};
  padding: 8px;
`

export const CenteredSection = styled(Flex as any)`
  display: flex;
  align-content: center;
  margin: 0 auto;
`

export const Padding = styled.p`
  display: flex;
  margin: 0 auto;
  padding: 12px 0;
`

export const Standard: React.FC<{
  loading?: boolean
  error?: any
  title?: string
}> = ({ children, loading, error, title }) => (
  <Flat>
    <Header>
      <Grid.Row>
        <Grid.Col span={4}>
          {!title ? (
            <Heading.Title>Loading</Heading.Title>
          ) : (
            <Heading.Title>{title}</Heading.Title>
          )}
        </Grid.Col>
      </Grid.Row>
    </Header>
    <Grid.Row>
      <Grid.Col span={16}>
        {loading ? (
          <Indicators.Spinner />
        ) : error ? (
          <Errors.LoadingError error={error} />
        ) : (
          children
        )}
      </Grid.Col>
    </Grid.Row>
  </Flat>
)
