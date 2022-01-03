import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ProductSymptomCreateView } from './ProductSymptomCreateView'
import { ProductSymptomDetailView } from './ProductSymptomDetailView'
import { ProductSymptomEditView } from './ProductSymptomEditView'
import { ProductSymptomListView } from './ProductSymptomListView'
import { ProductSymptomMapView } from './ProductSymptomMapView'

const View: React.FC = () => {
  const location = useLocation()
  return (
    <React.Fragment>
      <Helmet title="Product Symptoms - RPMed Service Admin" />
      <Routes location={location}>
        <Route
          index
          element={<Navigate to="/admin/products/symptoms/table" />}
        />
        <Route path="table" element={<ProductSymptomListView />} />
        <Route path="map" element={<ProductSymptomMapView />} />
        <Route path="new" element={<ProductSymptomCreateView />} />
        <Route
          path="edit/:productSymptomId"
          element={<ProductSymptomEditView />}
        />
        <Route
          path=":productSymptomId"
          element={<ProductSymptomDetailView />}
        />
      </Routes>
    </React.Fragment>
  )
}

export const ProductSymptomIndexView = View
