import { faTable, faLink } from '@fortawesome/pro-regular-svg-icons'
import { faDatabase } from '@fortawesome/pro-solid-svg-icons'
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
import { ProductSymptomIndexView } from '../ProductSymptomsView'
import { ModelNumberCreateView } from './ModelNumberCreateView'
import { ModelNumberDetailView } from './ModelNumberDetailView'
import { ModelNumberEditView } from './ModelNumberEditView'
import { ModelNumberListView } from './ModelNumberListView'
import { ModelNumbersLottedMap } from './ModelNumbersLottedMap'
import { ProductCreateView } from './ProductCreateView'
import { ProductDetailView } from './ProductDetailView'
import { ProductListView } from './ProductListView'
import { ModelNumbersViewableMap } from './ModelNumbersViewableMap'

const checkPath = (path: string, test: string, excludes?: string): boolean =>
  path.indexOf(test) > 0 && (!excludes || path.indexOf(excludes) < 0)

const View: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <SecondaryNav.View
      icon={faDatabase}
      title="Products"
      data={[
        {
          icon: faTable,
          label: 'Products',
          onClick: () => {
            navigate('/admin/products/')
          },
          selected: checkPath(location.pathname, 'products/table'),
        },
        {
          icon: faTable,
          label: 'Model Numbers',
          onClick: () => {
            navigate('/admin/products/modelNumbers/')
          },
          selected: checkPath(location.pathname, 'products/modelNumbers/table'),
        },
        {
          icon: faTable,
          label: 'Faults / Symptoms',
          onClick: () => {
            navigate('/admin/products/symptoms/')
          },
          selected: checkPath(location.pathname, 'products/symptoms', 'map'),
        },
        {
          icon: faLink,
          label: 'Lotted -> Models',
          onClick: () => {
            navigate('/admin/products/modelNumbers/lotted/map')
          },
          selected: checkPath(
            location.pathname,
            'products/modelNumbers/lotted/map'
          ),
        },
        {
          icon: faLink,
          label: 'Viewable -> Models',
          onClick: () => {
            navigate('/admin/products/modelNumbers/viewable/map')
          },
          selected: checkPath(
            location.pathname,
            'products/modelNumbers/viewable/map'
          ),
        },
        {
          icon: faLink,
          label: 'Fault -> Models',
          onClick: () => {
            navigate('/admin/products/symptoms/map')
          },
          selected: checkPath(location.pathname, 'products/symptoms/map'),
        },
      ]}
    >
      <Helmet title="Products - RPMed Service Admin" />
      <Routes>
        <Route
          path="modelNumbers/"
          element={<Navigate to="/admin/products/modelNumbers/table" />}
        />
        <Route path="modelNumbers/table" element={<ModelNumberListView />} />
        <Route path="modelNumbers/new" element={<ModelNumberCreateView />} />
        <Route
          path="modelNumbers/lotted/map"
          element={<ModelNumbersLottedMap />}
        />
        <Route
          path="modelNumbers/viewable/map"
          element={<ModelNumbersViewableMap />}
        />
        <Route
          path="modelNumbers/edit/:modelNumberId"
          element={<ModelNumberEditView />}
        />
        <Route
          path="modelNumbers/:modelNumberId"
          element={<ModelNumberDetailView />}
        />
        <Route path="symptoms/*" element={<ProductSymptomIndexView />} />
        <Route
          path=""
          element={<Navigate to="/admin/products/table" replace />}
        />
        <Route path="table" element={<ProductListView />} />
        <Route path="new" element={<ProductCreateView />} />
        <Route path=":productId" element={<ProductDetailView />} />
        <Route path=":productId" element={<ProductDetailView />} />
      </Routes>
    </SecondaryNav.View>
  )
}

export const ProductIndexView = View
