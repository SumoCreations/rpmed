import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { BatteryRecyclingIndexView } from '../BatteryRecyclingView'
import { ControlsIndexView } from '../ControlsView'
import { CustomerIndexView } from '../CustomerView'
import { DashboardView } from '../DashboardView'
import { DistributorIndexView } from '../DistributorView'
import { ProductRegistrationIndexView } from '../ProductRegistrationsView'
import { ProductIndexView } from '../ProductRegistryView'
import { RGAIndexView } from '../RGARequestView'
import { SitemapIndexView } from '../SitemapView'
import { AdminNavigation } from './AdminNavigation'

const View: React.FC = () => {
  return (
    <AdminNavigation>
      <Routes>
        <Route index element={<DashboardView />} />
        <Route path="batteries/*" element={<BatteryRecyclingIndexView />} />
        <Route path="customers/*" element={<CustomerIndexView />} />
        <Route path="distributors/*" element={<DistributorIndexView />} />
        <Route path="products/*" element={<ProductIndexView />} />
        <Route path="sitemap/*" element={<SitemapIndexView />} />
        <Route
          path="registrations/*"
          element={<ProductRegistrationIndexView />}
        />
        <Route path="rga/*" element={<RGAIndexView />} />
        <Route path="controls/*" element={<ControlsIndexView />} />
      </Routes>
    </AdminNavigation>
  )
}

export const AdminView = View
