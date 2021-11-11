import { faBuilding, faTable } from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import { SecondaryNav } from 'rpmed-ui/lib/V1'
import { ModalState } from '../Modal'
import { DistributorCreateView } from './DistributorCreateView'
import { DistributorDetailView } from './DistributorDetailView'
import { DistributorListView } from './DistributorListView'

const checkPath = (path: string, test: string): boolean =>
  path.indexOf(test) > 0

const View: React.FC<RouteComponentProps<{}>> = ({ history, location }) => {
  const RedirectToDistributorsTable = () => (
    <Redirect to="/admin/distributors/table" />
  )
  return (
    <SecondaryNav.View
      icon={faBuilding}
      title="Distributors"
      data={[
        {
          icon: faTable,
          label: 'Distributors',
          onClick: () => {
            history.push('/admin/distributors/')
          },
          selected: checkPath(location.pathname, 'distributors/table'),
        },
      ]}
    >
      <Helmet title="Distributors - RPMed Service Admin" />
      <ModalState location={location} history={history}>
        {mState => (
          <React.Fragment>
            <Switch location={mState.location}>
              <Route
                path="/admin/distributors/"
                component={RedirectToDistributorsTable}
                exact={true}
              />
              <Route
                path="/admin/distributors/table"
                component={DistributorListView}
                exact={true}
              />
              <Route
                path="/admin/distributors/new"
                component={DistributorCreateView}
              />
              <Route
                path="/admin/distributors/:distributorId"
                component={DistributorDetailView}
              />
            </Switch>
            {mState.isModal ? (
              <Route
                path="/admin/distributors/:distributorId"
                component={DistributorDetailView}
              />
            ) : null}
          </React.Fragment>
        )}
      </ModalState>
    </SecondaryNav.View>
  )
}

export const DistributorIndexView = View
