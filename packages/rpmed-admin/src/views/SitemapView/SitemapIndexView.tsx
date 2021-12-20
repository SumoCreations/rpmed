import { faSitemap } from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import { SecondaryNav } from 'rpmed-ui/lib/V1'
import { ModalState } from '../Modal'
import { DocumentListView } from './DocumentListView'
import { PageListView } from './PageListView'
import { faFile } from '@fortawesome/pro-regular-svg-icons'
import { CreatePageView } from './CreatePageView'
import { CreateDocumentView } from './CreateDocumentView'
import { EditPageView } from './EditPageView'
import { EditDocumentView } from './EditDocumentView'
import { ShowDocumentView } from './ShowDocumentView'
import { ShowPageView } from './ShowPageView'

const checkPath = (path: string, test: string): boolean =>
  path.indexOf(test) > 0

const View: React.FC<RouteComponentProps<{}>> = ({ history, location }) => {
  const RedirectToPages = () => <Redirect to="/admin/sitemap/pages" />
  return (
    <SecondaryNav.View
      icon={faSitemap}
      title="Sitemap"
      data={[
        {
          icon: faSitemap,
          label: 'Pages',
          onClick: () => {
            history.push('/admin/sitemap/pages')
          },
          selected: checkPath(location.pathname, 'sitemap/pages'),
        },
        {
          icon: faFile,
          label: 'Documents',
          onClick: () => {
            history.push('/admin/sitemap/documents')
          },
          selected: checkPath(location.pathname, 'sitemap/documents'),
        },
      ]}
    >
      <ModalState location={location} history={history}>
        {mState => (
          <React.Fragment>
            <Switch location={mState.location}>
              <Route
                path="/admin/sitemap/"
                component={RedirectToPages}
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
                component={ShowPageView}
                exact={true}
              />
              <Route
                path="/admin/sitemap/pages/:id/edit"
                component={EditPageView}
                exact={true}
              />
              <Route
                path="/admin/sitemap/documents"
                component={DocumentListView}
                exact={true}
              />
              <Route
                path="/admin/sitemap/documents/new"
                component={CreateDocumentView}
                exact={true}
              />
              <Route
                path="/admin/sitemap/documents/:id"
                component={ShowDocumentView}
                exact={true}
              />
              <Route
                path="/admin/sitemap/documents/:id/edit"
                component={EditDocumentView}
                exact={true}
              />
            </Switch>
          </React.Fragment>
        )}
      </ModalState>
    </SecondaryNav.View>
  )
}

export const SitemapIndexView = View
