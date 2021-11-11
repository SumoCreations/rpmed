import {
  faAddressBook,
  faArrowLeft,
  faPlusCircle,
  faUsers,
} from '@fortawesome/pro-solid-svg-icons'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Route, RouteComponentProps, Switch } from 'react-router'
import { SecondaryNav } from 'rpmed-ui/lib/V1'
import { ModalState } from '../Modal'

import { UserCreateView } from './UserCreateView'
import { UserDetailView } from './UserDetailView'
import { UserListView } from './UserListView'

const checkPath = (path: string, test: string): boolean =>
  path.indexOf(test) > 0

const View: React.FC<RouteComponentProps<{}>> = ({
  match,
  history,
  location,
}) => {
  return (
    <SecondaryNav.View
      icon={faUsers}
      title="Users"
      data={[
        {
          icon: faArrowLeft,
          label: 'Control Panel',
          onClick: () => {
            history.push('/admin/controls/')
          },
          selected: false,
        },
        {
          icon: faAddressBook,
          label: 'User Directory',
          onClick: () => {
            history.push('/admin/controls/users/')
          },
          selected: match.isExact,
        },
        {
          icon: faPlusCircle,
          label: 'Create User',
          onClick: () => {
            history.push('/admin/controls/users/new')
          },
          selected: checkPath(location.pathname, 'new'),
        },
      ]}
    >
      <Helmet title="Users - RPMed Service Admin" />
      <ModalState location={location} history={history}>
        {mState => (
          <React.Fragment>
            <Switch location={mState.location}>
              <Route
                path="/admin/controls/users/"
                component={UserListView}
                exact={true}
              />
              <Route
                path="/admin/controls/users/new"
                component={UserCreateView}
              />
              <Route
                path="/admin/controls/users/:userId"
                component={UserDetailView}
              />
            </Switch>
            {mState.isModal ? (
              <Route
                path="/admin/controls/users/:userId"
                component={UserDetailView}
              />
            ) : null}
          </React.Fragment>
        )}
      </ModalState>
    </SecondaryNav.View>
  )
}

export const UserIndexView = View
