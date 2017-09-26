
//This group is default group in the appliation and cannot be removed
const defaultGroup = {
  id: 0,
  text: "common group"
}

export const getDefaultGroupId = () => defaultGroup.id

export const getNewStateWithGroups = (state, groups) => {
  return Object.assign({}, state, {
    groups: groups
  })
}

export const getGroups = (state) => {
  // console.log('getGroups=', state)
  return (state.groups === undefined)
    //Always init group array with default group
    ? [defaultGroup]
    : state.groups
}

export const getCurrGroupId = (state) => {
  return (state.currGroupId === undefined)
    //Use default group if current group is not specified yet
    ? getGroups(state)[0].id
    : state.currGroupId
}

export const getNewStateWithCurrGroupId = (state, currGroupId) => {
  return Object.assign({}, state, {
    currGroupId
  })
}


export const getNewStateWithItems = (state, items) => {
  return Object.assign({}, state, {
    items: items
  })
}

//TODO: not sure do we neea method in Items.js file
export const getNewStateWithRemovedItemsByGroupId = (state, groupId) => {
  return Object.assign({}, state, {
    items: getItems(state).filter(it => it.groupId !== groupId)
  })
}

export const getItems = (state) => {
  var groupId = getCurrGroupId(state)
  return (state.items === undefined)
    ? []
    : state.items.filter(it => it.groupId === groupId)
}

export const DefaultState = {
  groups: getGroups({}),
  items: getItems({}),
  currGroupId: getDefaultGroupId()
}
