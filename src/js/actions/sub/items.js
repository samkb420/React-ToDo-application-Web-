import fire from '../../../fire';

// const generateUniqueId = () => Math.floor(Math.random()*100000)


const addItemAction = (id, text, completed, groupId, orderNum) => {
  // console.log('addItem:', id, text, completed, groupId, orderNum)
  return {
    type: 'add_item',
    id,
    text,
    completed,
    groupId,
    orderNum
  }
}

export const addItem = (newItem) => {
  return (dispatch, getState) => {
    if (!getState().authReducer.user) {
      console.log('addItem: user should not be null')
      return
    }
    var groupId = getState().groupsReducer.currGroupId
    var newItemRef = fire.database().ref('items').push()
    var orderNum = (getState().itemsReducer.length > 0)
        ? getState().itemsReducer[getState().itemsReducer.length-1].orderNum+1
        : 0
    newItemRef.set({
        ...newItem,
        groupId,
        orderNum
    })
    // console.log('pushed new item', newItemRef)
    dispatch(addItemAction(newItemRef.key, newItem.text, newItem.completed, groupId, orderNum))
  }
}


const toggleItemAction = (id) => {
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
      console.log('toggleItem: user should not be null')
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
  }
}


const updateOrderNumsAction = (id, orderNum) => {
    // console.log('updateOrderNumsAction', id)
    return {
        type: 'update_order_num_item',
        id,
        orderNum
    }
}

export const updateOrderNums = (sortedList) => {
    // console.log('toggleItem', id, completed)
    return (dispatch, getState) => {
        if (!getState().authReducer.user) {
            console.log('updateOrderNumItem: user should not be null')
            return
        }
        for (var i = 0; i < sortedList.length; i++) {
          // console.log('updateOrderNums: update item', sortedList[i])
          const id = sortedList[i].content.key;
          const f = (id, orderNum) => {
            fire.database().ref('/items/' + id).once('value').then(snapshot => {
                var it = snapshot.val();
                // console.log('update item', id, it, orderNum)
                if (it.orderNum === orderNum) {
                    return
                }
                it.orderNum = orderNum
                fire.database().ref('/items/' + id).set(it)
                dispatch(updateOrderNumsAction(id, orderNum))
            })
          }
          f(id, i)
        }

    }
}


const removeItemAction = (id) => ({
  type: 'remove_item',
  id
})

export const removeItem = (id) => {
  return (dispatch, getState) => {
    if (!getState().authReducer.user) {
      console.log('removeItem: user should not be null')
      return
    }
    dispatch(removeItemAction(id))
    fire.database().ref('/items/' + id).remove()
  }
}

export const fetchAllItems = () => {
  return (dispatch, getState) => {
    // console.log('fetchAllItems: state', getState())
    if (!getState().authReducer.user) {
      console.log('fetchAllItems: user should not be null')
      return
    }
    fire.database().ref('items')
      .once('value', list => {
        list.forEach(snapshot => {
          var it = snapshot.val();
          // console.log('addItem', it)
          dispatch(addItemAction(snapshot.key, it.text, it.completed, it.groupId, it.orderNum))
        })
      })
  }
}

export const cleanUpCache = () => {
  return (dispatch, getState) => {
      var itemsCpy = [...getState().itemsReducer]
      itemsCpy.map(it => dispatch(removeItemAction(it)))
  }
}
