import { faTable, faLink } from '@fortawesome/pro-regular-svg-icons'
import { faDatabase } from '@fortawesome/pro-solid-svg-icons'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import { SecondaryNav } from 'rpmed-ui/lib/V1'
import { ModalState } from '../Modal'
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

const View: React.FC<RouteComponentProps<{}>> = ({ history, location }) => {
  const RedirectToModelsTable = () => (
    <Redirect to="/admin/products/modelNumbers/table" />
  )
  const RedirectToProductsTable = () => <Redirect to="/admin/products/table" />
  return (
    <SecondaryNav.View
      icon={faDatabase}
      title="Products"
      data={[
        {
          icon: faTable,
          label: 'Products',
          onClick: () => {
            history.push('/admin/products/')
          },
          selected: checkPath(location.pathname, 'products/table'),
        },
        {
          icon: faTable,
          label: 'Model Numbers',
          onClick: () => {
            history.push('/admin/products/modelNumbers/')
          },
          selected: checkPath(location.pathname, 'products/modelNumbers/table'),
        },
        {
          icon: faTable,
          label: 'Faults / Symptoms',
          onClick: () => {
            history.push('/admin/products/symptoms/')
          },
          selected: checkPath(location.pathname, 'products/symptoms', 'map'),
        },
        {
          icon: faLink,
          label: 'Lotted -> Models',
          onClick: () => {
            history.push('/admin/products/modelNumbers/lotted/map')
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
            history.push('/admin/products/modelNumbers/viewable/map')
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
            history.push('/admin/products/symptoms/map')
          },
          selected: checkPath(location.pathname, 'products/symptoms/map'),
        },
      ]}
    >
      <Helmet title="Products - RPMed Service Admin" />
      <ModalState location={location} history={history}>
        {mState => (
          <React.Fragment>
            <Switch location={mState.location}>
              <Route
                path="/admin/products/modelNumbers/"
                component={RedirectToModelsTable}
                exact={true}
              />
              <Route
                path="/admin/products/modelNumbers/table"
                component={ModelNumberListView}
                exact={true}
              />
              <Route
                path="/admin/products/modelNumbers/new"
                component={ModelNumberCreateView}
                exact={true}
              />
              <Route
                path="/admin/products/modelNumbers/lotted/map"
                component={ModelNumbersLottedMap}
                exact={true}
              />
              <Route
                path="/admin/products/modelNumbers/viewable/map"
                component={ModelNumbersViewableMap}
                exact={true}
              />
              <Route
                path="/admin/products/modelNumbers/edit/:modelNumberId"
                component={ModelNumberEditView}
              />
              <Route
                path="/admin/products/modelNumbers/:modelNumberId"
                component={ModelNumberDetailView}
              />
              <Route
                path="/admin/products/symptoms/"
                component={ProductSymptomIndexView}
              />
              <Route
                path="/admin/products/"
                component={RedirectToProductsTable}
                exact={true}
              />
              <Route
                path="/admin/products/table"
                component={ProductListView}
                exact={true}
              />
              <Route path="/admin/products/new" component={ProductCreateView} />
              <Route
                path="/admin/products/:productId"
                component={ProductDetailView}
              />
            </Switch>
            {mState.isModal ? (
              <Route
                path="/admin/products/:productId"
                component={ProductDetailView}
              />
            ) : null}
          </React.Fragment>
        )}
      </ModalState>
    </SecondaryNav.View>
  )
}

export const ProductIndexView = View
