import fire from '../../../fire';

// const generateUniqueId = () => Math.floor(Math.random()*100000)


export const addItemAction = (id, text, completed) => {
  // console.log('addItem:', id, text, completed)
  return {
    type: 'add_item',
    id,
    text,
    completed
  }
}

export const addItem = (newItem) => {
  return (dispatch, getState) => {
    if (!getState().authReducer.user) {
      console.log('addItem: user should be null')
      return
    }
    var newItemRef = fire.database().ref('items').push()
    newItemRef.set(newItem)
    console.log('pushed new item', newItemRef)
    dispatch(addItemAction(newItemRef.key, newItem.text, newItem.completed))
  }
}


export const toggleItemAction = (id) => {
  // console.log('toggleItemAction', id)
  return {
    type: 'toggle_item',
    id
  }
}

export const toggleItem = (id, completed) => {
  // console.log('toggleItem', id, completed)
  return (dispatch, getState) => {
    if (!getState().authReducer.user) {
      console.log('toggleItem: user should be null')
      return
    }
    //fist of all update UI
    dispatch(toggleItemAction(id))
    //then update server data
    fire.database().ref('/items/' + id).once('value').then(snapshot => {
      var it = snapshot.val();
      it.completed = !completed
      fire.database().ref('/items/' + id).set(it)
    })
    // var updates = {}
    // updates['/items/' + id] = {
    //   completed: !completed
    // }
    // console.log('toggleItem: updates', updates)
    // fire.database().ref().update(updates)
  }
}

export const removeItemAction = (id) => ({
  type: 'remove_item',
  id
})

export const removeItem = (id) => {
  return (dispatch, getState) => {
    if (!getState().authReducer.user) {
      console.log('removeItem: user should be null')
      return
    }

    dispatch(removeItemAction(id))
    fire.database().ref('/items/' + id).remove()
  }
}


export const setVisibilityFilterAction = (filter) => ({
  type: 'set_visibility_filter',
  filter
})


export const fetchAllItems = () => {
  return (dispatch, getState) => {
    // console.log('fetchAllItems: state', getState())
    if (!getState().authReducer.user) {
      console.log('fetchAllItems: user should be null')
      return
    }
    fire.database().ref('items').orderByKey()//TODO: introduce ordering functionality
      .once('value', list => {
        list.forEach(snapshot => {
          var it = snapshot.val();
          // console.log('addItem', it)
          dispatch(addItemAction(snapshot.key, it.text, it.completed))
        })
      })
  }
}
