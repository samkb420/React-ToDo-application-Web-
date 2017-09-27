import fire from '../../../fire';
import * as ReducersHelper from '../../reducers/sub/ReducersHelper'
import {removeItem} from "./items";

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

        //set fist group is being added as current
        if (getState().groupsReducer.groups.length === 0) {
            dispatch(setCurrentGroup(newRef.key))
        }

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
        fire.database().ref('groups').orderByKey()
            .once('value', list => {
                list.forEach(snapshot => {
                    var it = snapshot.val();
                    //set fist group is being added as current
                    if (getState().groupsReducer.groups.length === 0) {
                        dispatch(setCurrentGroup(snapshot.key))
                    }

                    console.log('addGroup', snapshot.key, it)
                    dispatch(createGroupAction(snapshot.key, it.text, it.uids))
                })
            })
    }
}