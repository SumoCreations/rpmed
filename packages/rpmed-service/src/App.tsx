import { ApolloProvider } from '@apollo/client'
import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { client } from './apolloClient'
import { ContactView } from './contact'
import {
  HomeView,
  MedledHomeView,
  SurgicalHomeView,
  OncologyHomeView,
  SutureHomeView,
} from './home'
import * as MedLED from './medled'
import { defaultTheme, Header, ThemeProvider } from 'rpmed-ui/lib/V1'
import { DownloadView, DownloadsView } from './downloads'

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
              <div className="flex mx-auto" style={{ maxWidth: '1170px' }}>
                <Route path="/" exact={true} component={HomeView} />
                <Route path="/medled" exact={true} component={MedledHomeView} />
                <Route
                  path="/surgical"
                  exact={true}
                  component={SurgicalHomeView}
                />
                <Route path="/suture" exact={true} component={SutureHomeView} />
                <Route
                  path="/oncology"
                  exact={true}
                  component={OncologyHomeView}
                />
                <Route
                  path="/downloads/:category"
                  component={DownloadsView}
                  exact={true}
                />
                <Route
                  path="/d/:downloadId"
                  component={DownloadView}
                  exact={true}
                />
                <Route
                  path="/d/:category/:downloadId"
                  exact={true}
                  component={DownloadView}
                />
                <Route
                  path="/medled/batteries/"
                  component={MedLED.BatteryView}
                />
                <Route
                  path="/medled/service-request/"
                  component={MedLED.ServiceView}
                />
                <Route
                  path="/medled/register/"
                  component={MedLED.RegisterView}
                />
                <Route path="/medled/mission/" component={MedLED.MissionView} />
                <Route path="/medled/quote/" component={MedLED.QuoteView} />
                <Route path="/medled/rga/" component={MedLED.RGAView} />
                <Route
                  path="/medled/troubleshooting/"
                  component={MedLED.TroubleshootingView}
                />
                <Route path="/contact/" component={ContactView} />
              </div>
            </Router>
          </div>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

export default App
