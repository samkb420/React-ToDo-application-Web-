import fire from '../../../fire';
import * as ReducersHelper from '../../reducers/sub/ReducersHelper'
import {removeItem} from "./items";

const createGroupAction = (id, text, uid, isShared) => {
  return {
    type: 'create_group',
    id,
    text,
    uid,
    isShared
  }
}

export const createGroup = (text) => {
    return (dispatch, getState) => {
        if (!getState().authReducer.user) {
            console.log('createGroup: user should not be null')
            return
        }
        var newRef = fire.database().ref('groups').push()
        var uid = ReducersHelper.getUserUid(getState)
        var isShared = false
        newRef.set({
            text,
            uid,
            isShared
        })
        console.log('push new group', newRef)

        //set fist group is being added as current
        if (getState().groupsReducer.groups.length === 0) {
            dispatch(setCurrentGroup(newRef.key))
        }

        dispatch(createGroupAction(newRef.key, text, uid, isShared))
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
            console.log('removeGroup: user should not be null')
            return
        }

        //remove current group in case last group is being removed
        if (getState().groupsReducer.groups.length === 1) {
            dispatch(setCurrentGroup(undefined))
        }
        //set first group as current if current group is being removed
        if (getState().groupsReducer.currGroupId === id) {
            dispatch(setCurrentGroup(getState().groupsReducer.groups[1].id))
        }

        console.log('remove group', id)
        dispatch(removeGroupAction(id))

        var itemsToRemove = getState().itemsReducer.filter(it => it.groupId === id)
        itemsToRemove.map(it => dispatch(removeItem(it.id)))
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
        // console.log('setCurrentGroup', id)
        dispatch(currentGroupAction(id))
    }
}

const toggleSharingAction = id => {
    return {
        type: 'toggle_sharing',
        id
    }
}

export const toggleSharing = (id) => {
    return (dispatch) => {
        console.log('toggleSharing', id)
        dispatch(toggleSharingAction(id))
        //then update server data
        fire.database().ref('/groups/' + id).once('value').then(snapshot => {
            var it = snapshot.val();
            it.isShared = !it.isShared
            fire.database().ref('/groups/' + id).set(it)
        })
    }
}

export const fetchAllGroups = () => {
    return (dispatch, getState) => {
        // console.log('fetchAllItems: state', getState())
        if (!getState().authReducer.user) {
            console.log('fetchAllGroups: user should not not be null')
            return
        }
        fire.database().ref('groups').orderByKey()
            .once('value', list => {
                list.forEach(snapshot => {
                    var it = snapshot.val();
                    if (it.uid !== getState().authReducer.user.uid) {
                        return
                    }
                    //set fist group is being added as current
                    if (getState().groupsReducer.groups.length === 0) {
                        dispatch(setCurrentGroup(snapshot.key))
                    }

                    console.log('addGroup', snapshot.key, it)
                    dispatch(createGroupAction(snapshot.key, it.text, it.uid, it.isShared))
                })
            })
    }
}

export const cleanUpCache = () => {
    return (dispatch, getState) => {
        var groupsCpy = [...getState().groupsReducer.groups]
        groupsCpy.map(gr => dispatch(removeGroupAction(gr.id)))
    }
}