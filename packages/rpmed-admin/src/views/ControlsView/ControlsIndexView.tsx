import { faCog } from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Navigate, Route, Routes } from 'react-router-dom'
import { SecondaryNav } from 'rpmed-ui/lib/V1'
import { UserIndexView } from '../UserView'
import { ControlsMenuView } from './ControlsMenuView'

// const checkPath = (path: string, test: string): boolean => path.indexOf(test) > 0

const View: React.FC = () => {
  return (
    <SecondaryNav.View icon={faCog} title="Controls" hidden={true} data={[]}>
      <Helmet title="Control Panel - RPMed Service Admin" />
      <Routes>
        <Route
          path="/admin/controls/"
          element={<Navigate to="/admin/controls/menu" replace />}
        />
        <Route path="/admin/controls/menu" element={<ControlsMenuView />} />
        <Route path="/admin/controls/users" element={<UserIndexView />} />
      </Routes>
    </SecondaryNav.View>
  )
}

export const ControlsIndexView = View
