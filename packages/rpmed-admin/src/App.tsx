import { ApolloProvider } from '@apollo/client'
import React, { Component } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Helmet } from 'react-helmet'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { client } from './apolloClient'
import { RequireAuth, RequireAnon } from './routes'
import store from './store'
import { UiProvider } from 'rpmed-ui'
import { defaultTheme, ThemeProvider } from 'rpmed-ui/lib/V1'
import { AdminView, LoginView, TokenView } from './views'
import { Toaster } from 'react-hot-toast'

class App extends Component<{}, {}, any> {
  public componentDidMount() {
    // Force HTTPS
    if (
      window &&
      window.location &&
      window.location.protocol.indexOf('https') < 0 &&
      window.location.hostname !== 'localhost'
    ) {
      window.location.href = `https://${window.location.hostname}${window.location.pathname}`
    }
  }

  public render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={defaultTheme}>
            <UiProvider backend={HTML5Backend}>
              <DndProvider backend={HTML5Backend}>
                <Router>
                  <Helmet>
                    <meta charSet="utf-8" />
                  </Helmet>
                  <Routes>
                    <Route
                      path="/admin/*"
                      element={
                        <RequireAuth>
                          <AdminView />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="/login/*"
                      element={
                        <RequireAnon>
                          <LoginView />
                        </RequireAnon>
                      }
                    />
                    <Route path="/token/:token" element={<TokenView />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                  </Routes>
                </Router>
                <Toaster />
              </DndProvider>
            </UiProvider>
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    )
  }
}

export default App
