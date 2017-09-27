import fire from '../../../fire';
import * as ReducersHelper from '../../reducers/sub/ReducersHelper'

const createGroupAction = (id, text, uids) => {
  return {
    type: 'create_group',
    id,
    text,
    uids
  }
}

export const createGroup = (text) => {
    return (dispatch, getState) => {
        if (!getState().authReducer.user) {
            console.log('createGroup: user should be null')
            return
        }
        var newRef = fire.database().ref('groups').push()
        var uids = [ReducersHelper.getUserUid(getState)]
        newRef.set({
            text,
            uids
        })
        console.log('push new group', newRef)
        dispatch(createGroupAction(newRef.key, text, uids))
    }
}


const removeGroupAction = id => {
  return {
    type: 'remove_group',
    id
  }
}

export const removeGroup = (id) => {
    return (dispatch, getState) => {
        if (!getState().authReducer.user) {
            console.log('removeGroup: user should be null')
            return
        }

        console.log('remove group', id)
        dispatch(removeGroupAction(id))
        fire.database().ref('/groups/' + id).remove()
    }
}

const currentGroupAction = id => {
    return {
        type: 'current_group',
        id
    }
}
export const setCurrentGroup = (id) => {
    return (dispatch) => {
        console.log('setCurrentGroup', id)
        dispatch(currentGroupAction(id))
    }
}


export const fetchAllGroups = () => {
    return (dispatch, getState) => {
        // console.log('fetchAllItems: state', getState())
        if (!getState().authReducer.user) {
            console.log('fetchAllGroups: user should be null')
            return
        }
        var isFirst = true;
        fire.database().ref('groups').orderByKey()
            .once('value', list => {
                list.forEach(snapshot => {
                    var it = snapshot.val();
                    console.log('addGroup', snapshot.key, it)
                    dispatch(createGroupAction(snapshot.key, it.text, it.uids))
                    //Set current group as first one in the list
                    if (isFirst) {
                        isFirst = false
                        console.log('addGroup:setCurrGroup', snapshot.key)
                        dispatch(currentGroupAction(snapshot.key))
                    }
                })
            })
    }
}