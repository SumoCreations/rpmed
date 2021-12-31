import { ApolloProvider } from '@apollo/client'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { client } from './apolloClient'
import { ContactView } from './contact'
import { PageView, PageNotFoundView } from './pages'
import * as MedLED from './medled'
import { defaultTheme, Header, ThemeProvider } from 'rpmed-ui/lib/V1'
import { DownloadView } from './downloads'

class App extends Component<{}, {}, any> {
  public render() {
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
                className="flex mx-auto w-full"
                style={{ maxWidth: '1170px' }}
              >
                <Routes>
                  <Route path="/" element={<PageView />} />
                  <Route path="/:slug" element={<PageView />} />
                  <Route
                    path="/:slug/d/:downloadId"
                    element={<DownloadView />}
                  />
                  <Route
                    path="/:slug/batteries/"
                    element={<MedLED.BatteryView />}
                  />
                  <Route
                    path="/:slug/service-request/"
                    element={<MedLED.ServiceView />}
                  />
                  <Route
                    path="/:slug/register/"
                    element={<MedLED.RegisterView />}
                  />
                  <Route
                    path="/:slug/mission/"
                    element={<MedLED.MissionView />}
                  />
                  <Route path="/:slug/quote/" element={<MedLED.QuoteView />} />
                  <Route path="/:slug/rga/" element={<MedLED.RGAView />} />
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
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

export default App
