import { faBuilding, faTable } from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import { SecondaryNav } from 'rpmed-ui/lib/V1'
import { ModalState } from '../Modal'
import { CustomerCreateView } from './CustomerCreateView'
import { CustomerDetailView } from './CustomerDetailView'
import { CustomerListView } from './CustomerListView'

const checkPath = (path: string, test: string): boolean =>
  path.indexOf(test) > 0

const View: React.FC<RouteComponentProps<{}>> = ({ history, location }) => {
  const RedirectToCustomersTable = () => (
    <Redirect to="/admin/customers/table" />
  )
  return (
    <SecondaryNav.View
      icon={faBuilding}
      title="Customers"
      data={[
        {
          icon: faTable,
          label: 'Customers',
          onClick: () => {
            history.push('/admin/customers/')
          },
          selected: checkPath(location.pathname, 'customers/table'),
        },
      ]}
    >
      <Helmet title="Customers - RPMed Service Admin" />
      <ModalState location={location} history={history}>
        {mState => (
          <React.Fragment>
            <Switch location={mState.location}>
              <Route
                path="/admin/customers/"
                component={RedirectToCustomersTable}
                exact={true}
              />
              <Route
                path="/admin/customers/table"
                component={CustomerListView}
                exact={true}
              />
              <Route
                path="/admin/customers/new"
                component={CustomerCreateView}
              />
              <Route
                path="/admin/customers/:customerId"
                component={CustomerDetailView}
              />
            </Switch>
            {mState.isModal ? (
              <Route
                path="/admin/customers/:customerId"
                component={CustomerDetailView}
              />
            ) : null}
          </React.Fragment>
        )}
      </ModalState>
    </SecondaryNav.View>
  )
}

export const CustomerIndexView = View
