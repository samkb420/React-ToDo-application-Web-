import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import { AuthActions } from '../actions'

class LoginComp extends Component {
  state = {
    user: '',
    password: '',
    errorMsg: ''
  }

  render () {
    const handleEmailChange = (e) => { this.setState({user: e.target.value, errorMsg: ''}) }
    const handlePasswordChange = (e) => { this.setState({password: e.target.value, errorMsg: ''}) }

    const handleSignInWithEmailAndPassword = (e) => {
      e.preventDefault()
      if (!this.state.user || !this.state.password) {
        this.setState({
          errorMsg: 'Email or password is empty'
        })
        return
      }
      // console.log('handle login with email=`', this.state.user, '` and pwd=`', this.state.password, '`')
      this.props.createUserWithEmailAndPassword(this.state.user, this.state.password)
    }

    return (
      <div>
        {this.state.errorMsg && <span className='error'>{ this.state.errorMsg }</span> }
        <form onSubmit={ handleSignInWithEmailAndPassword }>
          Email: <input type="email" name="email"
            onChange={ handleEmailChange }
            value={ this.state.user }/><br/>
          Password: <input type="password" name="pwd"
            onChange={ handlePasswordChange }
            value={ this.state.password }/><br/>
          <input type="submit" value='Sign In'/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  const actions = {
    createUserWithEmailAndPassword: AuthActions.createUserWithEmailAndPassword
  }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComp)
