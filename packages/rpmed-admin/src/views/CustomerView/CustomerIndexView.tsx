import { faBuilding, faTable } from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { SecondaryNav } from 'rpmed-ui/lib/V1'
import { CustomerCreateView } from './CustomerCreateView'
import { CustomerDetailView } from './CustomerDetailView'
import { CustomerListView } from './CustomerListView'

const checkPath = (path: string, test: string): boolean =>
  path.indexOf(test) > 0

const View: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <SecondaryNav.View
      icon={faBuilding}
      title="Customers"
      data={[
        {
          icon: faTable,
          label: 'Customers',
          onClick: () => {
            navigate('/admin/customers/')
          },
          selected: checkPath(location.pathname, 'customers/table'),
        },
      ]}
    >
      <Helmet title="Customers - RPMed Service Admin" />
      <Routes>
        <Route index element={<Navigate to="/admin/customers/table" />} />
        <Route path="table" element={<CustomerListView />} />
        <Route path="new" element={<CustomerCreateView />} />
        <Route path=":customerId" element={<CustomerDetailView />} />
      </Routes>
    </SecondaryNav.View>
  )
}

export const CustomerIndexView = View
