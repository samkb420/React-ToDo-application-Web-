import React, { Component } from 'react';
import './../css/App.css';
import { ItemsList } from './components/ItemsList'
import Login from './components/Login'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { AuthActions } from './actions'

class AppComp extends Component {
  componentDidMount() {
    this.props.getchUserFromCache()
  }

  render() {
    console.log('app:render:props', this.props)
    var container;
    if (!this.props.user) {
      container = (
        <div className="Todo-App">
          <p className="App-intro">Login</p>
          <Login />
        </div>
      )
    } else {
      console.log('have user', this.props.user)
      container = (
      <div className="Todo-App">
        <p className="App-intro">Todo List</p>
        <ItemsList />
      </div>
      )
    }

    return (
      <div className="App">
        { container }
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log('state', state)
  return {
    user: state.authReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getchUserFromCache: bindActionCreators(AuthActions.getchUserFromCacheAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComp)
