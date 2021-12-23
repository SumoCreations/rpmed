import { faBuilding, faTable } from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import { SecondaryNav } from 'rpmed-ui/lib/V1'
import { ModalState } from '../Modal'
import { ProductRegistrationCreateView } from './ProductRegistrationCreateView'
import { ProductRegistrationDetailView } from './ProductRegistrationDetailView'
import { ProductRegistrationListView } from './ProductRegistrationListView'

const checkPath = (path: string, test: string): boolean =>
  path.indexOf(test) > 0

const View: React.FC<RouteComponentProps<{}>> = ({ history, location }) => {
  const RedirectToProductRegistrationsTable = () => (
    <Redirect to="/admin/registrations/table" />
  )
  return (
    <SecondaryNav.View
      icon={faBuilding}
      title="Registrations"
      data={[
        {
          icon: faTable,
          label: 'Registered Products',
          onClick: () => {
            history.push('/admin/registrations/')
          },
          selected: checkPath(location.pathname, 'registrations/table'),
        },
      ]}
    >
      <Helmet title="Product Registrations - RPMed Service Admin" />
      <ModalState location={location} history={history}>
        {mState => (
          <React.Fragment>
            <Switch location={mState.location}>
              <Route
                path="/admin/registrations/"
                component={RedirectToProductRegistrationsTable}
                exact={true}
              />
              <Route
                path="/admin/registrations/table"
                component={ProductRegistrationListView}
                exact={true}
              />
              <Route
                path="/admin/registrations/new"
                component={ProductRegistrationCreateView}
              />
              <Route
                path="/admin/registrations/:productRegistrationId"
                component={ProductRegistrationDetailView}
              />
            </Switch>
            {mState.isModal ? (
              <Route
                path="/admin/registrations/:productRegistrationId"
                component={ProductRegistrationDetailView}
              />
            ) : null}
          </React.Fragment>
        )}
      </ModalState>
    </SecondaryNav.View>
  )
}

export const ProductRegistrationIndexView = View
