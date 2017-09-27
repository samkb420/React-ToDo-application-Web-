import { combineReducers } from 'redux'
import { itemsReducer } from './sub/ItemsReducer'
import authReducer from './sub/authReducer'

export const rootReducer = combineReducers({
  itemsReducer,
  authReducer
  // Groups
})
