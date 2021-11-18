import { faSitemap } from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import { SecondaryNav } from 'rpmed-ui/lib/V1'
import { ModalState } from '../Modal'
import { UserIndexView } from '../UserView'
import { PageListView } from './PageListView'
import { faFile } from '@fortawesome/pro-regular-svg-icons'
import { CreatePageView } from './CreatePageView'
import { EditPageView } from './EditPageView'

const checkPath = (path: string, test: string): boolean => path.indexOf(test) > 0

const View: React.FC<RouteComponentProps<{}>> = ({ history, location }) => {
  const RedirectToMenu = () => <Redirect to="/admin/sitemap/menu" />
  return (
    <SecondaryNav.View icon={faSitemap} title="Sitemap" data={[{
      icon: faSitemap,
      label: 'Pages',
      onClick: () => {
        history.push('/admin/sitemap/pages')
      },
      selected: checkPath(
        location.pathname,
        'sitemap/pages'
      ),
    },
    {
      icon: faFile,
      label: "Documents",
      selected: checkPath(
        location.pathname,
        'products/modelNumbers/viewable/map'
      ),
    }]}>
      <ModalState location={location} history={history}>
        {mState => (
          <React.Fragment>
            <Switch location={mState.location}>
              <Route
                path="/admin/sitemap/"
                component={RedirectToMenu}
                exact={true}
              />
              <Route
                path="/admin/sitemap/pages"
                component={PageListView}
                exact={true}
              />
              <Route
                path="/admin/sitemap/pages/new"
                component={CreatePageView}
                exact={true}
              />
              <Route
                path="/admin/sitemap/pages/:id"
                component={EditPageView}
                exact={true}
              />
              <Route path="/admin/sitemap/users" component={UserIndexView} />
            </Switch>
          </React.Fragment>
        )}
      </ModalState>
    </SecondaryNav.View>
  )
}

export const SitemapIndexView = View
