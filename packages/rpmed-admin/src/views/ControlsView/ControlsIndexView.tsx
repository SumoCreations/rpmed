import { faCog } from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import { SecondaryNav } from 'rpmed-ui/lib/V1'
import { ModalState } from '../Modal'
import { UserIndexView } from '../UserView'
import { ControlsMenuView } from './ControlsMenuView'

// const checkPath = (path: string, test: string): boolean => path.indexOf(test) > 0

const View: React.FC<RouteComponentProps<{}>> = ({ history, location }) => {
  const RedirectToMenu = () => <Redirect to="/admin/controls/menu" />
  return (
    <SecondaryNav.View icon={faCog} title="Controls" hidden={true} data={[]}>
      <Helmet title="Control Panel - RPMed Service Admin" />
      <ModalState location={location} history={history}>
        {mState => (
          <React.Fragment>
            <Switch location={mState.location}>
              <Route
                path="/admin/controls/"
                component={RedirectToMenu}
                exact={true}
              />
              <Route
                path="/admin/controls/menu"
                component={ControlsMenuView}
                exact={true}
              />
              <Route path="/admin/controls/users" component={UserIndexView} />
            </Switch>
          </React.Fragment>
        )}
      </ModalState>
    </SecondaryNav.View>
  )
}

export const ControlsIndexView = View
