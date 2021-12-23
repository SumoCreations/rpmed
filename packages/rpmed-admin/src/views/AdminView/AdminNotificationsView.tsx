import { faCheckCircle } from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Navigation } from 'rpmed-ui/lib/V1'

const AdminNotificationsViewComponent: React.FC<RouteComponentProps<{}>> = ({
  history,
}) => {
  const goto = (path: string) => () => history.push(path)
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

export const AdminNotificationsView = withRouter(
  AdminNotificationsViewComponent
)
