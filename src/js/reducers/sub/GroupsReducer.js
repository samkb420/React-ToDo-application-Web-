var defState = {
    currGroupId: undefined,
    groups: []
}

export const groupsReducer = (state = defState, action) => {
  switch (action.type) {
    case 'create_group':
          // console.log('reducer: add_group', state, action)
          return Object.assign({}, state, {
              groups: [
                  ...state.groups,
                  {
                      id: action.id,
                      text: action.text,
                      uid: action.uid,
                      isShared: action.isShared
                  }
              ]
          })

      case 'toggle_sharing':
        return Object.assign({}, state, {
            groups: state.groups.map(it =>
                (it.id === action.id)
                ? {...it, isShared: !it.isShared}
                : it
            )
        })

    case 'remove_group':
        // console.log('reducer: remove_group');
        return Object.assign({}, state, {
            groups: state.groups.filter(it => it.id !== action.id)
        })

    case 'current_group':
        return Object.assign({}, state, {
            currGroupId: action.id
        })
    default:
      return state;
  }
}
