import { faUserHardHat } from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Navigation } from 'rpmed-ui/lib/V1'

const AdminSearchViewComponent: React.FC<RouteComponentProps<{}>> = ({
  history,
}) => {
  const goto = (path: string) => () => history.push(path)
  return (
    <Navigation.Heirarchy
      contents={[
        {
          options: [
            {
              icon: faUserHardHat,
              name: 'The global search feature is coming soon.',
              onClick: goto('/admin/'),
            },
          ],
        },
      ]}
    />
  )
}

export const AdminSearchView = withRouter(AdminSearchViewComponent)
