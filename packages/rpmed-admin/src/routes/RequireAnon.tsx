import * as React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../session'

export const RequireAnon: React.FC = ({ children }) => {
  let auth = useSelector(state => {
    console.log('state', state)
    return isAuthenticated(state as any)
  })
  console.log('auth', auth)
  if (auth) {
    // Redirect them to the /admin page if already signed in.
    return <Navigate to="/admin" replace />
  }

  return <>{children}</>
}
