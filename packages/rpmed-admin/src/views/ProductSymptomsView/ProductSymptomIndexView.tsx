import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import { ProductSymptomCreateView } from './ProductSymptomCreateView'
import { ProductSymptomDetailView } from './ProductSymptomDetailView'
import { ProductSymptomEditView } from './ProductSymptomEditView'
import { ProductSymptomListView } from './ProductSymptomListView'
import { ProductSymptomMapView } from './ProductSymptomMapView'

const View: React.FC<RouteComponentProps> = ({ location }) => {
  const RedirectToProductSymptomsTable = () => (
    <Redirect to="/admin/products/symptoms/table" />
  )
  return (
    <React.Fragment>
      <Helmet title="Product Symptoms - RPMed Service Admin" />
      <Switch location={location}>
        <Route
          path="/admin/products/symptoms/"
          component={RedirectToProductSymptomsTable}
          exact={true}
        />
        <Route
          path="/admin/products/symptoms/table"
          component={ProductSymptomListView}
          exact={true}
        />
        <Route
          path="/admin/products/symptoms/map"
          component={ProductSymptomMapView}
          exact={true}
        />
        <Route
          path="/admin/products/symptoms/new"
          component={ProductSymptomCreateView}
        />
        <Route
          path="/admin/products/symptoms/edit/:productSymptomId"
          component={ProductSymptomEditView}
        />
        <Route
          path="/admin/products/symptoms/:productSymptomId"
          component={ProductSymptomDetailView}
        />
      </Switch>
    </React.Fragment>
  )
}

export const ProductSymptomIndexView = View
