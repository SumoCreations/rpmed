import {
  faBarcodeAlt,
  faBoxCheck,
  faNotesMedical,
  faShippingTimed,
  faUserHardHat,
} from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Flex } from 'rebass'
import { RgaStatus } from 'rpmed-schema'
import { styled, remCalc } from 'rpmed-ui/lib/V1'

interface IDetailViewProps {
  status?: RgaStatus
}

const BUBBLE_SIZE = 36

const Relative = styled(Flex)`
  position: relative;
  flex-grow: 1;
  height: ${remCalc(BUBBLE_SIZE)};
`

const Progress = styled.progress`
  margin: auto 10px;
  height: 10px;
  display: flex;
  flex-grow: 1;
  width: 100%;

  &[value] {
    appearance: none;
  }

  &[value]::-webkit-progress-bar {
    border-radius: ${p => p.theme.borderRadius};
    background: ${p => p.theme.colorContentAreaBorder};
  }

  &[value]::-webkit-progress-value {
    border-radius: ${p => p.theme.borderRadius};
    background: ${p => p.theme.colorPrimary};
  }
`

const IconGroup = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
`

const IconBubble = styled.div<{ active: boolean }>`
  background: ${p =>
    p.active ? p.theme.colorPrimary : p.theme.colorContentAreaBorder};
  color: ${p => p.theme.colorBodyTextInverted};
  display: flex;
  border-radius: ${remCalc(BUBBLE_SIZE / 2)};
  height: ${remCalc(BUBBLE_SIZE)};
  width: ${remCalc(BUBBLE_SIZE)};
  margin: auto;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  & > svg {
    display: flex;
    margin: auto;
  }
`
const STATUS_LIST = [
  RgaStatus.Issued,
  RgaStatus.AwaitingArrival,
  RgaStatus.Assessing,
  RgaStatus.Repairing,
  RgaStatus.Shipping,
  RgaStatus.Closed, // Not an indicated status.
  RgaStatus.Canceled, // Not an indicated status.
]

export const RGAStatusWidget: React.FC<IDetailViewProps> = ({ status }) => {
  const index = STATUS_LIST.indexOf(status || RgaStatus.Issued)
  const progress = index / (STATUS_LIST.length - 3)

  return (
    <Relative>
      <IconGroup>
        <IconBubble active={index >= 0}>
          <FontAwesomeIcon icon={faBarcodeAlt} />
        </IconBubble>
        <IconBubble active={index >= 1}>
          <FontAwesomeIcon icon={faShippingTimed} />
        </IconBubble>
        <IconBubble active={index >= 2}>
          <FontAwesomeIcon icon={faNotesMedical} />
        </IconBubble>
        <IconBubble active={index >= 3}>
          <FontAwesomeIcon icon={faUserHardHat} />
        </IconBubble>
        <IconBubble active={index >= 4}>
          <FontAwesomeIcon icon={faBoxCheck} />
        </IconBubble>
      </IconGroup>
      <Progress max={1} value={progress} />
    </Relative>
  )
}
