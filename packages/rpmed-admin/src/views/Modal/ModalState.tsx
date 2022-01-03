import * as React from 'react'

interface IModalStateFnParams {
  location: any
  isModal: boolean
}

type RenderChildrenFn = (params: IModalStateFnParams) => JSX.Element

interface IModalSwitchProps {
  children: RenderChildrenFn
  history: History
  location: any
}

export class ModalState extends React.Component<IModalSwitchProps> {
  private previousLocation = this.props.location

  // public componentWillUpdate(nextProps: IModalSwitchProps) {
  //   const { location } = this.props
  //   if (
  //     nextProps.history.action !== 'POP' &&
  //     (!location.state || !location.state.modal)
  //   ) {
  //     this.previousLocation = this.props.location
  //   }
  // }

  public render() {
    const { location, children } = this.props

    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ) // not initial render

    return children({
      isModal,
      location: isModal ? this.previousLocation : location,
    })
  }
}
