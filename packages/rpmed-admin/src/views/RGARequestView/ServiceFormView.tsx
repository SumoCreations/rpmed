import { faTimes } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DateTime } from 'luxon'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Box, Flex } from 'rebass'
import { Rga, RgaGood, RgaStatus, RgaStatusUpdate } from '../../schema'
import {
  Actions,
  Heading,
  Indicators,
  Layout,
  styled,
  Toolbar,
} from 'rpmed-ui/lib/V1'
import { useRGA } from './graphql'
import serviceFormLogoUrl from './ServiceFormLogo.png'
import serviceFormMedLedLogoUrl from './ServiceFormMedLed.png'
import serviceFormRPQAUrl from './ServiceFormRPQA.png'
import serviceFormSignature from './ServiceFormSignature.png'

interface IRGARouterProps {
  rgaId: string
  status: RgaStatus
  goodId: string
}

const DontPrint = styled.div`
  @media print {
    display: none;
  }
`

const Page = styled(Flex)`
  flex-direction: column;
  position: relative;

  @media print {
    height: 100vh;
  }
`

const Letter = styled(Box)`
  border: 1px solid #000;
  height: 902px;
  width: 715px;
  margin: auto;
  padding: 2rem 1.75rem;
  position: relative;
  font-size: 0.825rem;
  flex: 1 1 auto;

  @media print {
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
`

const Logo = styled(Box)`
  width: 130px;
  height: auto;
  margin-bottom: auto;
  margin-right: auto;
`

const MedLedLogo = styled(Box)`
  width: 40px;
  height: auto;
  margin-bottom: auto;
  margin-left: auto;
`

const Title = styled.h1`
  margin: 0.25rem auto;
  text-align: center;
  font-family: 'Times', 'serif';
  font-size: 1.35rem;
  line-height: 1em;
`

const SecondaryTitle = styled(Title as any)`
  font-size: 0.75rem;
  font-weight: normal;
  margin-top: 0;
  font-style: italic;
`

const Table = styled(Flex)`
  border: 1px solid #ccc;
  flex-direction: column;
`

const Row = styled(Flex)`
  border-bottom: 1px solid #ccc;
  flex: 1;
  flex-grow: 1;

  &:last-child {
    border-bottom: 0;
  }
`

const Value = styled(Box)`
  padding: 0.25rem 0.5rem;
  font-size: 0.725rem;
  font-family: 'Times', 'serif';
`

const Cell = styled(Value as any)<any>`
  border-right: 1px solid #ccc;
  background: ${p => (p.selected ? p.theme.colorButtonPrimary : '#fff')};
  color: ${p =>
    p.selected ? p.theme.colorBodyTextInverted : p.theme.colorBodyText};
  font-weight: ${p => (p.selected ? 'bold' : 'normal')};

  &:last-child {
    border-right: 0;
  }
`

const HeadingValue = styled(Cell as any)`
  font-weight: bold;
`

const Label = styled(Value as any)`
  background: #ddd;
  border-right: 1px solid #ccc;
  font-weight: bold;
`
const Header = styled(Flex as any)`
  border-bottom: 1px solid #000;
`

const Footer = styled(Value as any)`
  position: absolute;
  bottom: 1rem;
  border-top: 1px solid #ddd;
  left: 1.75rem;
  right: 1.75rem;
`

const FooterValue = styled(Box as any)`
  text-align: left;
  &:last-child {
    text-align: right;
  }
`

const Center = styled.span`
  display: block;
  margin: auto;
`

export const faultCodes: { [key: string]: string } = {
  A: 'Avsert Fell Out (Sapphire)',
  B: 'Battery Contacts Bent or Broken',
  C: 'Potentiometer Knob is Loose or Broke Off',
  D: 'Debris in Beam/Lens Assembly',
  E: 'PCB Damage',
  F: 'USB Port Bent/Broken',
  G: 'Vertical Guide Broken',
  H: 'Break in 2c Wire Connection (Onyx/Sapphire)',
  I: 'Break in 3c Wire Connection (Onyx/Sapphire)',
  J: 'Break in 2c Wire Connection (Chrome)',
  K: 'Other, please specify',
  L: 'Accessory Only',
}

const DISPOSITIONS = [
  'Repair / Return',
  'Return As Is',
  'Replace With New',
  'Reimbursement / Refund',
]

const isOtherDisposition = (d: string) =>
  !DISPOSITIONS.includes(d) && d.length > 0

const hasFault = (code: string, good: RgaGood) =>
  (good.faultCode ?? '').indexOf(code) > -1

const ServiceLetter: React.FC<{ good: RgaGood; rga: Rga }> = ({
  good,
  rga,
}) => {
  const status = (rga.statusLog || [])
    .map(s => s as RgaStatusUpdate)
    .find(s =>
      [RgaStatus.Closed, RgaStatus.Delayed].includes(s.status as RgaStatus)
    )
  const date = status ? status.updatedOn : null
  const parsedDate = DateTime.fromISO(date || '')
  const displayDate = (parsedDate.isValid
    ? parsedDate
    : DateTime.local()
  ).toFormat('LLL, dd yyyy')
  return (
    <React.Fragment>
      <Logo
        src={serviceFormLogoUrl}
        alt="River Point Medical"
        as="img"
        id="serviceFormLogo"
      />
      <Title>MedLED Service Form</Title>
      <SecondaryTitle>
        This form is to be complete upon return of all MedLED units requiring
        servicing
      </SecondaryTitle>
      <Table my={3}>
        <Row>
          <Label width={1 / 4}>Service Number:</Label>
          <Value width={3 / 4}>{good.rma || ''}</Value>
        </Row>
        <Row>
          <Label width={1 / 4}>RGA Number:</Label>
          <Value width={3 / 4}>{good.rgaId}</Value>
        </Row>
        <Row>
          <Label width={1 / 4}>Model:</Label>
          <Value width={3 / 4}>{good.productName}</Value>
        </Row>
        <Row>
          <Label width={1 / 4}>Model Number:</Label>
          <Value width={3 / 4}>{good.modelNumber}</Value>
        </Row>
        <Row>
          <Label width={1 / 4}>Serial Number:</Label>
          <Value>{good.lotted ? good.serial : 'n/a'}</Value>
        </Row>
        {good.newSerial ? (
          <Row>
            <Label width={1 / 4}>New Serial Number:</Label>
            <Value>{good.newSerial}</Value>
          </Row>
        ) : null}
        <Row>
          <Label width={1 / 4}>Warranty Status:</Label>
          <Cell
            width={1 / 4}
            selected={(good.ssd !== true && good?.warrantied) as boolean}
          >
            In Warranty
          </Cell>
          <Cell width={1 / 4} selected={good.ssd !== true && !good?.warrantied}>
            Out of Warranty
          </Cell>
          <Cell width={1 / 4} selected={good.ssd ?? false}>
            SSD (if applicable)
          </Cell>
        </Row>
        <Row>
          <Label width={1 / 4}>Date of Purchase:</Label>
          <Value>{good.datePurchased ?? 'n/a'}</Value>
        </Row>
      </Table>
      <Table my={3}>
        <Row>
          <Label width={1}>
            <Flex>
              <Center>Service Investigation</Center>
            </Flex>
          </Label>
        </Row>
        <Row>
          <HeadingValue width={7 / 18}>Finding</HeadingValue>
          <HeadingValue width={2 / 18}>Code</HeadingValue>
          <HeadingValue width={9 / 18}>Notes if Applicable</HeadingValue>
        </Row>
        {Object.keys(faultCodes)
          .filter(code => hasFault(code, good))
          .map(code => (
            <Row key={code}>
              <Cell width={7 / 18}>{(faultCodes[code] || '') as string}</Cell>
              <Cell width={2 / 18}>{code}</Cell>
              <Cell width={9 / 18}>{good.notes}</Cell>
            </Row>
          ))}
      </Table>
      <Table my={3}>
        <Row>
          <Label width={1}>
            <Flex>
              <Center>Disposition</Center>
            </Flex>
          </Label>
        </Row>
        <Row>
          <Flex flexDirection="column" width={1}>
            <Flex>
              <Cell
                width={1 / 3}
                selected={good.disposition === 'Repair / Return'}
              >
                Repair / Return
              </Cell>
              <Cell
                width={1 / 3}
                selected={good.disposition === 'Replace With New'}
              >
                Replace With New
              </Cell>
              <Cell
                width={1 / 3}
                selected={good.disposition === 'Reimbursement / Refund'}
              >
                Reimbursement / Refund
              </Cell>
            </Flex>
            <Flex>
              <Cell
                width={1 / 3}
                selected={good.disposition === 'Return As Is'}
              >
                Return As Is
              </Cell>
              <Cell
                width={2 / 3}
                selected={isOtherDisposition(good.disposition ?? '')}
              >
                Other:{' '}
                {isOtherDisposition(good.disposition ?? '')
                  ? good.disposition
                  : ''}
              </Cell>
            </Flex>
          </Flex>
        </Row>
        <Row>
          <Cell width={1 / 4}>Additional Comments:</Cell>
          <Cell width={3 / 4}>{good.additionalComments}</Cell>
        </Row>
        <Row>
          <Cell width={1 / 4}>
            <strong>Completed By (Sign/Date):</strong>
          </Cell>
          <Cell width={3 / 4}>
            <img
              src={serviceFormSignature}
              style={{ height: 40, width: 'auto', display: 'block' }}
              alt=""
              id="signature"
            />
            <strong>{displayDate}</strong>
          </Cell>
        </Row>
      </Table>
      <Table my={3}>
        <Row>
          <Label width={1}>
            <Flex>
              <Center>Transfer to Riverpoint RA/QA</Center>
            </Flex>
          </Label>
        </Row>
        <Row>
          <Label width={1 / 4}>RA/QA Receipt Sign/Date:</Label>
          <Value width={3 / 4}>&nbsp;</Value>
        </Row>
        <Row>
          <Label width={1 / 4}>
            Does service event meet complaint criteria per SOP820.200
          </Label>
          <Value width={1 / 4}>
            <Flex>
              <Value>Yes</Value>
              <Value>No</Value>
            </Flex>
          </Value>
          <Label width={1 / 4}>If yes, Complaint Number:</Label>
          <Value width={1 / 4}>&nbsp;</Value>
        </Row>
      </Table>
      <Footer>
        <Flex>
          <FooterValue width={1}>820.198-F5_E_DRF-055-2017</FooterValue>
          <FooterValue width={1}>Page 1 of 1</FooterValue>
        </Flex>
      </Footer>
    </React.Fragment>
  )
}

const CustomerLetter: React.FC<{ good: RgaGood; rga: Rga }> = ({
  good,
  rga,
}) => {
  const status = (rga.statusLog || [])
    .map(s => s as RgaStatusUpdate)
    .filter(s => s.status === RgaStatus.Closed)[0]
  const date = status ? status.updatedOn : null
  const displayDate = DateTime.fromISO(date || '').toFormat('LLL, dd yyyy')
  return (
    <React.Fragment>
      <Header flex={1} paddingBottom={2} marginBottom={3}>
        <Logo
          src={serviceFormLogoUrl}
          alt="River Point Medical"
          as="img"
          id="customerLetterLogo"
        />
        <MedLedLogo src={serviceFormMedLedLogoUrl} alt="MedLed" as="img" />
      </Header>
      <p>
        <strong>TO.</strong> {good.customerName}
        <br />
        <strong>FROM.</strong> MedLED
        <br />
        <strong>DATE.</strong> {displayDate}
        <br />
        <strong>SUBJECT.</strong> MedLED Surgical Headlight Repairs
        <br />
      </p>

      <p>Dear {good.customerName || 'Customer'},</p>

      <p>
        MedLED® Lighting has performed an investigation into your headlight
        return:
      </p>
      <Box as="p" marginLeft="3rem">
        <strong>Customer Reference Number:</strong> {good.rma || 'n/a'}
        <br />
        <strong>MedLED RGA Number:</strong> {good.rgaId.substring(0, 13)}
        <br />
        <strong>Original Serial / Lot Number:</strong> {good.serial}
        <br />
        <strong> New Serial/Lot Number (if applicable):</strong>{' '}
        {good.newSerial ?? 'N/A'}
        <br />
      </Box>
      <Box as="p" marginLeft="6rem" marginBottom="2rem">
        <strong>Description:</strong>
        <br />
        <strong>Stated Issue(s).</strong> {good.symptomDescription}
        <br />
        <strong>Assessment.</strong> {good.symptomSynopsis}
        <br />
        <strong>Pictures.</strong>
        <br />
        <strong>Repairs Made.</strong> {good.symptomSolution}
        <br />
      </Box>

      <p>
        Please feel free to contact the MedLED® Repair Department at (503)
        517-8001 with any questions or concerns or email RGA@RPMED.COM.
      </p>

      <p>&nbsp;</p>
      <p>Sincerely,</p>
      <Flex>
        <Flex marginRight="auto">
          <Box
            as="img"
            src={serviceFormMedLedLogoUrl}
            height="auto"
            width="80px"
          />
          <Box as="p" my="auto" marginLeft={3}>
            <strong>MEDLED® LIGHTING</strong>
            <br />A Division of Riverpoint Medical®
          </Box>
        </Flex>
        <Box as="img" src={serviceFormRPQAUrl} height="auto" width="80px" />
      </Flex>
      <Footer>
        <Flex>
          <FooterValue width={1}>Page 1 of 1</FooterValue>
        </Flex>
      </Footer>
    </React.Fragment>
  )
}

export const ServiceFormView: React.FC<RouteComponentProps<
  IRGARouterProps
>> = ({ history, match }) => {
  const { loading, rga } = useRGA(match.params.rgaId)

  const dismiss = () => {
    history.goBack()
  }

  const good = rga
    ? rga.goods
        .map(g => g as RgaGood)
        .filter(g => g.id === match.params.goodId)[0]
    : null

  const rendering = loading || !rga || !good

  return (
    <Layout.FullScreen>
      <Box my={[1, 1, 1, 4]} mx="auto" width={[1, 1, 1, 3 / 4]}>
        <DontPrint>
          <Toolbar.View>
            <Toolbar.Item spreadLeft={false}>
              <Actions.Group>
                <Actions.Toolbar onClick={dismiss}>
                  <FontAwesomeIcon icon={faTimes} />
                </Actions.Toolbar>
              </Actions.Group>
            </Toolbar.Item>
            <Box width={1} my="auto" mx={3}>
              <Flex flexDirection="column">
                <Heading.ToolBarOne>Service Form</Heading.ToolBarOne>
                <Heading.ToolBarTwo>
                  RGA {match.params.rgaId}
                </Heading.ToolBarTwo>
              </Flex>
            </Box>
          </Toolbar.View>
        </DontPrint>

        <Flex flexDirection="column">
          <Page>
            <Letter mx={'auto'}>
              {rendering ? (
                <Box m="auto">
                  <Indicators.Spinner size="3x" />
                </Box>
              ) : (
                <ServiceLetter good={good as RgaGood} rga={rga as Rga} />
              )}
            </Letter>
          </Page>
          <DontPrint>
            <Box my={3} />
          </DontPrint>
          <Page>
            <Letter mx={'auto'}>
              {rendering ? (
                <Box m="auto">
                  <Indicators.Spinner size="3x" />
                </Box>
              ) : (
                <CustomerLetter good={good as RgaGood} rga={rga as Rga} />
              )}
            </Letter>
          </Page>
        </Flex>
      </Box>
    </Layout.FullScreen>
  )
}
