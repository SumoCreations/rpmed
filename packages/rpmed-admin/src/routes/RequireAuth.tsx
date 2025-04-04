import * as React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from '../session'

export const RequireAuth: React.FC = ({ children }) => {
  let auth = useSelector(isAuthenticated)
  let location = useLocation()

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
