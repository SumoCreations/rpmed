import {
  faEnvelope,
  faFileInvoice,
  faFileInvoiceDollar,
  faUserAlt,
  faPhone,
  faAddressCard,
} from '@fortawesome/pro-regular-svg-icons'
import React from 'react'
import { Box, Flex } from 'rebass'
import { Divider, Form, Heading } from 'rpmed-ui/lib/V1'
import {
  ModelNumberSelectField,
  ModelNumberSelectFn,
  ProductSelectField,
  ProductSelectFn,
  ProductTypeSelectFn,
} from '../../../ProductRegistryView'
import {
  ProductSymptomSelectField,
  ProductSymptomSelectFn,
} from '../../../ProductSymptomsView'
import { CustomerSpecialtySelect } from '../../RgaCustomerSpecialitySelect'
import { ShippingSpeedSelect } from '../../RgaShippingSpeedSelect'
import { FormField, IInteractiveSection } from '../RGAGoodForm'
import serviceFormLogoUrl from '../../ServiceFormLogo.png'
import clsx from 'clsx'

interface IAdvancedSectionProps extends IInteractiveSection {
  onSelectProductType: ProductTypeSelectFn
  onSelectProduct: ProductSelectFn
  onSelectModel: ModelNumberSelectFn
  onSelectSymptom: ProductSymptomSelectFn
  onSelectShipping: (s: string) => void
  onSelectSpecialty: (s: string) => void
  onSelectDisposition: (s?: string) => any
  onToggleWarranty: (b?: boolean) => any
  onSelectSSD: (b?: boolean) => any
}

const classes = {
  page: 'flex flex-col border border-gray-300 p-4',
  logo: 'h-auto mb-auto mr-auto block',
  title: 'text-center w-full text-xl font-bold font-serif',
  secondaryTitle: 'text-center w-full text-sm italic font-serif',
  table: 'my-3 border border-gray-300',
  row: 'flex flex-row w-full border-b border-gray-300 last:border-0',
  label: 'bg-gray-100 text-left text-xs font-serif font-semibold',
  value: 'text-sm font-serif',
  cell: 'flex font-serif px-2 py-1 border-l border-gray-300 first:border-l-0',
  selected: 'bg-primary text-white',
  button: 'flex w-full m-0',
}

const DISPOSITIONS = [
  'Repair / Return',
  'Return As Is',
  'Replace With New',
  'Reimbursement / Refund',
]

const isOtherDisposition = (d: string) => !DISPOSITIONS.includes(d)

/**
 * Presents all possible fields as editable values for administrator
 * modification / correction.
 * @param param0 Props for this component.
 */
export const AdvancedSection: React.FC<IAdvancedSectionProps> = ({
  onDismiss: handleDismiss,
  onSelectModel: handleSelectModel,
  onSelectProduct: handleSelectProduct,
  onSelectSymptom: handleSymptom,
  onToggleWarranty: handleWarranty,
  onSelectSpecialty: handleSpecialty,
  onSelectShipping: handleShippingSpeed,
  onSelectDisposition: handleDisposition,
  onSelectSSD: handleSSD,
  values,
}) => {
  const swallow = (callback: () => any): React.MouseEventHandler => e => {
    e.preventDefault()
    callback()
  }
  const updateWarranty = (newVal?: boolean) =>
    swallow(() => handleWarranty(newVal))
  const setDisposition = (newVal?: string) =>
    swallow(() => handleDisposition(newVal ?? ''))
  const setSSD = (newVal?: boolean) => swallow(() => handleSSD(newVal ?? false))
  return (
    <Flex flexDirection="column">
      <article className={classes.page}>
        <img
          src={serviceFormLogoUrl}
          alt="River Point Medical"
          id="serviceFormLogo"
          className={classes.logo}
          style={{ width: 130 }}
        />
        <h1 className={classes.title}>MedLED Service Form</h1>
        <h2 className={classes.secondaryTitle}>
          This form is to be complete upon return of all MedLED units requiring
          servicing
        </h2>
        <table className={classes.table}>
          <tr className={classes.row}>
            <td className={clsx(classes.label, classes.cell, 'w-1/4')}>
              <span className="my-auto">Service Number:</span>
            </td>
            <td className={clsx(classes.value, classes.cell, 'w-3/4')}>
              <span className="my-auto">{values.serviceId}</span>
            </td>
          </tr>
          <tr className={classes.row}>
            <td className={clsx(classes.label, classes.cell, 'w-1/4')}>
              <span className="my-auto">RGA Number:</span>
            </td>
            <td className={clsx(classes.value, classes.cell, 'w-3/4')}>
              <span className="my-auto">{values.rgaId}</span>
            </td>
          </tr>
          <tr className={classes.row}>
            <td className={clsx(classes.label, classes.cell, 'w-1/4')}>
              <span className="my-auto">Model:</span>
            </td>
            <td className={clsx(classes.value, classes.cell, 'w-3/4')}>
              <ProductSelectField
                onDismiss={handleDismiss('productId')}
                onSelect={handleSelectProduct}
                value={(values.productName as string) || ''}
                placeholder="Select a Product Family"
                name="productId"
              />
            </td>
          </tr>
          <tr className={classes.row}>
            <td className={clsx(classes.label, classes.cell, 'w-1/4')}>
              <span className="my-auto">Model Number:</span>
            </td>
            <td className={clsx(classes.value, classes.cell, 'w-3/4')}>
              <ModelNumberSelectField
                onDismiss={handleDismiss('modelNumber')}
                onSelect={handleSelectModel}
                value={values.modelNumber || ''}
                placeholder="Select a Model"
                productId={values.productId}
                name="modelNumber"
              />
            </td>
          </tr>
          <tr className={classes.row}>
            <td className={clsx(classes.label, classes.cell, 'w-1/4')}>
              Serial Number:
            </td>
            <td className={clsx(classes.value, classes.cell, 'w-3/4')}>
              {values.lotted ? (
                <FormField
                  name="serial"
                  placeholder="n/a"
                  type="text"
                  required={true}
                />
              ) : (
                'n/a'
              )}
            </td>
          </tr>
          <tr className={classes.row}>
            <td className={clsx(classes.label, classes.cell, 'w-1/4')}>
              Warranty Status:
            </td>
            <td
              className={clsx(
                classes.value,
                classes.cell,
                'w-1/4',
                !values.ssd && values.warrantied && classes.selected
              )}
            >
              <button className={classes.button} onClick={updateWarranty(true)}>
                In Warranty
              </button>
            </td>
            <td
              className={clsx(
                classes.value,
                classes.cell,
                'w-1/4',
                !values.ssd && !values.warrantied && classes.selected
              )}
            >
              <button
                className={classes.button}
                onClick={updateWarranty(false)}
              >
                Out of Warranty
              </button>
            </td>
            <td
              className={clsx(
                classes.value,
                classes.cell,
                values.ssd && classes.selected,
                'w-1/4'
              )}
            >
              <button className={classes.button} onClick={setSSD(true)}>
                SSD (if applicable)
              </button>
            </td>
          </tr>
          <tr className={classes.row}>
            <td className={clsx(classes.label, classes.cell, 'w-1/4')}>
              <span className="my-auto">Date of Purchase:</span>
            </td>
            <td className={clsx(classes.value, classes.cell, 'w-3/4')}>
              <FormField
                name="datePurchased"
                placeholder="n/a"
                type="text"
                required={false}
              />
            </td>
          </tr>
        </table>
        <table className={classes.table}>
          <tr className={classes.row}>
            <td className={clsx(classes.label, classes.cell, 'w-full')}>
              <span className="flex m-auto">Service Investigation</span>
            </td>
          </tr>
          <tr className={classes.row}>
            <td className={clsx(classes.label, classes.cell, 'w-5/12')}>
              Finding
            </td>
            <td className={clsx(classes.label, classes.cell, 'w-16')}>Code</td>
            <td className={clsx(classes.label, classes.cell, 'flex-grow')}>
              Notes if Applicable
            </td>
          </tr>
          <tr className={classes.row}>
            <td className={clsx(classes.cell, 'w-5/12')}>
              <ProductSymptomSelectField
                onDismiss={handleDismiss('modelNumber')}
                onSelect={handleSymptom}
                value={values.symptomDescription || ''}
                placeholder="Select a Symptom"
                name="symptomId"
                modelNumber={values.modelNumber}
              />
            </td>
            <td className={clsx(classes.cell, 'w-16')}>
              <FormField
                name="faultCode"
                placeholder=""
                type="text"
                required={false}
              />
            </td>
            <td className={clsx(classes.cell, 'flex-grow')}>
              <FormField
                name="notes"
                placeholder=""
                type="text"
                required={false}
              />
            </td>
          </tr>
        </table>
        <table className={classes.table}>
          <tr className={classes.row}>
            <td className={clsx(classes.label, classes.cell, 'w-full')}>
              <span className="m-auto">Disposition</span>
            </td>
          </tr>
          <tr className={classes.row}>
            <td
              className={clsx(
                classes.cell,
                classes.value,
                values.disposition === 'Repair / Return' && classes.selected,
                'w-1/3'
              )}
            >
              <button
                className={classes.button}
                onClick={setDisposition('Repair / Return')}
              >
                Repair / Return
              </button>
            </td>
            <td
              className={clsx(
                classes.cell,
                classes.value,
                values.disposition === 'Replace With New' && classes.selected,
                'w-1/3'
              )}
            >
              <button
                className={classes.button}
                onClick={setDisposition('Replace With New')}
              >
                Replace With New
              </button>
            </td>
            <td
              className={clsx(
                classes.cell,
                classes.value,
                values.disposition === 'Reimbursement / Refund' &&
                  classes.selected,
                'w-1/3'
              )}
            >
              <button
                className={classes.button}
                onClick={setDisposition('Reimbursement / Refund')}
              >
                Reimbursement / Refund
              </button>
            </td>
          </tr>
          {values.disposition === 'Replace With New' ? (
            <tr className={classes.row}>
              <td className={clsx(classes.cell, classes.value, 'w-1/3')}></td>
              <td
                className={clsx(
                  classes.cell,
                  classes.value,
                  'flex-grow',
                  values.disposition === 'Return As Is' && classes.selected
                )}
              >
                <div className={clsx('flex -my-2 w-full')}>
                  <label className="my-auto mr-2" htmlFor="disposition">
                    New Serial:
                  </label>
                  <FormField
                    name="newSerial"
                    placeholder=""
                    type="text"
                    required={false}
                  />
                </div>
              </td>
            </tr>
          ) : null}
          <tr className={classes.row}>
            <td
              className={clsx(
                classes.cell,
                classes.value,
                values.disposition === 'Return As Is' && classes.selected,
                'w-1/3'
              )}
            >
              <button
                className={classes.button}
                onClick={setDisposition('Return As Is')}
              >
                <span className="my-auto">Return As Is</span>
              </button>
            </td>
            <td className={clsx(classes.cell, classes.value, 'flex-grow')}>
              <div
                className={clsx(
                  'flex -my-2 w-full',
                  isOtherDisposition(values.disposition)
                    ? 'opacity-100'
                    : 'opacity-25'
                )}
              >
                <label className="my-auto mr-2" htmlFor="disposition">
                  Other:
                </label>
                <FormField
                  name="disposition"
                  placeholder=""
                  type="text"
                  required={false}
                  onFocus={() => handleDisposition('')}
                />
              </div>
            </td>
          </tr>
          <tr className={classes.row}>
            <td className={clsx(classes.cell, classes.label, 'w-1/4')}>
              <span className="my-auto">Additional Comments:</span>
            </td>
            <td className={clsx(classes.cell, classes.value, 'w-3/4')}>
              <FormField
                name="additionalComments"
                placeholder="(optional)"
                type="text"
                required={false}
              />
            </td>
          </tr>
          <tr className={classes.row}>
            <td className={clsx(classes.cell, classes.label, 'w-1/4')}>
              <strong>Completed By (Sign/Date):</strong>
            </td>
            <td className={clsx(classes.cell, classes.value, 'w-3/4')}>
              &nbsp;
            </td>
          </tr>
        </table>
        <table className={clsx(classes.table, 'opacity-50')}>
          <tr className={classes.row}>
            <td className={clsx(classes.label, classes.cell, 'w-full')}>
              <span className="m-auto">Transfer to Riverpoint RA/QA</span>
            </td>
          </tr>
          <tr className={classes.row}>
            <td className={clsx(classes.cell, classes.label, 'w-2/5')}>
              RA/QA Receipt Sign/Date:
            </td>
            <td className={clsx(classes.value, classes.cell, 'w-3/5')}>
              &nbsp;
            </td>
          </tr>
          <tr className={classes.row}>
            <td className={clsx(classes.cell, classes.label, 'w-2/5')}>
              Does service event meet complaint criteria per SOP820.200
            </td>
            <td className={clsx(classes.cell, classes.value, 'w-1/8')}>
              <button>Yes</button>
            </td>
            <td className={clsx(classes.cell, classes.value, 'w-1/8')}>
              <button>No</button>
            </td>
            <td className={clsx(classes.cell, classes.label, 'w-1/4')}>
              If yes, Complaint Number:
            </td>
            <td className={clsx(classes.cell, classes.value, 'flex-grow')}></td>
          </tr>
        </table>
      </article>
      <Divider.Light />
      <Heading.Label>Customer Details</Heading.Label>
      <Form.Small>Automatically registers product for customer.</Form.Small>
      <Flex flexDirection={['column', 'column', 'row']}>
        <Box width={1}>
          <FormField
            name="rma"
            label="RMA (Customer / Optional)"
            placeholder=""
            type="text"
            required={false}
            icon={faFileInvoice}
          />
        </Box>
        <Box width={1} marginLeft={[0, 0, 2]}>
          <FormField
            name="po"
            label="PO (Customer)"
            placeholder=""
            type="text"
            required={false}
            icon={faFileInvoiceDollar}
          />
        </Box>
      </Flex>
      <Flex flexDirection={['column', 'column', 'row']}>
        <Box width={1}>
          <FormField
            name="customerName"
            label="Customer Name"
            placeholder=""
            type="text"
            required={false}
            icon={faUserAlt}
          />
        </Box>
        <Box width={1} marginLeft={[0, 0, 2]}>
          <FormField
            name="customerEmail"
            label="Email"
            placeholder=""
            type="text"
            required={false}
            icon={faEnvelope}
          />
        </Box>
        <Box width={1} marginLeft={[0, 0, 2]}>
          <FormField
            name="customerPhone"
            label="Phone"
            placeholder=""
            type="text"
            required={false}
            icon={faPhone}
          />
        </Box>
      </Flex>
      <Flex flexDirection={['column', 'column', 'row']}>
        <Box width={1}>
          <CustomerSpecialtySelect
            value={values.customerSpecialty as string}
            onSelect={handleSpecialty}
          />
        </Box>
      </Flex>
      <Divider.Light />
      <Divider.Light />
      <Heading.Label>Customer Shipping Details</Heading.Label>
      <Form.Small>
        Used for shipping and also applies to customer registration.
      </Form.Small>
      <Flex flexDirection={['column', 'column', 'row']}>
        <Box width={1}>
          <ShippingSpeedSelect
            value={values.shippingSpeed as string}
            onSelect={handleShippingSpeed}
          />
        </Box>
      </Flex>
      <Flex>
        <Flex width={[1]}>
          <FormField
            name="customerStreet"
            label="Street"
            placeholder=""
            type="text"
            required={false}
            icon={faAddressCard}
          />
        </Flex>
      </Flex>
      <Flex>
        <Flex width={[1]}>
          <FormField
            name="customerStreet2"
            label="Street2"
            placeholder=""
            type="text"
            required={false}
          />
        </Flex>
      </Flex>
      <Flex>
        <Flex width={[1, 1 / 3]} marginRight={[0, 2]}>
          <FormField
            name="customerCity"
            label="City"
            placeholder=""
            type="text"
            required={false}
          />
        </Flex>
        <Flex width={[1, 4 / 9]} marginRight={[0, 2]}>
          <FormField
            name="customerState"
            label="State"
            placeholder=""
            type="text"
            required={false}
          />
        </Flex>
        <Flex width={[1, 2 / 9]}>
          <FormField
            name="customerZip"
            label="Zip"
            placeholder=""
            type="text"
            required={false}
          />
        </Flex>
      </Flex>
      <Flex>
        <Flex width={[1]}>
          <FormField
            name="customerCountry"
            label="Country"
            placeholder=""
            type="text"
            required={false}
          />
        </Flex>
      </Flex>
      <Divider.Light />
      <Heading.Label>Rep Details</Heading.Label>
      <Form.Small>Automatically registers product for customer.</Form.Small>
      <Flex flexDirection={['column', 'column', 'row']}>
        <Box width={1}>
          <FormField
            name="repName"
            label="Rep Name"
            placeholder=""
            type="text"
            required={false}
            icon={faUserAlt}
          />
        </Box>
        <Box width={1} marginLeft={[0, 0, 2]}>
          <FormField
            name="repEmail"
            label="Rep Email"
            placeholder=""
            type="text"
            required={false}
            icon={faEnvelope}
          />
        </Box>
      </Flex>
      <Flex flexDirection={['column', 'column', 'row']}>
        <Box width={1}>
          <FormField
            name="distributorName"
            label="Distributor Name"
            placeholder=""
            type="text"
            required={false}
            icon={faUserAlt}
          />
        </Box>
        <Box width={1} marginLeft={[0, 0, 2]}>
          <FormField
            name="distributorEmail"
            label="Distributor Email"
            placeholder=""
            type="text"
            required={false}
            icon={faEnvelope}
          />
        </Box>
      </Flex>
    </Flex>
  )
}
