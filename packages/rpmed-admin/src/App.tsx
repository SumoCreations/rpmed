import { ApolloProvider } from '@apollo/client'
import React, { Component } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Helmet } from 'react-helmet'
import { connect, Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { client } from './apolloClient'
import { ConditionalRoute } from './routes'
import { isAuthenticated } from './session'
import store from './store'
import { IStoreState } from './store'
import { UiProvider } from 'rpmed-ui'
import { defaultTheme, ThemeProvider } from 'rpmed-ui/lib/V1'
import { AdminView, LoginView } from './views'

interface IProps {
  authenticated: boolean
}

const RootRoutes: React.FunctionComponent<IProps> = ({ authenticated }) => {
  const loggedIn = () => authenticated
  const loggedOut = () => !loggedIn()
  return (
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
      </Helmet>
      <Switch>
        <ConditionalRoute
          path="/admin"
          component={AdminView}
          redirectIf={loggedOut}
          redirectPath={'/'}
        />
        <Route path="/" component={LoginView} />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state: IStoreState) => ({
  authenticated: isAuthenticated(state.session),
})

const ConnectedRootRouter = connect(mapStateToProps)(RootRoutes)

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
                <ConnectedRootRouter />
              </DndProvider>
            </UiProvider>
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    )
  }
}

export default App
