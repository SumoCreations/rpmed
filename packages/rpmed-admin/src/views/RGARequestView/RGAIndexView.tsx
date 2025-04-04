import {
  faBarcodeAlt,
  faBoxAlt,
  faBoxCheck,
  faExclamationCircle,
  faNotesMedical,
  faShippingTimed,
  faUserHardHat,
  faWindowClose,
} from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import { RgaStatus } from 'rpmed-schema'
import { Indicators, SecondaryNav } from 'rpmed-ui/lib/V1'
import { useRgaCounts } from './graphql'
import { RGACreateView } from './RGACreateView'
import { RGADetailView } from './RGADetailView/RGADetailView'
import { RGAEditView } from './RgaEditView'
import { RGAListView } from './RGAListView'
import { RGAShippingUpdateView } from './RgaShippingUpdateView'
import { RGAStatusUpdateView } from './RGAStatusUpdateView'
import { ServiceFormView } from './ServiceFormView'

const checkPath = (path: string, test: string): boolean =>
  path.indexOf(test) > -1

const renderCount = (count?: number | null) =>
  (typeof count === 'number' && (
    <SecondaryNav.Bubble px={1} disabled={count < 1}>
      {count}
    </SecondaryNav.Bubble>
  )) || <Indicators.Spinner />

const View: React.FC = () => {
  const location = useLocation()
  const { counts } = useRgaCounts()
  const navigate = useNavigate()
  return (
    <SecondaryNav.View
      icon={faBoxAlt}
      title="RGAs"
      data={[
        {
          accessory: renderCount(counts ? counts.issued : null),
          icon: faBarcodeAlt,
          label: 'Issued',
          onClick: () => {
            navigate(`/admin/rga/${RgaStatus.Issued}`)
          },
          selected: checkPath(
            location.pathname,
            `/admin/rga/${RgaStatus.Issued}`
          ),
        },
        {
          accessory: renderCount(counts ? counts.awaitingArrival : null),
          icon: faShippingTimed,
          label: 'Awaiting Arrival',
          onClick: () => {
            navigate(`/admin/rga/${RgaStatus.AwaitingArrival}`)
          },
          selected: checkPath(
            location.pathname,
            `/admin/rga/${RgaStatus.AwaitingArrival}`
          ),
        },
        {
          accessory: renderCount(counts ? counts.assessing : null),
          icon: faUserHardHat,
          label: 'Assessed',
          onClick: () => {
            navigate(`/admin/rga/${RgaStatus.Assessing}`)
          },
          selected: checkPath(
            location.pathname,
            `/admin/rga/${RgaStatus.Assessing}`
          ),
        },
        {
          accessory: renderCount(counts ? counts.repairing : null),
          icon: faNotesMedical,
          label: 'Repaired',
          onClick: () => {
            navigate(`/admin/rga/${RgaStatus.Repairing}`)
          },
          selected: checkPath(
            location.pathname,
            `/admin/rga/${RgaStatus.Repairing}`
          ),
        },
        {
          accessory: renderCount(counts ? counts.closed : null),
          icon: faBoxCheck,
          label: 'Closed',
          onClick: () => {
            navigate(`/admin/rga/${RgaStatus.Closed}`)
          },
          selected: checkPath(
            location.pathname,
            `/admin/rga/${RgaStatus.Closed}`
          ),
        },
        {
          accessory: renderCount(counts ? counts.delayed : null),
          icon: faExclamationCircle,
          label: 'Delayed',
          onClick: () => {
            navigate(`/admin/rga/${RgaStatus.Delayed}`)
          },
          selected: checkPath(
            location.pathname,
            `/admin/rga/${RgaStatus.Delayed}`
          ),
        },
        {
          accessory: renderCount(counts ? counts.canceled : null),
          icon: faWindowClose,
          label: 'Canceled',
          onClick: () => {
            navigate(`/admin/rga/${RgaStatus.Canceled}`)
          },
          selected: checkPath(
            location.pathname,
            `/admin/rga/${RgaStatus.Canceled}`
          ),
        },
      ]}
    >
      <Helmet title="RGAs - RPMed Service Admin" />
      <Routes>
        <Route path="new" element={<RGACreateView />} />
        <Route path="update/:rgaId/details" element={<RGAEditView />} />
        <Route
          path="update/:rgaId/SHIPPING"
          element={<RGAShippingUpdateView />}
        />
        <Route path="update/:rgaId/:status" element={<RGAStatusUpdateView />} />
        <Route path=":status" element={<RGAListView />} />
        <Route path=":status/:rgaId" element={<RGADetailView />} />
        <Route
          path=":status/:rgaId/service-form/:goodId"
          element={<ServiceFormView />}
        />
        <Route path=":rgaId" element={<RGADetailView />} />
        <Route
          index
          element={<Navigate to={`/admin/rga/${RgaStatus.Issued}`} />}
        />
      </Routes>
    </SecondaryNav.View>
  )
}

export const RGAIndexView = View
