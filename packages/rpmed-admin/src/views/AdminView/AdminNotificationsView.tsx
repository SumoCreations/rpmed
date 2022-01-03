import { faCheckCircle } from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import { useNavigate } from 'react-router'
import { Navigation } from 'rpmed-ui/lib/V1'

const AdminNotificationsViewComponent: React.FC = () => {
  const navigate = useNavigate()
  const goto = (path: string) => () => navigate(path)
  return (
    <Navigation.Heirarchy
      contents={[
        {
          options: [
            {
              icon: faCheckCircle,
              name: 'No notifications at this time.',
              onClick: goto('/admin/'),
            },
          ],
        },
      ]}
    />
  )
}

export const AdminNotificationsView = AdminNotificationsViewComponent
