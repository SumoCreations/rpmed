import {
  faAddressBook,
  faArrowLeft,
  faPlusCircle,
  faUsers,
} from '@fortawesome/pro-solid-svg-icons'
import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import { SecondaryNav } from 'rpmed-ui/lib/V1'
import { UserCreateView } from './UserCreateView'
import { UserDetailView } from './UserDetailView'
import { UserListView } from './UserListView'

const checkPath = (path: string, test: string): boolean =>
  path.indexOf(test) > 0

const View: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <SecondaryNav.View
      icon={faUsers}
      title="Users"
      data={[
        {
          icon: faArrowLeft,
          label: 'Control Panel',
          onClick: () => {
            navigate('/admin/controls/')
          },
          selected: false,
        },
        {
          icon: faAddressBook,
          label: 'User Directory',
          onClick: () => {
            navigate('/admin/controls/users/')
          },
          selected: location.pathname === '/admin/controls/users/',
        },
        {
          icon: faPlusCircle,
          label: 'Create User',
          onClick: () => {
            navigate('/admin/controls/users/new')
          },
          selected: checkPath(location.pathname, 'new'),
        },
      ]}
    >
      <Helmet title="Users - RPMed Service Admin" />
      <Routes>
        <Route path="/admin/controls/users/" element={<UserListView />} />
        <Route path="/admin/controls/users/new" element={<UserCreateView />} />
        <Route
          path="/admin/controls/users/:userId"
          element={<UserDetailView />}
        />
      </Routes>
    </SecondaryNav.View>
  )
}

export const UserIndexView = View
