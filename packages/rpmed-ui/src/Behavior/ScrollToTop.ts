import React, { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
