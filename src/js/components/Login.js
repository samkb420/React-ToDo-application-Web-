import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

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
      console.log('handle login with email and pwd', this.state.user, this.state.password)
    }
    const handleGoogleLogin = (e) => {
      console.log('handle login with Google')
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

        <br/>
        <input type='button' onClick={ handleGoogleLogin } value='Sign in with Google'/>
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
  }
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComp)
