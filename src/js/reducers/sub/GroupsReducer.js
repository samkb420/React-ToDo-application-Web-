var defState = {
    currGroupId: undefined,
    groups: []
}

export const groupsReducer = (state = defState, action) => {
  switch (action.type) {
    case 'create_group':
          console.log('reducer: add_group', state, action)
          return Object.assign({}, state, {
              groups: [
                  ...state.groups,
                  {
                      id: action.id,
                      text: action.text,
                      uids: action.uids
                  }
              ]
          })

    case 'remove_group':
        console.log('reducer: remove_group');
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
