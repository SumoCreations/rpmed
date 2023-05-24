import { ApolloProvider } from '@apollo/client'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { client } from './apolloClient'
import { ContactView } from './contact'
import { PageView, PageNotFoundView } from './pages'
import * as MedLED from './medled'
import { defaultTheme, Header, ThemeProvider } from 'rpmed-ui/lib/V1'
import { DownloadView } from './downloads'
import { Toaster } from 'react-hot-toast'

const App: React.FC<{}> = () => {
  useEffect(() => {
    const currentLocation = window.location.href // get the current location
    const url = new URL(currentLocation) // parse the current location

    if (url.hostname.startsWith('www.service')) {
      const newHostname = url.hostname.replace('www.service', 'service')
      url.hostname = newHostname
      window.location.href = url.href
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={defaultTheme}>
        <div className="flex min-h-screen flex-col flex-grow w-full bg-secondary">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Resource Center - Riverpoint Medical</title>
          </Helmet>
          <Header.Primary />
          <Router>
            <div
              className="flex mx-auto w-full py-2 px-4 md:px-8"
              style={{ maxWidth: '1170px' }}
            >
              <Routes>
                <Route path="/" element={<PageView />} />
                <Route
                  path="/d/zimmerbiomet/juggerknot"
                  element={
                    <Navigate to="/zimmer-biomet/d/juggerknot" replace />
                  }
                />
                <Route
                  path="/zimmer-biomet/orthobutton"
                  element={
                    <Navigate to="/zimmer-biomet/d/orthobutton" replace />
                  }
                />
                <Route
                  path="/d/stryker/procinchopen"
                  element={<Navigate to="/stryker/d/procinchopen" replace />}
                />
                <Route path="/d/:downloadId/*" element={<DownloadView />} />
                <Route path="/:slug" element={<PageView />} />
                <Route
                  path="/:slug/d/:downloadId/*"
                  element={<DownloadView />}
                />
                <Route
                  path="/:slug/batteries/*"
                  element={<MedLED.BatteryView />}
                />
                <Route
                  path="/:slug/service-request/*"
                  element={<MedLED.ServiceView />}
                />
                <Route
                  path="/:slug/register/*"
                  element={<MedLED.RegisterView />}
                />
                <Route
                  path="/:slug/mission/*"
                  element={<MedLED.MissionView />}
                />
                <Route path="/:slug/quote/*" element={<MedLED.QuoteView />} />
                <Route path="/:slug/rga/*" element={<MedLED.RGAView />} />
                <Route
                  path="/:slug/troubleshooting/"
                  element={<MedLED.TroubleshootingView />}
                />
                <Route path="/:slug/contact/" element={<ContactView />} />
                <Route element={<PageNotFoundView />} />
              </Routes>
            </div>
          </Router>
        </div>
        <Toaster />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
