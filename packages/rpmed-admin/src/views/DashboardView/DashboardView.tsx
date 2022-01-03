import {
  faAddressBook,
  faBarcodeRead,
  faBoxAlt,
  faBoxFragile,
  faBuilding,
  faDatabase,
  faFileCertificate,
  faUsers,
  faSitemap,
} from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  Actions,
  Content,
  Grid,
  GridNav,
  Heading,
  Layout,
  Toolbar,
} from 'rpmed-ui/lib/V1'

const { useState } = React

const View: React.FC = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const onClickOption = (route: string) => () => navigate(`/admin/${route}`)
  const onSearchChange: React.ChangeEventHandler = event =>
    setSearchText((event.target as HTMLInputElement).value)
  return (
    <Layout.Layout>
      <Helmet title="Dashboard - RPMed Service Admin" />
      <Content>
        <Toolbar.View>
          <Toolbar.Item grow={true}>
            <Toolbar.Search
              placeholder={'Search Shortcuts'}
              value={searchText}
              onChange={onSearchChange}
            />
          </Toolbar.Item>
          <Toolbar.Item spreadLeft={true}>
            <Actions.Group />
          </Toolbar.Item>
        </Toolbar.View>

        <Grid.Row>
          <Grid.Col span={16}>
            <Heading.Section>Partner / Customer Interactions</Heading.Section>
            <GridNav.Container>
              <GridNav.Item>
                <GridNav.OverlayButton onClick={onClickOption('rga')} />
                <GridNav.IconWrap>
                  <FontAwesomeIcon icon={faBoxAlt} size="3x" />
                </GridNav.IconWrap>
                <GridNav.ItemContent>
                  <GridNav.ItemTitle>
                    <Link to="">RGA Requests</Link>
                  </GridNav.ItemTitle>
                  <GridNav.ItemDescription>
                    Create and manage any incomming RGA requests.
                  </GridNav.ItemDescription>
                </GridNav.ItemContent>
              </GridNav.Item>

              <GridNav.Item>
                <GridNav.OverlayButton onClick={onClickOption('rga')} />
                <GridNav.IconWrap>
                  <FontAwesomeIcon icon={faBuilding} size="3x" />
                </GridNav.IconWrap>
                <GridNav.ItemContent>
                  <GridNav.ItemTitle>
                    <Link to="">Distributors</Link>
                  </GridNav.ItemTitle>
                  <GridNav.ItemDescription>
                    View all registered partners / distributors.
                  </GridNav.ItemDescription>
                </GridNav.ItemContent>
              </GridNav.Item>

              <GridNav.Item>
                <GridNav.OverlayButton
                  onClick={onClickOption('customers/table')}
                />
                <GridNav.IconWrap>
                  <FontAwesomeIcon icon={faAddressBook} size="3x" />
                </GridNav.IconWrap>
                <GridNav.ItemContent>
                  <GridNav.ItemTitle>
                    <Link to="">Customers</Link>
                  </GridNav.ItemTitle>
                  <GridNav.ItemDescription>
                    View all registered customers.
                  </GridNav.ItemDescription>
                </GridNav.ItemContent>
              </GridNav.Item>

              <GridNav.Item>
                <GridNav.OverlayButton
                  onClick={onClickOption('registrations/table')}
                />
                <GridNav.IconWrap>
                  <FontAwesomeIcon icon={faFileCertificate} size="3x" />
                </GridNav.IconWrap>
                <GridNav.ItemContent>
                  <GridNav.ItemTitle>
                    <Link to="">Registered Products</Link>
                  </GridNav.ItemTitle>
                  <GridNav.ItemDescription>
                    View all products registered on behalf of our customers.
                  </GridNav.ItemDescription>
                </GridNav.ItemContent>
              </GridNav.Item>
            </GridNav.Container>

            <Heading.Section>Product Database</Heading.Section>
            <GridNav.Container>
              <GridNav.Item>
                <GridNav.OverlayButton
                  onClick={onClickOption('products/table')}
                />
                <GridNav.IconWrap>
                  <FontAwesomeIcon icon={faDatabase} size="3x" />
                </GridNav.IconWrap>
                <GridNav.ItemContent>
                  <GridNav.ItemTitle>
                    <Link to="">Product Database</Link>
                  </GridNav.ItemTitle>
                  <GridNav.ItemDescription>
                    Add, remove, or modify any product families.
                  </GridNav.ItemDescription>
                </GridNav.ItemContent>
              </GridNav.Item>

              <GridNav.Item>
                <GridNav.OverlayButton
                  onClick={onClickOption('products/modelNumbers/table')}
                />
                <GridNav.IconWrap>
                  <FontAwesomeIcon icon={faBarcodeRead} size="3x" />
                </GridNav.IconWrap>
                <GridNav.ItemContent>
                  <GridNav.ItemTitle>
                    <Link to="">Model Configurations</Link>
                  </GridNav.ItemTitle>
                  <GridNav.ItemDescription>
                    Add, remove, or modify any model configurations for a given
                    product family.
                  </GridNav.ItemDescription>
                </GridNav.ItemContent>
              </GridNav.Item>

              <GridNav.Item>
                <GridNav.OverlayButton
                  onClick={onClickOption('products/symptoms/table')}
                />
                <GridNav.IconWrap>
                  <FontAwesomeIcon icon={faBoxFragile} size="3x" />
                </GridNav.IconWrap>
                <GridNav.ItemContent>
                  <GridNav.ItemTitle>
                    <Link to="">Symptoms</Link>
                  </GridNav.ItemTitle>
                  <GridNav.ItemDescription>
                    Add, remove, or modify any troubleshooting symptoms.
                  </GridNav.ItemDescription>
                </GridNav.ItemContent>
              </GridNav.Item>
            </GridNav.Container>

            <Heading.Section>Customer Portal</Heading.Section>
            <GridNav.Container>
              <GridNav.Item>
                <GridNav.OverlayButton onClick={onClickOption('sitemap')} />
                <GridNav.IconWrap>
                  <FontAwesomeIcon icon={faSitemap} size="3x" />
                </GridNav.IconWrap>
                <GridNav.ItemContent>
                  <GridNav.ItemTitle>
                    <Link to="">Sitemap CMS</Link>
                  </GridNav.ItemTitle>
                  <GridNav.ItemDescription>
                    Create and manage the sitemap for the customer portal.
                  </GridNav.ItemDescription>
                </GridNav.ItemContent>
              </GridNav.Item>
            </GridNav.Container>

            <Heading.Section>Administrative</Heading.Section>
            <GridNav.Container>
              <GridNav.Item>
                <GridNav.OverlayButton
                  onClick={onClickOption('controls/users')}
                />
                <GridNav.IconWrap>
                  <FontAwesomeIcon icon={faUsers} size="3x" />
                </GridNav.IconWrap>
                <GridNav.ItemContent>
                  <GridNav.ItemTitle>
                    <Link to="">Manage Users</Link>
                  </GridNav.ItemTitle>
                  <GridNav.ItemDescription>
                    Add, remove, or modify any user who should have access to
                    the service admin.
                  </GridNav.ItemDescription>
                </GridNav.ItemContent>
              </GridNav.Item>
            </GridNav.Container>
          </Grid.Col>
        </Grid.Row>
      </Content>
    </Layout.Layout>
  )
}

export const DashboardView = View
