import { combineReducers } from 'redux'
import { itemsReducer } from './sub/ItemsReducer'
import authReducer from './sub/authReducer'
import { groupsReducer } from './sub/GroupsReducer'

export const rootReducer = combineReducers({
  itemsReducer,
  authReducer,
  groupsReducer
})
