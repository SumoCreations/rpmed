import { faExternalLinkAlt } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { Logo } from '../Brand'
import Container from '../Container'
import { media } from '../media'
import styled from '../styled-components'
import PrimaryHeader from './PrimaryHeader'
import SecondaryLink from './SecondaryLink'

const Flex = styled.span`
  display: flex;
  flex-direction: row;

  & > * {
    display: inline-block;
    margin: auto;
  }

  & > :last-child {
    margin: auto auto auto 10px;
  }
`

const Spacer = styled.span`
  display: block;
  margin-left: auto;
`

const Contents = styled.div`
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
`

const CollapsableRow = styled.div`
  display: flex;
  ${media.minSm` flex-direction: row;`}
`

const HiddenOnMobile = styled.span`
  display: none;
  ${media.minSm`display: block;`}
`

const Primary: React.FC<{}> = () => (
  <div className="bg-primary text-white font-bold flex">
    <ul
      className="flex flex-row flex-grow mx-auto p-2"
      style={{
        maxWidth: '1170px',
      }}
    >
      <li className="flex my-auto mr-auto">
        {' '}
        <a href="https://rpmed.com" target="_blank" rel="noopener noreferrer">
          <Logo />
        </a>
      </li>
      <li className="ml-auto my-auto flex">
        <a
          href="https://rpmed.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white flex"
        >
          <span className="hidden md:flex mr-2 my-auto text-sm font-light">
            Go to Riverpoint
          </span>
          <FontAwesomeIcon icon={faExternalLinkAlt} className="my-auto flex" />
        </a>
      </li>
    </ul>
  </div>
)

export default Primary
