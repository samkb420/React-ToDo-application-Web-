import React, { Component } from 'react';
import './../css/App.css';
import { ItemsList } from './components/ItemsList'
import Login from './components/Login'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { fetchUserAction } from './actions'

class AppComp extends Component {
  state = {
    user: localStorage['user']
  }

  componentDidMount() {
    if (!this.state.user) {
      this.props.fetchUser()
    }
  }

  render() {
    console.log('app:render:props', this.props)
    var container;
    if (this.state.user) {
      container = (
        <div className="Todo-App">
          <p className="App-intro">Login</p>
          <Login />
        </div>
      )
    } else {
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
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => {console.log('need to fetch user here if have')}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComp)
