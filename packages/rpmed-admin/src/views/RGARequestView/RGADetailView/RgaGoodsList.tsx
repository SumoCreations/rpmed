import {
  faBoxOpen,
  faEnvelopeOpen,
  faFileAlt,
  faPencil,
  faSyncAlt,
  faTrash,
} from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Flex } from 'rebass'
import { ProductType, RgaGood } from 'rpmed-schema'
import { Actions, Card, Divider, Heading, Tags } from 'rpmed-ui/lib/V1'

export const RGAGoodsList: React.FunctionComponent<{
  goods: RgaGood[]
  canEdit?: boolean
  onEdit: (good: RgaGood) => any
  onDelete: (good: RgaGood) => any
  onRequestServiceForm: (good: RgaGood) => any
  onRequestCustomerLetter: (good: RgaGood) => any
}> = ({
  canEdit,
  goods,
  onEdit: handleEdit,
  onDelete: handleDelete,
  onRequestServiceForm: handleServiceForm,
  onRequestCustomerLetter: handleCustomerLetter,
}) => {
    const handleDeleteClick = (g: RgaGood) => () => handleDelete(g)
    const handleEditClick = (g: RgaGood) => () => handleEdit(g)
    const handleServiceFormClick = (g: RgaGood) => () => handleServiceForm(g)
    const handleCustomerLetterClick = (g: RgaGood) => () =>
      handleCustomerLetter(g)
    return (
      <React.Fragment>
        {goods && goods.length > 0 ? (
          goods.map(g => (
            <React.Fragment key={g.id}>
              <Card.Flat>
                <Flex flexDirection="column">
                  <Flex flexDirection="row">
                    <Box width={1}>
                      <Heading.Section>
                        {g.modelNumber}{' '}
                        {g.lotted ? <strong>({g.serial})</strong> : null}
                      </Heading.Section>
                    </Box>
                    <Box width="auto">
                      <Actions.Group>
                        {canEdit ? (
                          <React.Fragment>
                            <Actions.Primary onClick={handleEditClick(g)}>
                              <FontAwesomeIcon icon={faPencil} />
                            </Actions.Primary>
                            <Box width={3} as="span" />
                            <Actions.Destructive onClick={handleDeleteClick(g)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </Actions.Destructive>
                          </React.Fragment>
                        ) : g.productType === ProductType.Headlight ? (
                          <React.Fragment>
                            <Actions.Primary onClick={handleServiceFormClick(g)}>
                              <FontAwesomeIcon
                                icon={g.serviceFormUrl ? faFileAlt : faSyncAlt}
                              />
                            </Actions.Primary>
                            <Box width={3} as="span" />
                            <Actions.Primary
                              onClick={handleCustomerLetterClick(g)}
                            >
                              <FontAwesomeIcon
                                icon={
                                  g.customerLetterUrl ? faEnvelopeOpen : faSyncAlt
                                }
                              />
                            </Actions.Primary>
                          </React.Fragment>
                        ) : null}
                      </Actions.Group>
                    </Box>
                  </Flex>
                  <Tags.List>
                    <Tags.Actionable>{g.faultCode}</Tags.Actionable>
                    {g.warrantied ? (
                      <Tags.Secondary>Warrantied</Tags.Secondary>
                    ) : (
                      <Tags.ErrorInverted>Not Warrantied</Tags.ErrorInverted>
                    )}
                    {g.customerId ? (
                      <Link to={`/admin/customers/${g.customerId}`}>
                        <Tags.Secondary>
                          Customer: {g.customerName}
                        </Tags.Secondary>
                      </Link>
                    ) : null}
                  </Tags.List>
                  <Divider.Light />
                  <Flex flexDirection="row">
                    <Flex flexDirection="column" width={1 / 2}>
                      <Heading.Label>Symptom</Heading.Label>
                      <p>
                        <Link to={`/admin/products/symptoms/${g.symptomId}`}>
                          {g.symptomDescription}
                        </Link>
                      </p>
                    </Flex>
                    <Flex flexDirection="column" width={1 / 2}>
                      <Heading.Label>Notes</Heading.Label>
                      <p>{g.notes || 'n/a'}</p>
                    </Flex>
                  </Flex>
                  <Flex flexDirection="row">
                    <Flex flexDirection="column" width={1 / 4}>
                      <Heading.Label>RMA</Heading.Label>
                      <p>{g.rma || 'n/a'}</p>
                    </Flex>
                    <Flex flexDirection="column" width={1 / 4}>
                      <Heading.Label>PO</Heading.Label>
                      <p>{g.po || 'n/a'}</p>
                    </Flex>
                    <Flex flexDirection="column" width={1 / 4}>
                      <Heading.Label>Customer</Heading.Label>
                      <p>{g.customerEmail || 'n/a'}</p>
                    </Flex>
                  </Flex>
                </Flex>
              </Card.Flat>
              <Divider.Light />
            </React.Fragment>
          ))
        ) : (
          <Card.Flat>
            <Flex flexDirection="column">
              <Box mx="auto" my={2}>
                <Heading.Section>
                  <FontAwesomeIcon icon={faBoxOpen} size="6x" />
                </Heading.Section>
              </Box>
              <Box mx="auto" marginTop={2}>
                <Heading.Section>No Goods Have Been Added Yet</Heading.Section>
              </Box>
            </Flex>
          </Card.Flat>
        )}
      </React.Fragment>
    )
  }
