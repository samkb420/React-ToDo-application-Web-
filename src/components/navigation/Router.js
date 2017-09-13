import React, {Component} from 'react'

const getCurrentPath = () => {
  const path = document.location.pathname
  return path.substring(path.lastIndexOf('/')+1)
}

export class Router extends Component {
  state = {
    route: getCurrentPath()
  }

  handleLinkClick = (route) => {
    this.setState({route})
    //Moving to specific page without reloading tab
    window.history.pushState(null, '', route)
  }

//#17: why we define static field and with that name in parent Component
  static childContextTypes = {
    route: React.PropTypes.string,
    linkHandler: React.PropTypes.func
  }

//#17: why we define this (not binded with context) method with that name in parent Component
  getChildContext() {
    return {
      route: this.state.route,
      linkHandler: this.handleLinkClick
    }
  }

//#19: invoked when component is mounted. Changind state inside will trigger component reloading
  componentDidMount() {
    //#19: adding listener for back\forward browser nativation
    window.onpopstate = () => {
      this.setState({route: getCurrentPath()})
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}
