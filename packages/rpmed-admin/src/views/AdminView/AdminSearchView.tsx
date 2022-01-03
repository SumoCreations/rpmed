import { faUserHardHat } from '@fortawesome/pro-regular-svg-icons'
import * as React from 'react'
import { useNavigate } from 'react-router'
import { Navigation } from 'rpmed-ui/lib/V1'

const AdminSearchViewComponent: React.FC = () => {
  const navigate = useNavigate()
  const goto = (path: string) => () => navigate(path)
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

export const AdminSearchView = AdminSearchViewComponent
