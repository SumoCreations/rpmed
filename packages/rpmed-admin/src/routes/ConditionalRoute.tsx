import * as React from 'react'
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom'

interface IConditionalRouteProps extends RouteProps {
  component:
  | React.ComponentType<RouteComponentProps<any>>
  | React.ComponentType<any>
  redirectIf: () => boolean
  redirectPath: string
}
type RenderComponent = (props: RouteComponentProps<any>) => React.ReactNode

export class ConditionalRoute extends Route<IConditionalRouteProps> {
  public render() {
    const {
      component: Component,
      redirectIf,
      redirectPath,
      ...rest
    }: any = this.props
    const renderComponent: RenderComponent = (props) =>
      redirectIf() ? <Redirect to={redirectPath} /> : <Component {...props} />

    return <Route {...rest} render={renderComponent} />
  }
}
