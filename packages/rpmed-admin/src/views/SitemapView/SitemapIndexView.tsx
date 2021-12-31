import { faSitemap } from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { SecondaryNav } from 'rpmed-ui/lib/V1'
import { DocumentListView } from './DocumentListView'
import { PageListView } from './PageListView'
import { faFile } from '@fortawesome/pro-regular-svg-icons'
import { CreatePageView } from './CreatePageView'
import { CreateDocumentView } from './CreateDocumentView'
import { EditPageView } from './EditPageView'
import { EditDocumentView } from './EditDocumentView'
import { ShowDocumentView } from './ShowDocumentView'
import { ShowPageView } from './ShowPageView'
import { BuildOriginalSitemapView } from './BuildOriginalSitemapView'

const checkPath = (path: string, test: string): boolean =>
  path.indexOf(test) > 0

const View: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <SecondaryNav.View
      icon={faSitemap}
      title="Sitemap"
      data={[
        {
          icon: faSitemap,
          label: 'Pages',
          onClick: () => {
            navigate('/admin/sitemap/pages')
          },
          selected: checkPath(location.pathname, 'sitemap/pages'),
        },
        {
          icon: faFile,
          label: 'Documents',
          onClick: () => {
            navigate('/admin/sitemap/documents')
          },
          selected: checkPath(location.pathname, 'sitemap/documents'),
        },
      ]}
    >
      <Routes>
        <Route index element={<Navigate to="/admin/sitemap/pages" replace />} />
        <Route path="pages" element={<PageListView />} />
        <Route path="import" element={<BuildOriginalSitemapView />} />
        <Route path="pages/new" element={<CreatePageView />} />
        <Route path="pages/:id" element={<ShowPageView />} />
        <Route path="pages/:id/edit" element={<EditPageView />} />
        <Route path="documents" element={<DocumentListView />} />
        <Route path="documents/new" element={<CreateDocumentView />} />
        <Route path="documents/:id" element={<ShowDocumentView />} />
        <Route path="documents/:id/edit" element={<EditDocumentView />} />
      </Routes>
    </SecondaryNav.View>
  )
}

export const SitemapIndexView = View
