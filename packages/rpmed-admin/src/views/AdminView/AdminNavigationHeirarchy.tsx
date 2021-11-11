import {
  faAddressBook,
  faAmbulance,
  faBatteryHalf,
  faBoxAlt,
  faBuilding,
  faCog,
  faDatabase,
  faFileCertificate,
  faFileInvoiceDollar,
  faGlobeAfrica,
  faHome,
  faSitemap,
} from '@fortawesome/pro-regular-svg-icons'
import { faUsers } from '@fortawesome/pro-solid-svg-icons'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Navigation } from 'rpmed-ui/lib/V1'

const AdminNavigationHeirarchyComponent: React.FC<RouteComponentProps<{}>> = ({
  history,
}) => {
  const goto = (path: string) => () => history.push(path)
  return (
    <Navigation.Heirarchy
      contents={[
        {
          options: [
            {
              icon: faHome,
              name: 'Home',
              onClick: goto('/admin/'),
            },
          ],
        },
        {
          name: 'Partners',
          options: [
            {
              icon: faBoxAlt,
              name: 'RGA Requests',
              onClick: goto('/admin/rga'),
            },
            {
              icon: faBuilding,
              name: 'Distributors',
              onClick: goto('/admin/distributors'),
            },
          ],
        },
        {
          name: 'Customers',
          options: [
            {
              icon: faFileCertificate,
              name: 'Product Registry',
              onClick: goto('/admin/registrations'),
            },
            {
              disabled: true,
              icon: faAmbulance,
              name: 'Service Requests',
              onClick: goto('/admin/service'),
            },
            {
              disabled: true,
              icon: faFileInvoiceDollar,
              name: 'Quotes',
              onClick: goto('/admin/quotes'),
            },
            {
              disabled: true,
              icon: faBatteryHalf,
              name: 'Battery Recycling',
              onClick: goto('/admin/batteries'),
            },

            {
              disabled: true,
              icon: faGlobeAfrica,
              name: 'Mission Applications',
              onClick: goto('/admin/missions'),
            },
          ],
        },
        {
          name: 'Resources',
          options: [
            {
              icon: faAddressBook,
              name: 'Customer Database',
              onClick: goto('/admin/customers'),
            },
            {
              icon: faDatabase,
              name: 'Product Database',
              onClick: goto('/admin/products'),
            },
          ],
        },
        {
          name: 'Customer Portal',
          options: [
            {
              icon: faSitemap,
              name: 'Sitemap CMS',
              onClick: goto('/admin/sitemap'),
            },
          ],
        },
        {
          name: 'Administrative',
          options: [
            {
              icon: faUsers,
              name: 'Manage Users',
              onClick: goto('/admin/controls/users'),
            },
            {
              icon: faCog,
              name: 'Control Panel',
              onClick: goto('/admin/controls'),
            },
          ],
        },
      ]}
    />
  )
}

export const AdminNavigationHeirarchy = withRouter(
  AdminNavigationHeirarchyComponent
)
