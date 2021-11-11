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
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import { RgaStatus } from '../../schema'
import { Indicators, SecondaryNav } from 'rpmed-ui/lib/V1'
import { ModalState } from '../Modal'
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

const View: React.FC<RouteComponentProps<{}>> = ({ history, location }) => {
  const { counts } = useRgaCounts()
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
            history.push(`/admin/rga/${RgaStatus.Issued}`)
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
            history.push(`/admin/rga/${RgaStatus.AwaitingArrival}`)
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
            history.push(`/admin/rga/${RgaStatus.Assessing}`)
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
            history.push(`/admin/rga/${RgaStatus.Repairing}`)
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
            history.push(`/admin/rga/${RgaStatus.Closed}`)
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
            history.push(`/admin/rga/${RgaStatus.Delayed}`)
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
            history.push(`/admin/rga/${RgaStatus.Canceled}`)
          },
          selected: checkPath(
            location.pathname,
            `/admin/rga/${RgaStatus.Canceled}`
          ),
        },
      ]}
    >
      <Helmet title="RGAs - RPMed Service Admin" />
      <ModalState location={location} history={history}>
        {mState => (
          <React.Fragment>
            <Switch location={mState.location}>
              <Route path="/admin/rga/new" component={RGACreateView} />
              <Route
                path="/admin/rga/:status"
                component={RGAListView}
                exact={true}
              />
              <Route
                path="/admin/rga/:status/:rgaId"
                component={RGADetailView}
                exact={true}
              />
              <Route
                path="/admin/rga/:status/:rgaId/service-form/:goodId"
                component={ServiceFormView}
                exact={true}
              />
              <Route
                path="/admin/rga/update/:rgaId/details"
                component={RGAEditView}
              />
              <Route
                path="/admin/rga/update/:rgaId/SHIPPING"
                component={RGAShippingUpdateView}
              />
              <Route
                path="/admin/rga/update/:rgaId/:status"
                component={RGAStatusUpdateView}
              />
              <Redirect to={`/admin/rga/${RgaStatus.Issued}`} />
            </Switch>
            {mState.isModal ? (
              <Route path="/admin/rga/:rgaId" component={RGADetailView} />
            ) : null}
          </React.Fragment>
        )}
      </ModalState>
    </SecondaryNav.View>
  )
}

export const RGAIndexView = View
