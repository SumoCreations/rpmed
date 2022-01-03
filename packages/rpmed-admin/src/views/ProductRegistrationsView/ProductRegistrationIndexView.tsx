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
import { ProductRegistrationCreateView } from './ProductRegistrationCreateView'
import { ProductRegistrationDetailView } from './ProductRegistrationDetailView'
import { ProductRegistrationListView } from './ProductRegistrationListView'

const checkPath = (path: string, test: string): boolean =>
  path.indexOf(test) > 0

const View: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <SecondaryNav.View
      icon={faBuilding}
      title="Registrations"
      data={[
        {
          icon: faTable,
          label: 'Registered Products',
          onClick: () => {
            navigate('/admin/registrations/')
          },
          selected: checkPath(location.pathname, 'registrations/table'),
        },
      ]}
    >
      <Helmet title="Product Registrations - RPMed Service Admin" />
      <Routes>
        <Route index element={<Navigate to="table" />} />
        <Route path="table" element={<ProductRegistrationListView />} />
        <Route path="new" element={<ProductRegistrationCreateView />} />
        <Route
          path=":productRegistrationId"
          element={<ProductRegistrationDetailView />}
        />
        <Route
          path=":productRegistrationId"
          element={<ProductRegistrationDetailView />}
        />
      </Routes>
    </SecondaryNav.View>
  )
}

export const ProductRegistrationIndexView = View
