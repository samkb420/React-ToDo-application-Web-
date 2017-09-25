
export const getchUserFromCacheAction = () => ({
  type: 'fetch_user_from_cache'
})

export const saveUserToCatche = (user) => ({
  type: 'save_user_to_catche',
  user
})
