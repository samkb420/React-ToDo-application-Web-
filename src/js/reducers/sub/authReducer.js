
const defState = {
  user: undefined
}

export default (state = defState, action) => {
  switch(action.type) {
    case 'save_user':
      return Object.assign({}, state, { user: action.user })

    case 'remove_user':
    console.log('remove user')
      return Object.assign({}, state, { user: undefined })

    default:
      return state
  }
}
