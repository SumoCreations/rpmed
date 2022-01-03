import {
  faBars,
  faBell,
  faCog,
  faSearch,
  faShieldAlt,
  faSignOut,
} from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dispatch } from 'redux'
import { clearSession, SessionActionTypes } from '../../session'
import { Navigation } from 'rpmed-ui/lib/V1'
import { AdminNavigationHeirarchy } from './AdminNavigationHeirarchy'
import { AdminNotificationsView } from './AdminNotificationsView'
import { AdminSearchView } from './AdminSearchView'

enum DrawerDisplay {
  Hidden = '',
  Navigation = 'navigation',
  Search = 'search',
  Notifications = 'notifications',
}

interface IProps {
  handleLogout: () => SessionActionTypes
}

const { useState } = React

const AdminNavigationComponent: React.FC<IProps> = ({
  children,
  handleLogout,
}) => {
  const navigate = useNavigate()
  const goto = (path: string) => () => navigate(path)

  const [currentDrawerView, setDrawerView] = useState(DrawerDisplay.Hidden)
  const showDrawer = (display: DrawerDisplay) => () => setDrawerView(display)
  const disableMenu = () => setDrawerView(DrawerDisplay.Hidden)
  const showMenu = currentDrawerView !== DrawerDisplay.Hidden

  return (
    <Navigation.Container>
      <Navigation.Sidebar>
        <Navigation.GlobalItem icon={faShieldAlt} onClick={goto('/admin')} />
        <Navigation.Divider />
        <Navigation.GlobalItem
          icon={faBars}
          label="Menu"
          onClick={
            showMenu ? disableMenu : showDrawer(DrawerDisplay.Navigation)
          }
        />
        <Navigation.GlobalItem
          icon={faBell}
          label="Unresolved Tasks"
          onClick={
            showMenu ? disableMenu : showDrawer(DrawerDisplay.Notifications)
          }
        />
        <Navigation.GlobalItem
          icon={faSearch}
          label="Search"
          onClick={showMenu ? disableMenu : showDrawer(DrawerDisplay.Search)}
        />
        <Navigation.Divider size={Navigation.DividerSize.Expand} />
        <Navigation.GlobalItem
          icon={faCog}
          label="Control Panel"
          onClick={goto('/admin/controls')}
        />
        <Navigation.GlobalItem
          icon={faSignOut}
          label="Sign Out"
          onClick={handleLogout}
        />
      </Navigation.Sidebar>
      <Navigation.Drawer
        width={Navigation.DrawerWidth.Medium}
        active={showMenu}
        onBackClick={disableMenu}
      >
        {currentDrawerView === DrawerDisplay.Navigation && (
          <AdminNavigationHeirarchy />
        )}
        {currentDrawerView === DrawerDisplay.Search && <AdminSearchView />}
        {currentDrawerView === DrawerDisplay.Notifications && (
          <AdminNotificationsView />
        )}
      </Navigation.Drawer>
      <Navigation.Body>{children}</Navigation.Body>
    </Navigation.Container>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<SessionActionTypes>) => ({
  handleLogout: () => dispatch(clearSession()),
})

export const AdminNavigation = connect(
  null,
  mapDispatchToProps
)(AdminNavigationComponent)
