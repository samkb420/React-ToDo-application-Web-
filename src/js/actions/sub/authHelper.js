import fire from '../../../fire';
import firebase from 'firebase'

export const createUserWithEmailAndPassword = (email, pwd, resolve, reject) => {
  return callFromSetPersistance(
    () => { return fire.auth().createUserWithEmailAndPassword(email, pwd) },
    resolve,
    reject)
}

export const signInWithEmailAndPassword = (email, pwd, resolve, reject) => {
  return callFromSetPersistance(
    () => { return fire.auth().signInWithEmailAndPassword(email, pwd) },
    resolve,
    reject
  )
}

export const signOut = (resolve, reject) => {
  callFromSetPersistance(
    () => { return fire.auth().signOut() },
    resolve,
    reject
  )
}

export const startManageAuthStateChanged = (onUserStateChanged) => {
  fire.auth().onAuthStateChanged((user) => {
    console.log('userStateChanged', user)
    onUserStateChanged(user)
  })
}

const callFromSetPersistance = (executePromiseFunc, resolve, reject) => {
  fire.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      executePromiseFunc()
        .then(result => {
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
    .catch(err => {
      console.log('error when setPersistence', err)
      reject(err)
    })
}


// export const getCurrUser = () => {
//   callFromSetPersistance(() => {
//     console.log('currUserFromPersistance1', fire.auth().currentUser)
//     return fire.auth().currentUser
//   }).then(user => console.log('currUserFromPersistance2', user))
//
//   console.log('currUserFromCatche', fire.auth().currentUser)
//   // return fire.auth().currentUser;
//   return callFromSetPersistance(() => { return fire.auth().currentUser })
//     // .then(user => {console.log('tmp user=', user)})
// }
