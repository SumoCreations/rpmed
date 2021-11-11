import * as React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router'
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

const View: React.FC<RouteComponentProps<{}>> = () => {
  return (
    <AdminNavigation>
      <Switch>
        <Route path="/admin" component={DashboardView} exact={true} />
        <Route path="/admin/batteries" component={BatteryRecyclingIndexView} />
        <Route path="/admin/customers" component={CustomerIndexView} />
        <Route path="/admin/distributors" component={DistributorIndexView} />
        <Route path="/admin/products" component={ProductIndexView} />
        <Route path="/admin/sitemap" component={SitemapIndexView} />
        <Route
          path="/admin/registrations"
          component={ProductRegistrationIndexView}
        />
        <Route path="/admin/rga" component={RGAIndexView} />
        <Route path="/admin/controls/" component={ControlsIndexView} />
      </Switch>
    </AdminNavigation>
  )
}

export const AdminView = View
