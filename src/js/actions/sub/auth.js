import * as AuthHelper from './authHelper'

export const saveUser = (user) => {
  return {
    type: 'save_user',
    user
  }
}

const signOutAction = () => {
  return {
    type: 'remove_user'
  }
}

export const signOut = () => {
  return (dispatch) => {
    AuthHelper.signOut(
      () => {
        console.log('successfully signed out')
        dispatch(signOutAction())
      },
      error => {
        console.log("signOut error", error)
      })
  }
}

export const startManageAuthStateChanged = (onUserStateChanged) => {
  return (dispatch) => {
    AuthHelper.startManageAuthStateChanged(user => {
      // console.log('resolved', user)
      dispatch(saveUser(user))
    })
  }
}

export const createUserWithEmailAndPassword = (email, pwd) => {
  return (dispatch) => {
    AuthHelper.createUserWithEmailAndPassword(email, pwd,
      user => {
        // console.log('user created', user)
        //TODO load all items
      },
      error => {
        if (error.code === 'auth/email-already-in-use') {
          AuthHelper.signInWithEmailAndPassword(email, pwd,
            user => {
              // console.log('signed in', user)
            },
            error => {
              // console.log('sign in user has been failed')
            })
          return
        }
        // console.log('create user has been failed', error)
        //TODO show notification
      })
  }
}
