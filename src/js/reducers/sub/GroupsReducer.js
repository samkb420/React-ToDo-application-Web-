var defState = []

export const groupsReducer = (state = defState, action) => {
  switch (action.type) {
    case 'create_group':
          console.log('reducer: add_group', state, action)
          return [
              ...state,
              {
                  id: action.id,
                  text: action.text,
                  uids: action.uids
              }
          ]
    case 'remove_group':
        console.log('reducer: remove_group');
        console.error('reducer: remove_group: need to remove items')
        return state.filter(it => it.id !== action.id)
    default:
      return state;
  }
}
