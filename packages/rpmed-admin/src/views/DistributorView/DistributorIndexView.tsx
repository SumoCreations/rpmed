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
import { DistributorCreateView } from './DistributorCreateView'
import { DistributorDetailView } from './DistributorDetailView'
import { DistributorListView } from './DistributorListView'

const checkPath = (path: string, test: string): boolean =>
  path.indexOf(test) > 0

const View: React.FC = () => {
  const NavigateToDistributorsTable = () => (
    <Navigate to="/admin/distributors/table" />
  )
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <SecondaryNav.View
      icon={faBuilding}
      title="Distributors"
      data={[
        {
          icon: faTable,
          label: 'Distributors',
          onClick: () => {
            navigate('/admin/distributors/')
          },
          selected: checkPath(location.pathname, 'distributors/table'),
        },
      ]}
    >
      <Helmet title="Distributors - RPMed Service Admin" />
      <Routes>
        <Route
          path="/admin/distributors/"
          element={NavigateToDistributorsTable}
        />
        <Route
          path="/admin/distributors/table"
          element={<DistributorListView />}
        />
        <Route
          path="/admin/distributors/new"
          element={<DistributorCreateView />}
        />
        <Route
          path="/admin/distributors/:distributorId"
          element={<DistributorDetailView />}
        />
        <Route
          path="/admin/distributors/:distributorId"
          element={<DistributorDetailView />}
        />
      </Routes>
    </SecondaryNav.View>
  )
}

export const DistributorIndexView = View
