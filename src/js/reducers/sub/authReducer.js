const defState = {
  user: undefined
}

export default (state = defState, action) => {
  switch(action.type) {
    case 'fetch_user_from_cache':
    console.log('fetch user reducer')
      return Object.assign({}, state, { user: localStorage['user'] })

    case 'save_user_to_catche':
      localStorage['user'] = action.user
      return state

    default:
      return state
  }
}
