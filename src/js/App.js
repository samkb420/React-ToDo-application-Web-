import React, { Component } from 'react';
import './../css/App.css';
import { ItemsList } from './components/ItemsList'
import { GroupsList } from './components/GroupsList'
import Login from './components/Login'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { AuthActions } from './actions'

class AppComp extends Component {
  componentDidMount() {
      this.props.startManageAuthStateChanged()
  }

  render() {
    // console.log('app:render:props', this.props)
    var container;
    if (!this.props.user) {
      container = (
        <div className="Todo-App">
          <p className="App-intro">Login</p>
          <Login />
        </div>
      )
    } else {
      // console.log('have user', this.props.user)
      var userName = this.props.user.displayName ? this.props.user.displayName : this.props.user.email
      container = (
      <div className="Todo-App">
        <span>Welcome { userName }</span><br/>
        <input type='button' onClick={this.props.handleSignOut} value='Sign Out'/>
        <p className="App-intro">Group list</p>
        <GroupsList />
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
  // console.log('app:mapStateToProps', state)
  return {
    user: state.authReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignOut: bindActionCreators(AuthActions.signOut, dispatch),
    startManageAuthStateChanged: bindActionCreators(AuthActions.startManageAuthStateChanged, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComp)
