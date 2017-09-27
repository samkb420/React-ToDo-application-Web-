
export const getUserUid = getState => {
  return getState().authReducer.user.uid
}