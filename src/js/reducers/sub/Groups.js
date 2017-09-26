import * as Helper from './Helper'

export const Groups = (state =[], action) => {
  switch (action.type) {
    case 'create_group':
      const newState = Helper.getNewStateWithGroups(state, [
          ...Helper.getGroups(state),
          {
            id: action.id,
            text: action.text
          }
        ])
      // console.log('create group, new state=', newState)
      return newState

    case 'remove_group':
      if (action.id === Helper.getDefaultGroupId()) {
        // console.log('default group cannot be removed!')
        return state
      }
      var tempState = state;
      //Reset current group to default if current group is removed
      if (action.id === Helper.getCurrGroupId(tempState)) {
        tempState = Helper.getNewStateWithCurrGroupId(tempState, Helper.getDefaultGroupId())
      }
      //Remove all items which are in removed group
      tempState = Helper.getNewStateWithRemovedItemsByGroupId(tempState, action.id)

      return Helper.getNewStateWithGroups(tempState, Helper.getGroups(tempState).filter(gr => gr.id !== action.id))

    default:
      return state;
  }
}
